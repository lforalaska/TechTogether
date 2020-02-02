import Eris from 'eris';
import Discord from './discord';
export default class SkillHandler {
    private skillHandlers;
    constructor();
    handleMessage(message: string, channel: Eris.TextChannel, voiceConnection: Discord.VoiceConnection | undefined): void;
}
