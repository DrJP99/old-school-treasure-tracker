import { v4 as uuidv4 } from 'uuid'
import { Char_Class } from './Char_Class'
import { Denomination } from './Denomination'
import { get_tpx_by_class_level } from './TXP'

export class Character {
    private name: string = ''
    private uuid: string
    private level: number = 0
    private char_class: Char_Class = Char_Class.normal_human
    private xp_mod: number = 0
    private pc: boolean = false

    constructor(
        name: string,
        level: number,
        char_class: string,
        xp_mod: number,
        pc: boolean = true
    ) {
        this.name = name
        this.uuid = uuidv4()
        this.level = level
        this.char_class = char_class as Char_Class
        this.xp_mod = xp_mod
        this.pc = pc
    }

    get_name = (): string => {
        return this.name
    }

    get_uuid = (): string => {
        return this.uuid
    }

    get_level = (): number => {
        return this.level
    }

    get_char_class = (): Char_Class => {
        return this.char_class
    }

    get_xp_mod = (): number => {
        return this.xp_mod
    }

    get_xp_mod_percentage = (): number => {
        return this.xp_mod / 100 + 1
    }

    get_pc = (): boolean => {
        return this.pc
    }

    to_string = (): string => {
        return `name: ${this.name}; level: ${this.level}; class: ${this.char_class}; xp modifier: ${this.xp_mod}%; ${this.pc ? 'PC' : 'NPC'}`
    }

    get_txp = (): number => {
        return get_tpx_by_class_level(this.char_class, this.level)
    }
}

export class NPC extends Character {
    private wage: number
    private wage_coin: Denomination
    private share: string

    constructor(
        name: string,
        level: number,
        char_class: string,
        xp_mod: number,
        wage: number,
        wage_coin: string,
        share: string
    ) {
        super(name, level, char_class, xp_mod, false)
        this.wage = wage
        this.wage_coin = wage_coin as Denomination
        this.share = share
    }

    get_wage = (): number => {
        return this.wage
    }

    get_wage_coin = (): Denomination => {
        return this.wage_coin
    }
    get_share = (): string => {
        return this.share
    }

    to_string = (): string => {
        return `name: ${this.get_name()}; level: ${this.get_level()}; class: ${this.get_char_class()}; xp modifier: ${this.get_xp_mod()}%; NPC; wage: ${this.get_wage()}${this.get_wage_coin()} daily; treasure share: ${this.get_share()}`
    }
}

// let my_character: Character = new Character('jon', 1, 'cleric', 10, true)
// console.log(my_character.to_string())

// let npc: NPC = new NPC('mikhail', 1, 'fighter', 0, 5, 'gp', '1/2')
// console.log(npc.to_string())
