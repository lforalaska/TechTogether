"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strengths_1 = __importDefault(require("../skills/pkmn/strengths"));
class SkillHandler {
    constructor() {
        this.skillHandlers = [];
        // this.skillHandlers.push(new MusicPlayer())
        // this.skillHandlers.push(new DotaCounters())
        this.skillHandlers.push(new strengths_1.default());
    }
    handleMessage(message, voiceConnection) {
        // this.skillHandlers.forEach((handler: SkillInterface) => {
        let handler = this.skillHandlers[0];
        if (handler.canHandleMessage(message, voiceConnection)) {
            return handler.handleMessage(message, voiceConnection);
        }
        else {
            return '';
        }
    }
}
exports.default = SkillHandler;
//# sourceMappingURL=skillHandler.js.map