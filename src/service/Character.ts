import { v4 as uuidv4 } from 'uuid'
import { CharClass } from './CharClass'
import { Denomination } from './Denomination'
import { getTpxByClassLevel } from './TXP'

export class Character {
    private name: string = ''
    private uuid: string
    private level: number = 0
    private charClass: CharClass = CharClass.normalHuman
    private xpMod: number = 0
    private pc: boolean = false

    constructor(
        name: string,
        level: number,
        charClass: string,
        xpMod: number,
        pc: boolean = true,
        uuid = uuidv4()
    ) {
        this.name = name
        this.uuid = uuid
        this.level = level
        this.charClass = charClass as CharClass
        this.xpMod = xpMod
        this.pc = pc
    }

    getName = (): string => {
        return this.name
    }

    getUuid = (): string => {
        return this.uuid
    }

    getLevel = (): number => {
        return this.level
    }

    getCharClass = (): CharClass => {
        return this.charClass
    }

    getXpMod = (): number => {
        return this.xpMod
    }

    getXpModPercentage = (): number => {
        return this.xpMod / 100 + 1
    }

    getPc = (): boolean => {
        return this.pc
    }

    toString = (): string => {
        return `name: ${this.name}; level: ${this.level}; class: ${this.charClass}; xp modifier: ${this.xpMod}%; ${this.pc ? 'PC' : 'NPC'}`
    }

    getTxp = (): number => {
        return getTpxByClassLevel(this.charClass, this.level)
    }
}

export class NPC extends Character {
    private wage: number
    private wageCoin: Denomination
    private share: string

    constructor(
        name: string,
        level: number,
        charClass: string,
        xpMod: number,
        wage: number,
        wageCoin: string,
        share: string,
        uuid = uuidv4()
    ) {
        super(name, level, charClass, xpMod, false, uuid)
        this.wage = wage
        this.wageCoin = wageCoin as Denomination
        this.share = share
    }

    getWage = (): number => {
        return this.wage
    }

    getWageCoin = (): Denomination => {
        return this.wageCoin
    }
    getShare = (): string => {
        return this.share
    }

    toString = (): string => {
        return `name: ${this.getName()}; level: ${this.getLevel()}; class: ${this.getCharClass()}; xp modifier: ${this.getXpMod()}%; NPC; wage: ${this.getWage()}${this.getWageCoin()} daily; treasure share: ${this.getShare()}`
    }
}

// let myCharacter: Character = new Character('jon', 1, 'cleric', 10, true)
// console.log(myCharacter.toString())

// let npc: NPC = new NPC('mikhail', 1, 'fighter', 0, 5, 'gp', '1/2')
// console.log(npc.toString())
