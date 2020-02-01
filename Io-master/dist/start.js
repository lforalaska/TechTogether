"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("./bot/bot"));
const token = process.env.DISCORD_TOKEN || "";
if (token === "") {
    console.log("Couldn't find discord token. Exiting...");
    process.exit();
}
const bot = new bot_1.default(token);
try {
    bot.connect();
}
catch (e) {
    console.log("Received generic error! Error: ", e);
    shutdown();
}
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    shutdown();
});
process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    shutdown();
});
process.on('uncaughtException', (err) => {
    console.error(err);
    console.info('Uncaught exception, shutting down...');
    shutdown();
});
function shutdown() {
    try {
        bot.shutdownGracefully();
    }
    catch (e) {
        console.log("Couldn't do graceful shutdown! Exiting anyway...");
    }
}
//# sourceMappingURL=start.js.map