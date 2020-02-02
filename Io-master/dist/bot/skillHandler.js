"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strengths_1 = __importDefault(require("../skills/pkmn/strengths"));
class SkillHandler {
    constructor() {
        this.skillHandlers = [];
        this.skillHandlers.push(new strengths_1.default());
    }
    handleMessage(message, channel, voiceConnection) {
        this.skillHandlers.forEach((handler) => {
            if (handler.canHandleMessage(message, channel, voiceConnection)) {
                handler.handleMessage(message, channel, voiceConnection);
            }
        });
    }
}
exports.default = SkillHandler;
//# sourceMappingURL=skillHandler.js.map