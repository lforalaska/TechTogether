"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const cheerio = require('cheerio');
class Strengths {
    constructor() {
        this.toType = [];
        this.fromType = [];
        this.commandMap = {
            '!strength': this.strength.bind(this),
        };
        axios.get("https://pokeapi.co/api/v2/type")
            .then(data => {
            const results = data.results;
            this.fromType = Object.keys(results).map(key => results[key]);
            console.log(Object.keys(results).map(key => results[key]));
        })
            .catch(err => {
            console.log(err);
        });
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
        console.log(tokens.join(' '));
    }
    isFromType(fromType) {
        return fromType in this.fromType.keys();
    }
    /*
        generateLink(hero: string): string {
            const formmatedHero = hero.replace(/ /g, "_")
            const link = 'https://dota2.gamepedia.com/'.concat(formmatedHero, '/Counters')
            return link
        }
    
        getHTML(link: string): any {
            axios.get(link)
                .then((html) => {
                    console.log(cheerio('.mw-content-ltr',
                        html).text());
                })
                .catch((err) => ({
                        error: err,
                    }));
        }
    */
    strength(pkmnType) {
        if (this.isFromType((pkmnType))) {
            console.log(`${pkmnType} is a type`);
        }
    }
}
exports.default = Strengths;
//# sourceMappingURL=strength.js.map