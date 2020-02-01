/// <reference types="node" />
import { Stream } from 'stream';
import Discord from '../bot/discord';
/**
 * Plays and manages playing music for a guild/server. Fetches music from youtube to play, and then streams
 * it over a discord voice connection.
 */
export default class MusicPlayer {
    private queue;
    private commandMap;
    log(method: string, message: string): void;
    /**
     * Returns true if the message is in the command map, false otherwise
     */
    canHandleMessage(message: string): boolean;
    handleMessage(message: string, voiceConnection: Discord.VoiceConnection): void;
    /**
     * Fetches an audio stream from a youtube link.
     *
     * @param link The youtube link to download from
     * @return stream Returns a readable stream
     */
    getMusic(link: string): Stream;
    isYoutubeLink(link: string): boolean;
    fetchYoutubeLink(query: string): Promise<string>;
    play(connection: Discord.VoiceConnection, query: string | undefined): Promise<void>;
    stop(connection: Discord.VoiceConnection): void;
    skip(connection: Discord.VoiceConnection): void;
}
