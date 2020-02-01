import Eris from 'eris';
export default class Bot {
    private client;
    private guildMap;
    constructor(discordToken: string);
    connect(): void;
    handleMessage(msg: Eris.Message): void;
    /**
     * Gracefully shuts down the discord client, as opposed to forcefully cutting the connection and letting
     * the bot timeout.
     */
    shutdownGracefully(): void;
}
