export default class Strengths {
    private toType;
    private fromType;
    private commandMap;
    constructor();
    /**
     * Returns true if the message is in the command map, false otherwise
     */
    canHandleMessage(message: string): boolean;
    handleMessage(message: string): void;
    isFromType(fromType: string): boolean;
    strength(pkmnType: string): void;
}
