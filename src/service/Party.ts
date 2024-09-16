import { Character, NPC } from './Character'
import { Feat } from './Feat'
import { Monster } from './Monster'
import { Treasure } from './Treasure'

export class Party {
    private characters: Array<Character>
    private treasure: Array<Treasure>
    private monsters: Array<Monster>
    private feats: Array<Feat>
    private party_txp: number
    private pc_share: number // shares of treasure
    private num_shares: number // number of treasure shares
    private xp_pc_share: number // shares of XP per PC
    private xp_num_shares: number // number of XP shares

    constructor(
        characters: Array<Character> = [],
        treasure: Array<Treasure> = [],
        monsters: Array<Monster> = [],
        feats: Array<Feat> = [],
        pc_share: number = 12,
        num_shares: number = 0,
        xp_pc_share: number = 2,
        xp_num_shares: number = 0
    ) {
        this.characters = characters
        this.treasure = treasure
        this.monsters = monsters
        this.feats = feats
        this.party_txp = this.calculatePartyTXP()
        this.pc_share = pc_share
        this.num_shares = num_shares
        this.xp_pc_share = xp_pc_share
        this.xp_num_shares = xp_num_shares
    }

    add_character = (character: Character | NPC) => {
        this.characters = this.characters.concat(character)
        if (character.get_pc()) {
            // if character is PC, add tpx to party's total
            this.party_txp += character.get_txp()
            this.num_shares += this.pc_share
            this.xp_num_shares += this.xp_pc_share
        } else if (!character.get_pc() && character instanceof NPC) {
            // if character is NPC, don't add tpx, add fractional share
            this.num_shares += this.share_to_num(
                character.get_share(),
                this.pc_share
            )
            this.xp_num_shares += this.xp_pc_share / 2
        }
    }

    addTreasure = (treasure: Treasure) => {
        this.treasure = this.treasure.concat(treasure)
    }

    addMonster = (monster: Monster) => {
        this.monsters = this.monsters.concat(monster)
    }

    addFeat = (feat: Feat) => {
        this.feats = this.feats.concat(feat)
    }

    public share_to_num = (share: string, common: number) => {
        let numerator: number = Number(share[0])
        let denominator = Number(share[2])
        return (numerator / denominator) * common
    }

    // remove_character_by_name = (name: string) => {
    //     this.characters = this.characters.filter((char) => {
    //         if (char.get_name() === name) {
    //             if (char.get_pc()) {
    //                 // if PC, remove number of pc shares
    //                 this.num_shares -= 12
    //                 this.party_txp -= char.get_txp()
    //             } else if (!char.get_pc() && char instanceof NPC) {
    //                 // if NPC, calculate number of share
    //                 this.num_shares -= this.share_to_num(
    //                     char.get_share(),
    //                     this.pc_share
    //                 )
    //             }
    //         }
    //         // return only characters who are not the one we want to remove
    //         return char.get_name() !== name
    //     })
    // }

    // remove_character_by_index = (index: number) => {
    //     this.characters = this.characters.filter((char, i) => {
    //         if (i === index) {
    //             if (char.get_pc()) {
    //                 // if PC, remove number of pc shares
    //                 this.num_shares -= 12
    //                 this.party_txp -= char.get_txp()
    //             } else if (!char.get_pc() && char instanceof NPC) {
    //                 // if NPC, calculate number of share
    //                 this.num_shares -= this.share_to_num(
    //                     char.get_share(),
    //                     this.pc_share
    //                 )
    //             }
    //         }
    //         // return indices that are not the one we want to remove
    //         return i !== index
    //     })
    // }

    remove_character_by_uuid = (uuid: string) => {
        this.characters = this.characters.filter((char, i) => {
            if (char.get_uuid() === uuid) {
                if (char instanceof NPC) {
                    // if NPC
                    this.num_shares -= this.share_to_num(
                        char.get_share(),
                        this.pc_share
                    )
                    this.xp_num_shares -= this.xp_pc_share / 2
                } else {
                    // if PC
                    this.party_txp -= char.get_txp()
                    this.num_shares -= this.pc_share
                    this.xp_num_shares -= this.xp_pc_share
                }
            }
            // Return characters who do not have the indicated uuid
            return char.get_uuid() !== uuid
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

    public get_feat_xp = (): number => {
        let xp: number = 0

        for (let f of this.feats) {
            xp += f.getXP(this.party_txp)
        }

        return xp
    }

    public get_total_xp = (): number => {
        let xp: number = 0

        xp += this.get_monster_xp()
        xp += this.get_treasure_xp()
        // feat xp is excluded, as NPCs don't receive xp from feats of exploration
        // xp += this.get_feat_xp()

        return xp
    }

    public get_xp_per_share = (): number => {
        return this.xp_num_shares !== 0
            ? this.get_total_xp() / this.xp_num_shares
            : 0
    }

    public get_xp_per_pc_share = (): number => {
        // Include Feat xp PC's share
        return (
            this.get_xp_per_share() * this.xp_pc_share +
            this.get_feat_xp() / this.getNumPC()
        )
    }

    public get_xp_per_npc_share = (): number => {
        // NPCs don't receive xp from feats of exploration
        return this.get_xp_per_share() * (this.xp_pc_share / 2)
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

    public get_feats = (): Feat[] => {
        return this.feats
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

    public getXp_pc_share(): number {
        return this.xp_pc_share
    }

    public setXp_pc_share(xp_pc_share: number): void {
        this.xp_pc_share = xp_pc_share
    }

    public getXp_num_shares(): number {
        return this.xp_num_shares
    }

    public setXp_num_shares(xp_num_shares: number): void {
        this.xp_num_shares = xp_num_shares
    }

    public getNumNPC = (): number => {
        let num = 0

        for (let c of this.characters) {
            if (c instanceof NPC) {
                num++
            }
        }

        return num
    }

    public calculatePartyTXP = (): number => {
        let total = 0

        for (let c of this.characters) {
            if (!(c instanceof NPC)) {
                total += c.get_txp()
            }
        }

        return total
    }

    public calculateShares = (): number => {
        let total = 0

        for (let c of this.characters) {
            total +=
                c instanceof NPC
                    ? this.share_to_num(c.get_share(), this.pc_share)
                    : this.pc_share
        }

        return total
    }

    public getNumPC = (): number => {
        let num = 0

        for (let c of this.characters) {
            if (!(c instanceof NPC)) {
                num++
            }
        }

        return num
    }

    public removeMonster = (uuid: string): void => {
        this.monsters = this.monsters.filter((m) => m.getUuid() !== uuid)
    }

    public removeTreasure = (uuid: string): void => {
        this.treasure = this.treasure.filter((m) => m.getUuid() !== uuid)
    }

    public removeFeat = (uuid: string): void => {
        this.feats = this.feats.filter((m) => m.getUuid() !== uuid)
    }

    public editCharacter = (character: Character) => {
        this.characters = this.characters.map((c) =>
            c.get_uuid() === character.get_uuid() ? character : c
        )

        this.num_shares = this.calculateShares()
        this.party_txp = this.calculatePartyTXP()
    }

    public editTreasure = (treasure: Treasure): void => {
        this.treasure = this.treasure.map((t) =>
            t.getUuid() === treasure.getUuid() ? treasure : t
        )
    }

    public editMonster = (monster: Monster): void => {
        this.monsters = this.monsters.map((m) =>
            m.getUuid() === monster.getUuid() ? monster : m
        )
    }

    public editFeat = (feat: Feat): void => {
        this.feats = this.feats.map((f) =>
            f.getUuid() === feat.getUuid() ? feat : f
        )
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
