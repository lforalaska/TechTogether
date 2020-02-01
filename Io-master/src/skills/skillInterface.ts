import Discord from "../bot/discord";

export default interface SkillInterface {
  canHandleMessage(message: string, voiceConnection?: Discord.VoiceConnection): boolean
  handleMessage(message: string, voiceConnection?: Discord.VoiceConnection): string
}
