import { Stream } from 'stream'

module Discord {
  export interface DiscordGuild {
    channels: Collection<GuildChannel>
  }

  export interface Collection<T> {
    filter: Function
  }

  export interface GuildChannel {
    type: number
    leave: () => void
  }

  export interface VoiceChannel extends GuildChannel {
    voiceMembers: { size: number }
    join: (options: any) => Promise<any>
  }

  export interface VoiceConnection {
    play: (stream: Stream) => void
    stopPlaying: () => void
    playing: () => boolean
    receive: (encodingType: string) => VoiceDataStream
  }

  export interface VoiceDataStream {
    on: (event: string, callback: Function) => void
  }

  export enum GuildChannelType {
    CATEGORY = 0,
    VOICE = 2,
    TEXT = 4,
  }

  export enum GuildTextChannelType {
    TEXT = 0,
  }
}

export default Discord
