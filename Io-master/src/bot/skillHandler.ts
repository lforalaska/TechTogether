import Eris from 'eris'
import Discord from './discord'
import MusicPlayer from '../skills/music'
import SkillInterface from '../skills/skillInterface'
import DotaCounters from '../skills/dota/counters'
import Strengths from '../skills/pkmn/strengths'

export default class SkillHandler {
  private skillHandlers: SkillInterface[] = []

  constructor() {
    this.skillHandlers.push(new Strengths())
  }

  handleMessage(message: string, channel: Eris.TextChannel, voiceConnection: Discord.VoiceConnection | undefined): void {
    this.skillHandlers.forEach((handler: SkillInterface) => {
    if (handler.canHandleMessage(message, channel, voiceConnection)) {
	 handler.handleMessage(message, channel, voiceConnection)
	}
    })
  }
}
