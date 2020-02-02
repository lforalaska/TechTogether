/// <reference types="node" />
import Eris from 'eris';
import Discord from './discord';
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
    private discordGuild;
    private voiceChannel?;
    private voiceConnection?;
    private skillHandler;
    private speakerMap;
    constructor(guild: Discord.DiscordGuild);
    log(method: string, message: string): void;
    monitor(): void;
    /**
     * Decides whether we should leave a voice channel, based on the population in the channel.
     * @param channel The voice channel we want to test for whether we should leave
     */
    shouldLeaveVoice(channel?: Discord.VoiceChannel): boolean;
    /**
     * Checks a list of channels for voice channels that are currently populated by people. Returns the first one.
     * @param channels The list of channels to check for population
     * @return VoiceChannel | undefined
     */
    getFirstPopulatedVoiceChannel(channels: Discord.Collection<Discord.GuildChannel>): Discord.VoiceChannel | undefined;
    /**
     * Monitors voice channels for two things:
     * 1) Whether we should leave a voice channel with no one but ourselves in it
     * 2) Whether we should join a voice channel that has people in it
     */
    monitorVoiceChannels(): void;
    joinVoiceChannel(channel: Discord.VoiceChannel): void;
    processVoiceData(chunk: Buffer, userID: string, timestamp: number, sequence: number): void;
    monitorVoiceData(): void;
    handleMessage(message: string, channel: Eris.TextChannel): void;
}
