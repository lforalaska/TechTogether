import Eris from 'eris'
import Guild from './guild'
import Discord from './discord'

export default class Bot {
  private client: Eris.Client

  private guildMap: { [id: number]: Guild } = {}

  constructor(discordToken: string) {
    this.client = new Eris.Client(discordToken)
  }

  connect(): void {
    this.client.connect()
    this.client.on('ready', () => {
      this.client.guilds.forEach((discordGuild: Eris.Guild) => {
        const guild = new Guild(discordGuild)
        guild.monitor()
        this.guildMap[discordGuild.id] = guild
      })

      this.client.on('messageCreate', this.handleMessage.bind(this))
    })
  }

  handleMessage(msg: Eris.Message) {
    let { channel } = msg
    if (channel.type !== Discord.GuildTextChannelType.TEXT) {
     return
    }
    channel = channel as Eris.TextChannel
    this.guildMap[channel.guild.id].handleMessage(msg.content, channel)
    console.log('Replied to message')
  }

  /**
   * Gracefully shuts down the discord client, as opposed to forcefully cutting the connection and letting
   * the bot timeout.
   */
  shutdownGracefully() {
    this.client.disconnect({ reconnect: false })
  }
}
