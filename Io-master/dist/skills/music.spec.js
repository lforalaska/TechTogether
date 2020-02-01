"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const music_1 = __importDefault(require("./music"));
/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
describe('MusicPlayer', () => {
    beforeEach(() => {
        this.musicPlayer = new music_1.default();
    });
    describe('canHandleMessage', () => {
        it('should return true for play/skip/stop', () => {
            const play = this.musicPlayer.canHandleMessage('!play test');
            const skip = this.musicPlayer.canHandleMessage('!skip');
            const stop = this.musicPlayer.canHandleMessage('!stop');
            chai_1.expect(play).to.be.true;
            chai_1.expect(skip).to.be.true;
            chai_1.expect(stop).to.be.true;
        });
        it('should return false for not-allowed commands', () => {
            const playFail = this.musicPlayer.canHandleMessage('!playtest ');
            const junk = this.musicPlayer.canHandleMessage('!foobar');
            chai_1.expect(playFail).to.be.false;
            chai_1.expect(junk).to.be.false;
        });
    });
    describe('play', () => {
        it('should add to queue if something is playing currently', () => {
            const connection = {
                play: (stream) => { },
                stopPlaying: () => { },
                playing: () => true,
            };
            this.musicPlayer.play(connection, 'test');
            chai_1.expect(this.musicPlayer.queue.length).to.equal(1);
            chai_1.expect(this.musicPlayer.queue[0]).to.equal('test');
        });
    });
    describe('stop', () => {
        it('should call stopPlaying on the underlying voice connection', () => {
            let count = 0;
            const connection = {
                play: (stream) => { },
                stopPlaying: () => {
                    count++;
                },
                playing: () => true,
            };
            this.musicPlayer.stop(connection);
            chai_1.expect(count).to.equal(1);
        });
    });
    describe('skip', () => {
        it('should do nothing if the queue is currently empty', () => {
            let count = 0;
            const connection = {
                play: (stream) => {
                    count--;
                },
                stopPlaying: () => {
                    count++;
                },
                playing: () => true,
            };
            this.musicPlayer.skip(connection);
            chai_1.expect(count).to.equal(1);
        });
    });
});
//# sourceMappingURL=music.spec.js.map