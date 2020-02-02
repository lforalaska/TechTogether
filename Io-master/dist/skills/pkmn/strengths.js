"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
// const cheerio = require('cheerio');
class Strengths {
    constructor() {
        this.fromTypes = [];
        this.toTypesUrls = [];
        this.toTypesNested = {};
        this.commandMap = {
            '!strength': this.strength.bind(this),
        };
        axios.get("https://pokeapi.co/api/v2/type/")
            .then(res => {
            this.fromTypes = res.data.results.map(x => x.name);
            this.toTypesUrls = res.data.results.map(x => x.url);
            this.fromTypes.map(x => this.toTypesNested[x] = []);
            console.log(this.fromTypes);
        })
            .then(res => {
            Promise.all(this.toTypesUrls.map((x, index) => __awaiter(this, void 0, void 0, function* () {
                let res = yield axios.get(x);
                this.toTypesNested[this.fromTypes[index]] = (res.data.damage_relations.double_damage_to.map(y => y.name));
                console.log(`${this.fromTypes[index]}: ${this.toTypesNested[this.fromTypes[index]]}`);
            })));
        })
            .catch(err => {
            console.log(err);
        });
    }
    /**
     * Returns true if the message is in the command map, false otherwise
     */
    canHandleMessage(message, channel) {
        const tokens = message.trim().split(' ');
        const command = tokens.shift();
        if (!command) {
            return false;
        }
        if (!tokens.length || tokens[0] === "") { // Didn't include a query or link!
            return false;
        }
        console.log(tokens.join(' '));
        return !!this.commandMap[command];
    }
    handleMessage(message, channel) {
        const tokens = message.split(' ');
        const command = tokens.shift();
        if (!command) {
            return;
        }
        console.log(tokens.join(' '));
        this.commandMap[command](tokens.join(' '), channel);
    }
    isFromType(fromType) {
        console.log(this.fromTypes.some(x => x.includes(fromType)));
        return this.fromTypes.some(x => x.includes(fromType));
    }
    strength(pkmnType, channel) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFromType((pkmnType))) {
                let toTypes = this.toTypesNested[pkmnType];
                console.log(toTypes);
                if (toTypes.length >= 2) {
                    let lastElem = toTypes[toTypes.length - 1];
                    toTypes[toTypes.length - 1] = `and ${lastElem}`;
                }
                if (toTypes.length <= 2) {
                    toTypes = toTypes.join(" ");
                }
                else {
                    toTypes = toTypes.join(", ");
                }
                console.log(toTypes);
                let reply = `${pkmnType} defeats ${toTypes}.`;
                console.log(reply);
                yield channel.createMessage(reply);
            }
        });
    }
}
exports.default = Strengths;
//# sourceMappingURL=strengths.js.map