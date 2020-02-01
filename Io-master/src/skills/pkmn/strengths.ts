const axios = require('axios');
// const cheerio = require('cheerio');

export default class Strengths {

    private toType: string[] = []

    private fromTypes: Array<string> = []

    private commandMap = {
        '!strength': this.strength.bind(this),
    }

    constructor() {
        axios.get("https://pokeapi.co/api/v2/type/")
            .then(res => { 
                this.fromTypes = res.data.results
                console.log(res.data.results)
               })
            .catch(err => {
                console.log(err)
            })
    }

    /**
     * Returns true if the message is in the command map, false otherwise
     */
    canHandleMessage(message: string): boolean {
        const tokens = message.trim().split(' ')
        const command = tokens.shift()
        if (!command) {
            return false
        }
        if (!tokens.length || tokens[0] === "") { // Didn't include a query or link!
            return false
        }
        console.log('canHandleMessage')
        console.log(tokens.join(' '))
        return !!this.commandMap[command]
    }

    handleMessage(message: string): string {
        const tokens = message.split(' ')
        const command = tokens.shift()
        if (!command) {
            return ''
        }
        console.log('handleMessage')
        console.log(tokens.join(' '))
        return this.commandMap[command](tokens.join(' '))
    }

    isFromType(fromType: string): boolean {
        console.log('isFromType')
        console.log(this.fromTypes.map(x => x['name']))
        console.log(this.fromTypes.map(x => x['name']).includes(fromType))
        return this.fromTypes.map(x => x['name']).includes(fromType)
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

    strength(pkmnType: string): string {
        if (this.isFromType((pkmnType))) {
            console.log(`${pkmnType} is a type.`)
            return `${pkmnType} is a type.`
        } else {
	    return `Not a type.`
	}
    }
}

