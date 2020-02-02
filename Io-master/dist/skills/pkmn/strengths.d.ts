import Eris from 'eris';
export default class Strengths {
    private fromTypes;
    private toTypesUrls;
    private toTypesNested;
    private commandMap;
    constructor();
    /**
     * Returns true if the message is in the command map, false otherwise
     */
    canHandleMessage(message: string, channel: Eris.TextChannel): boolean;
    handleMessage(message: string, channel: Eris.TextChannel): void;
    isFromType(fromType: string): boolean;
    strength(pkmnType: string, channel: Eris.TextChannel): Promise<void>;
}
