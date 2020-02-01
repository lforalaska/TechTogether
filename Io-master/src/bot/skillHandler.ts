import Discord from './discord'
import MusicPlayer from '../skills/music'
import SkillInterface from '../skills/skillInterface'
import DotaCounters from '../skills/dota/counters'
import Strengths from '../skills/pkmn/strengths'

export default class SkillHandler {
  private skillHandlers: SkillInterface[] = []

  constructor() {
    // this.skillHandlers.push(new MusicPlayer())
    // this.skillHandlers.push(new DotaCounters())
    this.skillHandlers.push(new Strengths())
  }

  handleMessage(message: string, voiceConnection: Discord.VoiceConnection | undefined): string {
    // this.skillHandlers.forEach((handler: SkillInterface) => {
    let handler = this.skillHandlers[0]
    if (handler.canHandleMessage(message, voiceConnection)) {
	    return handler.handleMessage(message, voiceConnection)
    } else {
	return ''
    }
  }
}
