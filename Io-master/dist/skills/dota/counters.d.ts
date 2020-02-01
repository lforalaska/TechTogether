export default class DotaCounters {
    private counters;
    private heroes;
    private commandMap;
    /**
     * Returns true if the message is in the command map, false otherwise
     */
    canHandleMessage(message: string): boolean;
    handleMessage(message: string): void;
    isHeroName(hero: string): boolean;
    generateLink(hero: string): string;
    getHTML(link: string): any;
    counter(hero: string): void;
}
