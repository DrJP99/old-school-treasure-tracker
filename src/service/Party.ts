import { Character, NPC } from './Character'
import { Treasure } from './Treasure'

let share_to_num = (share: string, common: number) => {
    let numerator: number = Number(share[0])
    let denominator = Number(share[2])
    return (numerator / denominator) * common
}

export class Party {
    characters: Array<Character>
    treasure: Array<Treasure>
    party_txp: number
    pc_share: number
    num_shares: number

    constructor() {
        this.characters = []
        this.treasure = []
        this.party_txp = 0
        this.pc_share = 12
        this.num_shares = 0
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
