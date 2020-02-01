"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const time_1 = __importDefault(require("./time"));
require("mocha");
/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
describe('TimeUtils', () => {
    describe('getUnixTimestampMS', () => {
        it('should return a number that\'s after epoch', () => {
            const answer = time_1.default.getUnixTimestampMS();
            chai_1.expect(answer).to.be.greaterThan(0);
        });
    });
});
//# sourceMappingURL=time.spec.js.map