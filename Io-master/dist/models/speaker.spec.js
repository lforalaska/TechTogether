"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const speaker_1 = __importDefault(require("./speaker"));
const datagram_1 = __importDefault(require("./datagram"));
/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
describe('Speaker', () => {
    beforeEach(() => {
        this.speaker = new speaker_1.default("test");
    });
    describe('addBuffer', () => {
        it('should add a buffer correctly', () => {
            const datagram = new datagram_1.default(Buffer.from("foobar"), "test", 123, 1);
            this.speaker.addBuffer(datagram);
            chai_1.expect(this.speaker.DataBuffer.length).to.equal(1);
        });
    });
    describe('shouldDrain', () => {
        it('should mark ready for drain correctly when time has elapsed', () => {
            const datagram = new datagram_1.default(Buffer.from("foobar"), "test", 123, 1);
            this.speaker.addBuffer(datagram);
            chai_1.expect(this.speaker.shouldDrain()).to.be.false;
            this.speaker.LastPacketAt = 0;
            chai_1.expect(this.speaker.shouldDrain()).to.be.true;
        });
    });
    describe('drain', () => {
        it('should drain a data buffer correctly', () => {
            const datagram = new datagram_1.default(Buffer.from("foobar"), "test", 123, 1);
            this.speaker.addBuffer(datagram);
            const result = this.speaker.drain();
            chai_1.expect(result).to.not.be.undefined;
            chai_1.expect(result.length).to.equal(1);
        });
    });
});
//# sourceMappingURL=speaker.spec.js.map