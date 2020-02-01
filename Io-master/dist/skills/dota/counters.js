"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const cheerio = require('cheerio');
class DotaCounters {
    constructor() {
        this.counters = [];
        // This may need to be pulled out into somewhere more accessible for other Dota skills
        this.heroes = ["Anti Mage", "Axe", "Bane", "Bloodseeker", "Crystal Maiden",
            "Drow Ranger", "Earthshaker", "Juggernaut", "Mirana", "Shadow Fiend", "Morphling",
            "Phantom Lancer", "Puck", "Pudge", "Razor", "Sand King", "Storm Spirit", "Sven", "Tiny",
            "Vengeful Spirit", "Windranger", "Zeus", "Kunkka", "Lina", "Lich", "Lion", "Shadow Shaman",
            "Slardar", "Tidehunter", "Witch Doctor", "Riki", "Enigma", "Tinker", "Sniper", "Necrophos",
            "Warlock", "Beastmaster", "Queen of Pain", "Venomancer", "Faceless Void", "Wraith King",
            "Death Prophet", "Phantom Assassin", "Pugna", "Templar Assassin", "Viper", "Luna",
            "Dragon Knight", "Dazzle", "Clockwerk", "Leshrac", "Nature's Prophet", "Lifestealer",
            "Dark Seer", "Clinkz", "Omniknight", "Enchantress", "Huskar", "Night Stalker",
            "Broodmother", "Bounty Hunter", "Weaver", "Jakiro", "Batrider", "Chen", "Spectre",
            "Doom", "Ancient Apparition", "Ursa", "Spirit Breaker", "Gyrocopter", "Alchemist",
            "Invoker", "Silencer", "Outworld Devourer", "Lycan", "Brewmaster", "Shadow Demon",
            "Lone Druid", "Chaos Knight", "Meepo", "Treant Protector", "Ogre Magi", "Undying",
            "Rubick", "Disruptor", "Nyx Assassin", "Naga Siren", "Keeper of the Light", "Io",
            "Visage", "Slark", "Medusa", "Troll Warlord", "Centaur Warrunner", "Magnus",
            "Timbersaw", "Bristleback", "Tusk", "Skywrath Mage", "Abaddon", "Elder Titan",
            "Legion Commander", "Ember Spirit", "Earth Spirit", "Terrorblade", "Phoenix",
            "Oracle", "Techies", "Winter Wyvern", "Arc Warden", "Underlord", "Monkey King",
            "Pangolier", "Dark Willow", "Grimstroke", "Mars", "Void Spirit", "Snapfire"];
        this.commandMap = {
            '!counter': this.counter.bind(this),
        };
    }
    /**
     * Returns true if the message is in the command map, false otherwise
     */
    canHandleMessage(message) {
        const tokens = message.trim().split(' ');
        const command = tokens.shift();
        if (!command) {
            return false;
        }
        if (!tokens.length || tokens[0] === "") { // Didn't include a query or link!
            return false;
        }
        return !!this.commandMap[command];
    }
    handleMessage(message) {
        const tokens = message.split(' ');
        const command = tokens.shift();
        if (!command) {
            return;
        }
        this.commandMap[command](tokens.join(' '));
        console.log("Read the Counter message");
    }
    isHeroName(hero) {
        return this.heroes.includes(hero);
    }
    generateLink(hero) {
        const formmatedHero = hero.replace(/ /g, "_");
        const link = 'https://dota2.gamepedia.com/'.concat(formmatedHero, '/Counters');
        return link;
    }
    getHTML(link) {
        axios.get(link)
            .then((html) => {
            console.log(cheerio('.mw-content-ltr', html).text());
        })
            .catch((err) => ({
            error: err,
        }));
    }
    // parseHTML(content: string): any{
    //     // Accept block of text and format pretty into a string
    //     return content
    // }
    counter(hero) {
        if (this.isHeroName((hero))) {
            const link = this.generateLink(hero);
            const unformattedContent = this.getHTML(link);
            // const formattedContent = this.parseHTML(unformattedContent)
            console.log(unformattedContent);
            console.log("Counter function has been called");
        }
        // Call generateLink, getHTML, and parseHTML. Reply with counters
    }
}
exports.default = DotaCounters;
//# sourceMappingURL=counters.js.map