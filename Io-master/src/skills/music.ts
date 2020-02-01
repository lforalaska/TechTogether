import ytdl from 'ytdl-core'
import ytsr from 'ytsr'
import { Stream } from 'stream'
import Discord from '../bot/discord'

/**
 * Plays and manages playing music for a guild/server. Fetches music from youtube to play, and then streams
 * it over a discord voice connection.
 */
export default class MusicPlayer {
  private queue: string[] = []

  private commandMap = {
    '!play': this.play.bind(this),
    '!skip': this.skip.bind(this),
    '!stop': this.stop.bind(this),
  }

  log(method: string, message: string): void {
    console.log(`[MUSIC] [${method}]: ${message}`)
  }

  /**
   * Returns true if the message is in the command map, false otherwise
   */
  canHandleMessage(message: string): boolean {
    const tokens = message.trim().split(' ')
    const command = tokens.shift()
    if (!command) {
      return false
    }
    return !!this.commandMap[command]
  }

  handleMessage(message: string, voiceConnection: Discord.VoiceConnection): void {
    this.log("handleMessage", `Received message: ${message}`)
    const tokens = message.split(' ')
    const command = tokens.shift()
    if (!command) {
      return
    }

    this.commandMap[command](voiceConnection, tokens.join(' '))
  }

  /**
   * Fetches an audio stream from a youtube link.
   *
   * @param link The youtube link to download from
   * @return stream Returns a readable stream
   */
  getMusic(link: string): Stream {
    return ytdl(link, { filter: 'audioonly', quality: 'highestaudio' })
  }

  isYoutubeLink(link: string): boolean {
    return link.toLowerCase().indexOf("youtube.com") !== -1
  }

  async fetchYoutubeLink(query: string): Promise<string> {
    const result = await ytsr(query)
    if (result.items && result.items.length) {
      return result.items[0].link
    }
    return ""
  }

  async play(connection: Discord.VoiceConnection, query: string|undefined): Promise<void> {
    this.log("play", `Play called with query: ${query}`)
    if (!query || query === "") { // user forgot to include a query with this
      this.log("play", "Returning, no query given.")
      return
    }
    if (connection.playing) {
      this.log("play", `Queueing query: ${query}`)
      this.queue.push(query)
      return
    }
    let path = query
    if (!this.isYoutubeLink(query)) {
      path = await this.fetchYoutubeLink(query)
    }
    this.log("play", `Path: ${path}`)

    const stream = this.getMusic(path)
    connection.play(stream)
    stream.on('close', () => {
      this.log("play", `Finished song, going to next song in queue`)
      this.skip(connection)
    })
  }

  stop(connection: Discord.VoiceConnection): void {
    this.log("stop", "Stop called, killing connection")
    connection.stopPlaying()
  }

  skip(connection: Discord.VoiceConnection): void {
    this.log("skip", "Skip called, skipping to next song")
    this.stop(connection)
    if (!this.queue.length) {
      // Nothing to play
      return
    }
    const nextSong = this.queue.shift()
    this.play(connection, nextSong)
  }
}
