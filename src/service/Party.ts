import { Character, NPC } from './Character'
import { Monster } from './Monster'
import { Treasure } from './Treasure'

let share_to_num = (share: string, common: number) => {
    let numerator: number = Number(share[0])
    let denominator = Number(share[2])
    return (numerator / denominator) * common
}

export class Party {
    private characters: Array<Character>
    private treasure: Array<Treasure>
    private monsters: Array<Monster>
    private party_txp: number
    private pc_share: number
    private num_shares: number

    constructor(
        characters: Array<Character> = [],
        treasure: Array<Treasure> = [],
        monsters: Array<Monster> = [],
        party_txp: number = 0,
        pc_share: number = 12,
        num_shares: number = 0
    ) {
        this.characters = characters
        this.treasure = treasure
        this.monsters = monsters
        this.party_txp = party_txp
        this.pc_share = pc_share
        this.num_shares = num_shares
    }

    add_character(character: Character | NPC) {
        this.characters = this.characters.concat(character)
        if (character.get_pc()) {
            // if character is PC, add tpx to party's total
            this.party_txp += character.get_txp()
            this.num_shares += this.pc_share
        } else if (!character.get_pc() && character instanceof NPC) {
            // if character is NPC, don't add tpx, add fractional share
            this.num_shares += share_to_num(
                character.get_share(),
                this.pc_share
            )
        }
    }

    remove_character_by_name(name: string) {
        this.characters = this.characters.filter((char) => {
            if (char.get_name() === name) {
                if (char.get_pc()) {
                    // if PC, remove number of pc shares
                    this.num_shares -= 12
                    this.party_txp -= char.get_txp()
                } else if (!char.get_pc() && char instanceof NPC) {
                    // if NPC, calculate number of share
                    this.num_shares -= share_to_num(
                        char.get_share(),
                        this.pc_share
                    )
                }
            }
            // return only characters who are not the one we want to remove
            return char.get_name() !== name
        })
    }

    remove_character_by_index(index: number) {
        this.characters = this.characters.filter((char, i) => {
            if (i === index) {
                if (char.get_pc()) {
                    // if PC, remove number of pc shares
                    this.num_shares -= 12
                    this.party_txp -= char.get_txp()
                } else if (!char.get_pc() && char instanceof NPC) {
                    // if NPC, calculate number of share
                    this.num_shares -= share_to_num(
                        char.get_share(),
                        this.pc_share
                    )
                }
            }
            // return indices that are not the one we want to remove
            return i !== index
        })
    }

    print_characters = () => {
        console.log('Characters in Party:')
        for (let character of this.characters) {
            console.log(`- ${character.get_name()}`)
        }
    }

    public get_treasure_xp = (): number => {
        let xp: number = 0

        // sum the total xp recovered from treasure
        for (let t of this.treasure) {
            xp += t.get_xp()
        }

        return xp
    }

    public get_monster_xp = (): number => {
        let xp: number = 0

        // sum the total xp from defeating monsters
        for (let m of this.monsters) {
            xp += m.get_total_xp()
        }

        return xp
    }

    public get_total_xp = (): number => {
        let xp: number = 0

        xp += this.get_monster_xp()
        xp += this.get_treasure_xp()

        return xp
    }

    public get_xp_per_share = (): number => {
        return this.get_total_xp() / this.num_shares
    }

    public get_xp_per_pc_share = (): number => {
        return this.get_xp_per_share() * this.pc_share
    }

    public get_characters = (): Character[] => {
        return this.characters
    }

    public get_treasure = (): Treasure[] => {
        return this.treasure
    }

    public get_monsters = (): Monster[] => {
        return this.monsters
    }

    public get_party_txp = (): number => {
        return this.party_txp
    }

    public get_pc_share = (): number => {
        return this.pc_share
    }

    public get_num_shares = (): number => {
        return this.num_shares
    }
}

// let my_party: Party = new Party()

// my_party.add_character(new Character('John', 3, 'fighter', 0))
// my_party.add_character(new Character('Josie', 2, 'cleric', 0))
// my_party.add_character(new NPC('Valenti', 1, 'fighter', 0, 1, 'gp', '1/2'))

// my_party.print_characters()
// console.log(
//     `Party tpx: ${my_party.party_txp}; number of shares: ${my_party.num_shares}/${my_party.pc_share}`
// )
// console.log('\n')

// my_party.add_character(new Character('Quackdalf', 5, 'magic-user', 0))

// my_party.print_characters()
// console.log(
//     `Party tpx: ${my_party.party_txp}; number of shares: ${my_party.num_shares}/${my_party.pc_share}`
// )
// console.log('\n')

// my_party.remove_character_by_name('John')

// my_party.print_characters()
// console.log(
//     `Party tpx: ${my_party.party_txp}; number of shares: ${my_party.num_shares}/${my_party.pc_share}`
// )
