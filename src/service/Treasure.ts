import { Denomination } from './Denomination'
import { Determiner } from './Determiner'
import { v4 as uuidv4 } from 'uuid'

enum TreasureType {
    treasure = 'treasure',
    coin = 'coin',
}

export class Treasure {
    private name: string
    private uuid: string
    private description: string
    private qty: number
    private worth: number
    private worthCoin: Denomination
    private worthDeterminer: Determiner
    private treasureType: TreasureType

    constructor(
        name: string,
        description: string,
        qty: number,
        worth: number,
        worthCoin: string,
        worthDeterminer: string,
        uuid: string = uuidv4(),
        treasureType = TreasureType.treasure
    ) {
        this.name = name
        this.uuid = uuid
        this.description = description
        this.qty = qty
        this.worth = worth
        this.worthCoin = worthCoin as Denomination
        this.worthDeterminer = worthDeterminer as Determiner
        this.treasureType = treasureType as TreasureType
    }

    public getName(): string {
        return this.name
    }

    public setName(name: string): void {
        this.name = name
    }

    public getUuid = (): string => {
        return this.uuid
    }

    public getDescription(): string {
        return this.description
    }

    public setDescription(description: string): void {
        this.description = description
    }

    public getQty(): number {
        return this.qty
    }

    public setQty(qty: number): void {
        this.qty = qty
    }

    public getWorth(): number {
        return this.worth
    }

    public setWorth(worth: number): void {
        this.worth = worth
    }

    public getWorthCoin(): Denomination {
        return this.worthCoin
    }

    public setWorthCoin(worthCoin: Denomination): void {
        this.worthCoin = worthCoin
    }

    public getWorthDeterminer(): Determiner {
        return this.worthDeterminer
    }

    public setWorthDeterminer(worthDeterminer: Determiner): void {
        this.worthDeterminer = worthDeterminer
    }

    toString = (): string => {
        return `${this.qty > 1 ? `${this.qty}x ` : ''}${this.name}${this.description.length > 0 ? `(${this.description})` : ''}${this.worth > 0 ? `, (worth ${this.worth}${this.worthCoin} ${this.worthDeterminer})` : ''}`
    }

    public getXp = (): number => {
        let xp: number = 0
        let totalWorth: number = 0

        // calculate total worth (in case of eaches)
        if (this.worthDeterminer === Determiner.total) {
            totalWorth = this.worth
        } else if (this.worthDeterminer === Determiner.each) {
            totalWorth = this.worth * this.qty
        }

        // convert from different denominations to gp
        switch (this.worthCoin) {
            case Denomination.pp:
                xp = totalWorth * 5
                break
            case Denomination.gp:
                xp = totalWorth
                break
            case Denomination.ep:
                xp = totalWorth / 2
                break
            case Denomination.sp:
                xp = totalWorth / 10
                break
            case Denomination.cp:
                xp = totalWorth / 100
        }

        return xp
    }

    public toGp = (n: number, c: Denomination): number => {
        let worth = 0

        switch (c) {
            case Denomination.pp:
                worth = n * 5
                break
            case Denomination.gp:
                worth = n
                break
            case Denomination.ep:
                worth = n / 2
                break
            case Denomination.sp:
                worth = n / 10
                break
            case Denomination.cp:
                worth = n / 100
        }

        return worth
    }
}

export class CoinTreasure extends Treasure {
    constructor(qty: number, worthCoin: string, uuid: string = uuidv4()) {
        let name = 'Gold'
        switch (worthCoin) {
            case 'pp':
                name = 'Platinum'
                break
            case 'gp':
                name = 'Gold'
                break
            case 'ep':
                name = 'Electrum'
                break
            case 'sp':
                name = 'Silver'
                break
            case 'cp':
                name = 'Copper'
                break
        }
        super(
            `${name} coins`,
            '',
            qty,
            qty,
            worthCoin,
            'total',
            uuid,
            TreasureType.coin
        )
    }

    toString = (): string => {
        return `${this.getQty().toLocaleString()} ${this.getName()}`
    }
}

// console.log(new Treasure('gem', 'red ruby', 4, 25, 'gp', 'each').toString())
// console.log(new CoinTreasure(1200, 'gp').toString())
// console.log(
//     new Treasure(
//         'sword',
//         '+1 to attack and damage, pale blue metal, stronger than steel',
//         1,
//         0,
//         'gp',
//         'each'
//     ).toString()
// )
