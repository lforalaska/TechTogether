"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const guild_1 = __importDefault(require("./guild"));
require("mocha");
/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
describe('Guild', () => {
    beforeEach(() => {
        const discordGuild = { channels: [] };
        this.guild = new guild_1.default(discordGuild);
    });
    describe('shouldLeaveVoice', () => {
        const createVoiceChannel = (size) => ({
            voiceMembers: { size },
            join: (options) => null,
            type: 2,
            leave: () => { },
        });
        it('should return false when no voice channel given', () => {
            const actual = this.guild.shouldLeaveVoice(null);
            chai_1.expect(actual).to.be.false;
        });
        it('should return false when more than one person in channel', () => {
            const voiceChannel = createVoiceChannel(2);
            const actual = this.guild.shouldLeaveVoice(voiceChannel);
            chai_1.expect(actual).to.be.false;
        });
        it('should return true when only one person in voice channel', () => {
            const voiceChannel = createVoiceChannel(1);
            const actual = this.guild.shouldLeaveVoice(voiceChannel);
            chai_1.expect(actual).to.be.true;
        });
    });
    describe('populatedVoiceChannel tests', () => {
        const createGuildChannel = () => ({ leave: () => { }, type: 4 });
        const createVoiceChannel = (size) => ({
            voiceMembers: { size },
            join: (options) => null,
            type: 2,
            leave: () => { },
        });
        it("shouldn't return non-voice channels", () => {
            const channels = [createGuildChannel(), createGuildChannel()];
            const actual = this.guild.getFirstPopulatedVoiceChannel(channels);
            chai_1.expect(actual).to.be.undefined;
        });
        it("shouldn't return unpopulated voice channels", () => {
            const channels = [createGuildChannel(), createGuildChannel(), createVoiceChannel(0)];
            const actual = this.guild.getFirstPopulatedVoiceChannel(channels);
            chai_1.expect(actual).to.be.undefined;
        });
        it('should only return the first populated voice channel', () => {
            const answer = createVoiceChannel(1);
            const channels = [
                createGuildChannel(),
                createGuildChannel(),
                answer,
                createVoiceChannel(2),
            ];
            const actual = this.guild.getFirstPopulatedVoiceChannel(channels);
            chai_1.expect(actual).to.equal(answer);
        });
        it('should return the only populated voice channel', () => {
            const answer = createVoiceChannel(2);
            const channels = [
                createGuildChannel(),
                createGuildChannel(),
                createVoiceChannel(0),
                answer,
            ];
            const actual = this.guild.getFirstPopulatedVoiceChannel(channels);
            chai_1.expect(actual).to.equal(answer);
        });
    });
});
//# sourceMappingURL=guild.spec.js.map