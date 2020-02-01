export default class Strengths {
    private toType;
    private fromTypes;
    private commandMap;
    constructor();
    /**
     * Returns true if the message is in the command map, false otherwise
     */
    canHandleMessage(message: string): boolean;
    handleMessage(message: string): string;
    isFromType(fromType: string): boolean;
    strength(pkmnType: string): string;
}
