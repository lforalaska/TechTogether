"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Discord;
(function (Discord) {
    let GuildChannelType;
    (function (GuildChannelType) {
        GuildChannelType[GuildChannelType["CATEGORY"] = 0] = "CATEGORY";
        GuildChannelType[GuildChannelType["VOICE"] = 2] = "VOICE";
        GuildChannelType[GuildChannelType["TEXT"] = 4] = "TEXT";
    })(GuildChannelType = Discord.GuildChannelType || (Discord.GuildChannelType = {}));
    let GuildTextChannelType;
    (function (GuildTextChannelType) {
        GuildTextChannelType[GuildTextChannelType["TEXT"] = 0] = "TEXT";
    })(GuildTextChannelType = Discord.GuildTextChannelType || (Discord.GuildTextChannelType = {}));
})(Discord || (Discord = {}));
exports.default = Discord;
//# sourceMappingURL=discord.js.map