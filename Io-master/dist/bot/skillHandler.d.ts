import Discord from './discord';
export default class SkillHandler {
    private skillHandlers;
    constructor();
    handleMessage(message: string, voiceConnection: Discord.VoiceConnection | undefined): string;
}
