"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const time_1 = __importDefault(require("../util/time"));
const SILENCE_CUTOFF_MS = 500;
class Speaker {
    constructor(id) {
        this.dataBuffer = [];
        this.id = id;
        this.lastPacketAt = time_1.default.getUnixTimestampMS();
    }
    drain() {
        const datagrams = this.dataBuffer.splice(0); // this also clears out the buffer
        const sorted = datagrams.sort((a, b) => a.Sequence - b.Sequence); // packets can arrive out of order
        return sorted;
    }
    // Drains if the user hasn't spoken in SILENCE_CUTOFF_MS milliseconds and has data to dump
    shouldDrain() {
        if (!this.dataBuffer.length) {
            return false;
        }
        return this.lastPacketAt + SILENCE_CUTOFF_MS < time_1.default.getUnixTimestampMS();
    }
    addBuffer(data) {
        this.dataBuffer.push(data);
        this.lastPacketAt = time_1.default.getUnixTimestampMS();
    }
    get DataBuffer() {
        return this.dataBuffer;
    }
    set LastPacketAt(time) {
        this.lastPacketAt = time;
    }
}
exports.default = Speaker;
//# sourceMappingURL=speaker.js.map