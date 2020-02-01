"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skillHandler_1 = __importDefault(require("./skillHandler"));
const datagram_1 = __importDefault(require("../models/datagram"));
const speaker_1 = __importDefault(require("../models/speaker"));
const MONITOR_TIMEOUT = 1500;
const MONITOR_VOICE_TIMEOUT = 100;
const VOICE_CHANNEL_TYPE = 2;
/**
 * A thin wrapper around Discord guilds (servers). Discord refers to servers as guilds
 * internally (see Discord API documentation), so we do as well to remain consistent.
 *
 * It's useful to have per-server logic, so it makes sense to provide a thin wrapper
 * around Discord guilds. In the future this will likely delegate to a server-specific
 * voice connection, but for now this controls most of the actual logic.
 *
 */
class Guild {
    constructor(guild) {
        this.speakerMap = {};
        this.discordGuild = guild;
        this.skillHandler = new skillHandler_1.default();
    }
    log(method, message) {
        console.log(`[GUILD] [${method}]: ${message}`);
    }
    monitor() {
        /**
         * We monitor using an interval instead of event-driven logic
         * because people may already be in a voice channel when we connect, as well
         * as events being fairly lossy.
         */
        setInterval(this.monitorVoiceChannels.bind(this), MONITOR_TIMEOUT);
        setInterval(this.monitorVoiceData.bind(this), MONITOR_VOICE_TIMEOUT);
    }
    /**
     * Decides whether we should leave a voice channel, based on the population in the channel.
     * @param channel The voice channel we want to test for whether we should leave
     */
    shouldLeaveVoice(channel) {
        if (!channel) {
            return false;
        }
        return channel.voiceMembers.size === 1; // We're the only ones in the channel
    }
    /**
     * Checks a list of channels for voice channels that are currently populated by people. Returns the first one.
     * @param channels The list of channels to check for population
     * @return VoiceChannel | undefined
     */
    getFirstPopulatedVoiceChannel(channels) {
        const voiceChannels = channels.filter((channel) => {
            if (channel.type !== VOICE_CHANNEL_TYPE) {
                return false;
            }
            return channel.voiceMembers.size > 0;
        });
        return voiceChannels[0]; // Return the first populated voice channel found
    }
    /**
     * Monitors voice channels for two things:
     * 1) Whether we should leave a voice channel with no one but ourselves in it
     * 2) Whether we should join a voice channel that has people in it
     */
    monitorVoiceChannels() {
        if (this.shouldLeaveVoice(this.voiceChannel)) {
            this.voiceChannel.leave();
            this.voiceChannel = undefined;
            return;
        }
        if (this.voiceChannel) {
            // In a voice channel playing, leave it alone
            return;
        }
        const populatedVoiceChannel = this.getFirstPopulatedVoiceChannel(this.discordGuild.channels);
        if (populatedVoiceChannel) {
            this.joinVoiceChannel(populatedVoiceChannel);
            this.voiceChannel = populatedVoiceChannel;
        }
    }
    joinVoiceChannel(channel) {
        channel.join({}).then((connection) => {
            this.voiceConnection = connection;
            const voiceStream = connection.receive('opus');
            voiceStream.on('data', this.processVoiceData.bind(this));
        });
    }
    processVoiceData(chunk, userID, timestamp, sequence) {
        const datagram = new datagram_1.default(chunk, userID, timestamp, sequence);
        if (!userID) {
            // Discord can sometimes send phantom voice packets that aren't apparently from anyone.
            // Don't do anything with them.
            return;
        }
        if (!this.speakerMap[userID]) {
            this.log('processVoiceData', `New voice data received for speaker: ${userID}`);
            this.speakerMap[userID] = new speaker_1.default(userID);
        }
        this.speakerMap[userID].addBuffer(datagram);
    }
    monitorVoiceData() {
        Object.keys(this.speakerMap).forEach((speakerID) => {
            const speaker = this.speakerMap[speakerID];
            if (speaker.shouldDrain()) {
                this.log('monitorVoiceData', `Draining speaker voice data: ${speakerID}`);
                speaker.drain();
            }
        });
    }
    handleMessage(message) {
        return this.skillHandler.handleMessage(message, this.voiceConnection);
    }
}
exports.default = Guild;
//# sourceMappingURL=guild.js.map