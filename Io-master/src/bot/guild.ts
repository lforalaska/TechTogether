import Eris from 'eris'
import Discord from './discord'
import SkillHandler from './skillHandler'
import Datagram from '../models/datagram'
import Speaker from '../models/speaker'

const MONITOR_TIMEOUT = 1500
const MONITOR_VOICE_TIMEOUT = 100
const VOICE_CHANNEL_TYPE = 2

/**
 * A thin wrapper around Discord guilds (servers). Discord refers to servers as guilds
 * internally (see Discord API documentation), so we do as well to remain consistent.
 *
 * It's useful to have per-server logic, so it makes sense to provide a thin wrapper
 * around Discord guilds. In the future this will likely delegate to a server-specific
 * voice connection, but for now this controls most of the actual logic.
 *
 */
export default class Guild {
  private discordGuild: Discord.DiscordGuild

  private voiceChannel?: Discord.VoiceChannel

  private voiceConnection?: Discord.VoiceConnection

  private skillHandler: SkillHandler

  private speakerMap: { [speakerID: string]: Speaker } = {}

  constructor(guild: Discord.DiscordGuild) {
    this.discordGuild = guild
    this.skillHandler = new SkillHandler()
  }

  log(method: string, message: string): void {
    console.log(`[GUILD] [${method}]: ${message}`)
  }

  monitor() {
    /**
     * We monitor using an interval instead of event-driven logic
     * because people may already be in a voice channel when we connect, as well
     * as events being fairly lossy.
     */
    setInterval(this.monitorVoiceChannels.bind(this), MONITOR_TIMEOUT)
    setInterval(this.monitorVoiceData.bind(this), MONITOR_VOICE_TIMEOUT)
  }

  /**
   * Decides whether we should leave a voice channel, based on the population in the channel.
   * @param channel The voice channel we want to test for whether we should leave
   */
  shouldLeaveVoice(channel?: Discord.VoiceChannel) {
    if (!channel) {
      return false
    }
    return channel.voiceMembers.size === 1 // We're the only ones in the channel
  }

  /**
   * Checks a list of channels for voice channels that are currently populated by people. Returns the first one.
   * @param channels The list of channels to check for population
   * @return VoiceChannel | undefined
   */
  getFirstPopulatedVoiceChannel(channels: Discord.Collection<Discord.GuildChannel>): Discord.VoiceChannel | undefined {
    const voiceChannels: Discord.VoiceChannel[] = channels.filter((channel: Discord.GuildChannel) => {
      if (channel.type !== VOICE_CHANNEL_TYPE) {
        return false
      }
      return (channel as Discord.VoiceChannel).voiceMembers.size > 0
    }) as Discord.VoiceChannel[]

    return voiceChannels[0] // Return the first populated voice channel found
  }

  /**
   * Monitors voice channels for two things:
   * 1) Whether we should leave a voice channel with no one but ourselves in it
   * 2) Whether we should join a voice channel that has people in it
   */
  monitorVoiceChannels() {
    if (this.shouldLeaveVoice(this.voiceChannel)) {
      this.voiceChannel.leave()
      this.voiceChannel = undefined
      return
    }

    if (this.voiceChannel) {
      // In a voice channel playing, leave it alone
      return
    }

    const populatedVoiceChannel = this.getFirstPopulatedVoiceChannel(this.discordGuild.channels)
    if (populatedVoiceChannel) {
      this.joinVoiceChannel(populatedVoiceChannel)
      this.voiceChannel = populatedVoiceChannel
    }
  }

  joinVoiceChannel(channel: Discord.VoiceChannel) {
    channel.join({}).then((connection: Discord.VoiceConnection) => {
      this.voiceConnection = connection
      const voiceStream: Discord.VoiceDataStream = connection.receive('opus')
      voiceStream.on('data', this.processVoiceData.bind(this))
    })
  }

  processVoiceData(chunk: Buffer, userID: string, timestamp: number, sequence: number) {
    const datagram = new Datagram(chunk, userID, timestamp, sequence)
    if (!userID) {
      // Discord can sometimes send phantom voice packets that aren't apparently from anyone.
      // Don't do anything with them.
      return
    }
    if (!this.speakerMap[userID]) {
      this.log('processVoiceData', `New voice data received for speaker: ${userID}`)
      this.speakerMap[userID] = new Speaker(userID)
    }
    this.speakerMap[userID].addBuffer(datagram)
  }

  monitorVoiceData() {
    Object.keys(this.speakerMap).forEach((speakerID: string) => {
      const speaker = this.speakerMap[speakerID]
      if (speaker.shouldDrain()) {
        this.log('monitorVoiceData', `Draining speaker voice data: ${speakerID}`)
        speaker.drain()
      }
    })
  }

  handleMessage(message: string, channel: Eris.TextChannel): void {
    return this.skillHandler.handleMessage(message, channel, this.voiceConnection)
  }
}
