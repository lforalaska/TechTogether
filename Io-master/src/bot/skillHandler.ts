import Discord from './discord'
import MusicPlayer from '../skills/music'
import SkillInterface from '../skills/skillInterface'
import DotaCounters from '../skills/dota/counters'

export default class SkillHandler {
  private skillHandlers: SkillInterface[] = []

  constructor() {
    this.skillHandlers.push(new MusicPlayer())
    this.skillHandlers.push(new DotaCounters())
  }

  handleMessage(message: string, voiceConnection: Discord.VoiceConnection | undefined) {
    this.skillHandlers.forEach((handler: SkillInterface) => {
      if (handler.canHandleMessage(message, voiceConnection)) {
        handler.handleMessage(message, voiceConnection)
      }
    })
  }
}
