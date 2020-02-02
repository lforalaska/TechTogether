import Eris from 'eris'

const axios = require('axios')
// const cheerio = require('cheerio');

export default class Strengths {

    private fromTypes: Array<string> = []

    private toTypesUrls: Array<string> = []

    private toTypesNested: Object = {}

    private commandMap = {
        '!strength': this.strength.bind(this),
    }

    constructor() {
        axios.get("https://pokeapi.co/api/v2/type/")
            .then(res => {
                this.fromTypes = res.data.results.map(x => x.name)
                this.toTypesUrls = res.data.results.map(x => x.url)
                this.fromTypes.map(x => this.toTypesNested[x] = [])
                console.log(this.fromTypes)
           })
            .then(res => {
                Promise.all(this.toTypesUrls.map(async (x, index) => {
                   let res = await axios.get(x)
                   this.toTypesNested[this.fromTypes[index]] = (res.data.damage_relations.double_damage_to.map(y => y.name))
                   console.log(`${this.fromTypes[index]}: ${this.toTypesNested[this.fromTypes[index]]}`)
                }))
            })
            .catch(err => {
                console.log(err)
            })
    }

    /**
     * Returns true if the message is in the command map, false otherwise
     */
    canHandleMessage(message: string, channel: Eris.TextChannel): boolean {
        const tokens = message.trim().split(' ')
        const command = tokens.shift()
        if (!command) {
            return false
        }
        if (!tokens.length || tokens[0] === "") { // Didn't include a query or link!
            return false
        }
        console.log(tokens.join(' '))
        return !!this.commandMap[command]
    }

    handleMessage(message: string, channel: Eris.TextChannel): void {
        const tokens = message.split(' ')
        const command = tokens.shift()
        if (!command) {
            return
        }
        console.log(tokens.join(' '))
        this.commandMap[command](tokens.join(' '), channel)
    }

    isFromType(fromType: string): boolean {
            console.log(this.fromTypes.some(x => x.includes(fromType)))
        return this.fromTypes.some(x => x.includes(fromType))
    }

    async strength(pkmnType: string, channel: Eris.TextChannel): Promise<void> {
        if (this.isFromType((pkmnType))) {
            let toTypes = this.toTypesNested[pkmnType]
            console.log(toTypes)
            if (toTypes.length >= 2) {
                let lastElem = toTypes[toTypes.length - 1]
                toTypes[toTypes.length - 1] = `and ${lastElem}`
            }
            if (toTypes.length <= 2) {
                toTypes = toTypes.join(" ")
            } else {
                toTypes = toTypes.join(", ")
            }
            console.log(toTypes)
        let reply = `${pkmnType} defeats ${toTypes}.`
            console.log(reply)
            await channel.createMessage(reply)
        }
    }
}

