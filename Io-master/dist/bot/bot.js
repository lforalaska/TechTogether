"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = __importDefault(require("eris"));
const guild_1 = __importDefault(require("./guild"));
const discord_1 = __importDefault(require("./discord"));
class Bot {
    constructor(discordToken) {
        this.guildMap = {};
        this.client = new eris_1.default.Client(discordToken);
    }
    connect() {
        this.client.connect();
        this.client.on('ready', () => {
            this.client.guilds.forEach((discordGuild) => {
                const guild = new guild_1.default(discordGuild);
                guild.monitor();
                this.guildMap[discordGuild.id] = guild;
            });
            this.client.on('messageCreate', this.handleMessage.bind(this));
        });
    }
    handleMessage(msg) {
        let { channel } = msg;
        if (channel.type !== discord_1.default.GuildTextChannelType.TEXT) {
            return;
        }
        channel = channel;
        this.guildMap[channel.guild.id].handleMessage(msg.content, channel);
        console.log('Replied to message');
    }
    /**
     * Gracefully shuts down the discord client, as opposed to forcefully cutting the connection and letting
     * the bot timeout.
     */
    shutdownGracefully() {
        this.client.disconnect({ reconnect: false });
    }
}
exports.default = Bot;
//# sourceMappingURL=bot.js.map