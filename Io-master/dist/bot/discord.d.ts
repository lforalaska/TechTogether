/// <reference types="node" />
import { Stream } from 'stream';
declare module Discord {
    interface DiscordGuild {
        channels: Collection<GuildChannel>;
    }
    interface Collection<T> {
        filter: Function;
    }
    interface GuildChannel {
        type: number;
        leave: () => void;
    }
    interface VoiceChannel extends GuildChannel {
        voiceMembers: {
            size: number;
        };
        join: (options: any) => Promise<any>;
    }
    interface VoiceConnection {
        play: (stream: Stream) => void;
        stopPlaying: () => void;
        playing: () => boolean;
        receive: (encodingType: string) => VoiceDataStream;
    }
    interface VoiceDataStream {
        on: (event: string, callback: Function) => void;
    }
    enum GuildChannelType {
        CATEGORY = 0,
        VOICE = 2,
        TEXT = 4
    }
    enum GuildTextChannelType {
        TEXT = 0
    }
}
export default Discord;
