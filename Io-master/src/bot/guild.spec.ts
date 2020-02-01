import { expect } from 'chai'
import Guild from './guild'
import 'mocha'
import Discord from './discord'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('Guild', () => {
  beforeEach(() => {
    const discordGuild: Discord.DiscordGuild = { channels: [] }
    this.guild = new Guild(discordGuild)
  })

  describe('shouldLeaveVoice', () => {
    const createVoiceChannel = (size: number): Discord.VoiceChannel => ({
      voiceMembers: { size },
      join: (options: any) => null,
      type: 2,
      leave: () => {},
    })

    it('should return false when no voice channel given', () => {
      const actual = this.guild.shouldLeaveVoice(null)
      expect(actual).to.be.false
    })

    it('should return false when more than one person in channel', () => {
      const voiceChannel: Discord.VoiceChannel = createVoiceChannel(2)
      const actual = this.guild.shouldLeaveVoice(voiceChannel)
      expect(actual).to.be.false
    })

    it('should return true when only one person in voice channel', () => {
      const voiceChannel: Discord.VoiceChannel = createVoiceChannel(1)
      const actual = this.guild.shouldLeaveVoice(voiceChannel)
      expect(actual).to.be.true
    })
  })

  describe('populatedVoiceChannel tests', () => {
    const createGuildChannel = (): Discord.GuildChannel => ({ leave: () => {}, type: 4 })

    const createVoiceChannel = (size: number): Discord.VoiceChannel => ({
      voiceMembers: { size },
      join: (options: any) => null,
      type: 2,
      leave: () => {},
    })

    it("shouldn't return non-voice channels", () => {
      const channels: Discord.GuildChannel[] = [createGuildChannel(), createGuildChannel()]
      const actual = this.guild.getFirstPopulatedVoiceChannel(channels)
      expect(actual).to.be.undefined
    })

    it("shouldn't return unpopulated voice channels", () => {
      const channels: Discord.GuildChannel[] = [createGuildChannel(), createGuildChannel(), createVoiceChannel(0)]
      const actual = this.guild.getFirstPopulatedVoiceChannel(channels)
      expect(actual).to.be.undefined
    })

    it('should only return the first populated voice channel', () => {
      const answer = createVoiceChannel(1)
      const channels: Discord.GuildChannel[] = [
        createGuildChannel(),
        createGuildChannel(),
        answer,
        createVoiceChannel(2),
      ]
      const actual = this.guild.getFirstPopulatedVoiceChannel(channels)
      expect(actual).to.equal(answer)
    })

    it('should return the only populated voice channel', () => {
      const answer = createVoiceChannel(2)
      const channels: Discord.GuildChannel[] = [
        createGuildChannel(),
        createGuildChannel(),
        createVoiceChannel(0),
        answer,
      ]
      const actual = this.guild.getFirstPopulatedVoiceChannel(channels)
      expect(actual).to.equal(answer)
    })
  })
})
