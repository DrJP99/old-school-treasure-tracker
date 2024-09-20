/* eslint-disable react/no-is-mounted */
import { Character, NPC } from './Character'
import { Feat } from './Feat'
import { Monster } from './Monster'
import { CoinTreasure, Treasure } from './Treasure'

interface StringArray {
    [index: string]: number
}

export class Party {
    private characters: Array<Character>
    private treasure: Array<Treasure>
    private monsters: Array<Monster>
    private feats: Array<Feat>
    private partyTxp: number
    private pcShare: number // shares of treasure
    private numShares: number // number of treasure shares
    private xpPcShare: number // shares of XP per PC
    private xpNumShares: number // number of XP shares

    constructor(
        characters: Array<Character> = [],
        treasure: Array<Treasure> = [],
        monsters: Array<Monster> = [],
        feats: Array<Feat> = [],
        pcShare: number = 12,
        numShares: number = 0,
        xpPcShare: number = 2,
        xpNumShares: number = 0
    ) {
        this.characters = characters
        this.treasure = treasure
        this.monsters = monsters
        this.feats = feats
        this.partyTxp = this.calculatePartyTXP()
        this.pcShare = pcShare
        this.numShares = this.calculateShares()
        this.xpPcShare = xpPcShare
        this.xpNumShares = this.calculateXPShares()
    }

    addCharacter = (character: Character | NPC) => {
        this.characters = this.characters.concat(character)
        if (character.getPc()) {
            // if character is PC, add tpx to party's total
            this.partyTxp += character.getTxp()
            this.numShares += this.pcShare
            this.xpNumShares += this.xpPcShare
        } else if (!character.getPc() && character instanceof NPC) {
            // if character is NPC, don't add tpx, add fractional share
            this.numShares += this.shareToNum(
                character.getShare(),
                this.pcShare
            )
            this.xpNumShares += this.xpPcShare / 2
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

    public shareToNum = (share: string, common: number) => {
        let numerator: number = Number(share[0])
        let denominator = Number(share[2])
        return (numerator / denominator) * common
    }

    removeCharacterByUuid = (uuid: string) => {
        this.characters = this.characters.filter((char, i) => {
            if (char.getUuid() === uuid) {
                if (char instanceof NPC) {
                    // if NPC
                    this.numShares -= this.shareToNum(
                        char.getShare(),
                        this.pcShare
                    )
                    this.xpNumShares -= this.xpPcShare / 2
                } else {
                    // if PC
                    this.partyTxp -= char.getTxp()
                    this.numShares -= this.pcShare
                    this.xpNumShares -= this.xpPcShare
                }
            }
            // Return characters who do not have the indicated uuid
            return char.getUuid() !== uuid
        })
    }

    printCharacters = () => {
        console.log('Characters in Party:')
        for (let character of this.characters) {
            console.log(`- ${character.getName()}`)
        }
    }

    public getTreasureXp = (): number => {
        let xp: number = 0

        // sum the total xp recovered from treasure
        for (let t of this.treasure) {
            xp += t.getXp()
        }

        return xp
    }

    public getMonsterXp = (): number => {
        let xp: number = 0

        // sum the total xp from defeating monsters
        for (let m of this.monsters) {
            xp += m.getTotalXp()
        }

        return xp
    }

    public getFeatXp = (): number => {
        let xp: number = 0

        for (let f of this.feats) {
            xp += f.getXP(this.partyTxp)
        }

        return xp
    }

    public getTotalXp = (): number => {
        let xp: number = 0

        xp += this.getMonsterXp()
        xp += this.getTreasureXp()
        // feat xp is excluded, as NPCs don't receive xp from feats of exploration
        // xp += this.getFeatXp()

        return xp
    }

    public getXpPerShare = (): number => {
        return this.xpNumShares !== 0 ? this.getTotalXp() / this.xpNumShares : 0
    }

    public getXpPerPcShare = (): number => {
        // Include Feat xp PC's share
        return (
            this.getXpPerShare() * this.xpPcShare +
            this.getFeatXp() / this.getNumPC()
        )
    }

    public getXpPerNpcShare = (): number => {
        // NPCs don't receive xp from feats of exploration
        return this.getXpPerShare() * (this.xpPcShare / 2)
    }

    public getCharacters = (): Character[] => {
        return this.characters
    }

    public getPcs = (): Character[] => {
        return this.characters.filter((c) => !(c instanceof NPC))
    }

    public getNpcs = (): Character[] => {
        return this.characters.filter((c) => c instanceof NPC)
    }

    public getTreasure = (): Treasure[] => {
        return this.treasure
    }

    public getMonsters = (): Monster[] => {
        return this.monsters
    }

    public getFeats = (): Feat[] => {
        return this.feats
    }

    public getPartyTxp = (): number => {
        return this.partyTxp
    }

    public getPcShare = (): number => {
        return this.pcShare
    }

    public getNumShares = (): number => {
        return this.numShares
    }

    public getXpPcShare(): number {
        return this.xpPcShare
    }

    public setXpPcShare(xpPcShare: number): void {
        this.xpPcShare = xpPcShare
    }

    public getXpNumShares(): number {
        return this.xpNumShares
    }

    public setXpNumShares(xpNumShares: number): void {
        this.xpNumShares = xpNumShares
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
                total += c.getTxp()
            }
        }

        return total
    }

    public calculateShares = (): number => {
        let total = 0

        for (let c of this.characters) {
            total +=
                c instanceof NPC
                    ? this.shareToNum(c.getShare(), this.pcShare)
                    : this.pcShare
        }

        return total
    }

    public calculateXPShares = (): number => {
        let total = 0

        for (let c of this.characters) {
            total += !(c instanceof NPC) ? this.xpPcShare : this.xpPcShare / 2
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
            c.getUuid() === character.getUuid() ? character : c
        )

        this.numShares = this.calculateShares()
        this.numShares = this.calculateXPShares()
        this.partyTxp = this.calculatePartyTXP()
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

    public getGpPerShare = (): number => {
        return this.getTreasureXp() / this.numShares
    }

    public getGpPerPCShare = (): number => {
        return this.getGpPerShare() * this.pcShare
    }

    public getGpPerFractionalShare = (): StringArray => {
        let myObject: StringArray = {}

        for (let c of this.characters) {
            if (c instanceof NPC) {
                if (!(c.getShare() in myObject)) {
                    myObject[c.getShare()] =
                        this.getGpPerShare() *
                        this.shareToNum(c.getShare(), this.pcShare)
                }
            }
        }

        return myObject
    }

    public JSONparse = (json: any): void => {
        json['characters']?.forEach((c: any) => {
            if (c['pc']) {
                this.addCharacter(
                    new Character(
                        c['name'],
                        c['level'],
                        c['charClass'],
                        c['xpMod'],
                        c['pc'],
                        c['uuid']
                    )
                )
            } else {
                this.addCharacter(
                    new NPC(
                        c['name'],
                        c['level'],
                        c['charClass'],
                        c['xpMod'],
                        c['wage'],
                        c['wageCoin'],
                        c['share'],
                        c['uuid']
                    )
                )
            }
        })

        json['feats']?.forEach((f: any) =>
            this.addFeat(
                new Feat(f['name'], f['featLevel'], f['description'], f['uuid'])
            )
        )

        json['monsters']?.forEach((m: any) =>
            this.addMonster(
                new Monster(
                    m['name'],
                    m['description'],
                    m['xp'],
                    m['qty'],
                    m['uuid']
                )
            )
        )

        json['treasure']?.forEach((t: any) => {
            if (t['treasureType'] === 'treasure') {
                this.addTreasure(
                    new Treasure(
                        t['name'],
                        t['description'],
                        t['qty'],
                        t['worth'],
                        t['worthCoin'],
                        t['worthDeterminer'],
                        t['uuid']
                    )
                )
            } else {
                this.addTreasure(
                    new CoinTreasure(t['qty'], t['worthCoin'], t['uuid'])
                )
            }
        })

        // this.calculatePartyTXP()
        // this.calculateShares()
        // this.calculateXPShares()

        // console.log(this)
    }
}

// let myParty: Party = new Party()

// myParty.addCharacter(new Character('John', 3, 'fighter', 0))
// myParty.addCharacter(new Character('Josie', 2, 'cleric', 0))
// myParty.addCharacter(new NPC('Valenti', 1, 'fighter', 0, 1, 'gp', '1/2'))

// myParty.printCharacters()
// console.log(
//     `Party tpx: ${myParty.partyTxp}; number of shares: ${myParty.numShares}/${myParty.pcShare}`
// )
// console.log('\n')

// myParty.addCharacter(new Character('Quackdalf', 5, 'magic-user', 0))

// myParty.printCharacters()
// console.log(
//     `Party tpx: ${myParty.partyTxp}; number of shares: ${myParty.numShares}/${myParty.pcShare}`
// )
// console.log('\n')

// myParty.removeCharacterByName('John')

// myParty.printCharacters()
// console.log(
//     `Party tpx: ${myParty.partyTxp}; number of shares: ${myParty.numShares}/${myParty.pcShare}`
// )
