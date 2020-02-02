import Eris from 'eris';
import Discord from "../bot/discord";
export default interface SkillInterface {
    canHandleMessage(message: string, channel: Eris.TextChannel, voiceConnection?: Discord.VoiceConnection): boolean;
    handleMessage(message: string, channel: Eris.TextChannel, voiceConnection?: Discord.VoiceConnection): void;
}
