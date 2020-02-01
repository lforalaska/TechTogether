"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Datagram {
    constructor(chunk, userID, timestamp, sequence) {
        this.data = chunk;
        this.userID = userID;
        this.timestamp = timestamp;
        this.sequence = sequence;
    }
    get Sequence() {
        return this.sequence;
    }
}
exports.default = Datagram;
//# sourceMappingURL=datagram.js.map