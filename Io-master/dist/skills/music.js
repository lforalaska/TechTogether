"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const ytsr_1 = __importDefault(require("ytsr"));
/**
 * Plays and manages playing music for a guild/server. Fetches music from youtube to play, and then streams
 * it over a discord voice connection.
 */
class MusicPlayer {
    constructor() {
        this.queue = [];
        this.commandMap = {
            '!play': this.play.bind(this),
            '!skip': this.skip.bind(this),
            '!stop': this.stop.bind(this),
        };
    }
    log(method, message) {
        console.log(`[MUSIC] [${method}]: ${message}`);
    }
    /**
     * Returns true if the message is in the command map, false otherwise
     */
    canHandleMessage(message) {
        const tokens = message.trim().split(' ');
        const command = tokens.shift();
        if (!command) {
            return false;
        }
        return !!this.commandMap[command];
    }
    handleMessage(message, voiceConnection) {
        this.log("handleMessage", `Received message: ${message}`);
        const tokens = message.split(' ');
        const command = tokens.shift();
        if (!command) {
            return;
        }
        this.commandMap[command](voiceConnection, tokens.join(' '));
    }
    /**
     * Fetches an audio stream from a youtube link.
     *
     * @param link The youtube link to download from
     * @return stream Returns a readable stream
     */
    getMusic(link) {
        return ytdl_core_1.default(link, { filter: 'audioonly', quality: 'highestaudio' });
    }
    isYoutubeLink(link) {
        return link.toLowerCase().indexOf("youtube.com") !== -1;
    }
    fetchYoutubeLink(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ytsr_1.default(query);
            if (result.items && result.items.length) {
                return result.items[0].link;
            }
            return "";
        });
    }
    play(connection, query) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log("play", `Play called with query: ${query}`);
            if (!query || query === "") { // user forgot to include a query with this
                this.log("play", "Returning, no query given.");
                return;
            }
            if (connection.playing) {
                this.log("play", `Queueing query: ${query}`);
                this.queue.push(query);
                return;
            }
            let path = query;
            if (!this.isYoutubeLink(query)) {
                path = yield this.fetchYoutubeLink(query);
            }
            this.log("play", `Path: ${path}`);
            const stream = this.getMusic(path);
            connection.play(stream);
            stream.on('close', () => {
                this.log("play", `Finished song, going to next song in queue`);
                this.skip(connection);
            });
        });
    }
    stop(connection) {
        this.log("stop", "Stop called, killing connection");
        connection.stopPlaying();
    }
    skip(connection) {
        this.log("skip", "Skip called, skipping to next song");
        this.stop(connection);
        if (!this.queue.length) {
            // Nothing to play
            return;
        }
        const nextSong = this.queue.shift();
        this.play(connection, nextSong);
    }
}
exports.default = MusicPlayer;
//# sourceMappingURL=music.js.map