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
    private worth_coin: Denomination
    private worth_determiner: Determiner
    private treasureType: TreasureType

    constructor(
        name: string,
        description: string,
        qty: number,
        worth: number,
        worth_coin: string,
        worth_determiner: string,
        uuid: string = uuidv4(),
        treasureType = TreasureType.treasure
    ) {
        this.name = name
        this.uuid = uuid
        this.description = description
        this.qty = qty
        this.worth = worth
        this.worth_coin = worth_coin as Denomination
        this.worth_determiner = worth_determiner as Determiner
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

    public getWorth_coin(): Denomination {
        return this.worth_coin
    }

    public setWorth_coin(worth_coin: Denomination): void {
        this.worth_coin = worth_coin
    }

    public getWorth_determiner(): Determiner {
        return this.worth_determiner
    }

    public setWorth_determiner(worth_determiner: Determiner): void {
        this.worth_determiner = worth_determiner
    }

    to_string = (): string => {
        return `${this.qty > 1 ? `${this.qty}x ` : ''}${this.name}${this.description.length > 0 ? `(${this.description})` : ''}${this.worth > 0 ? `, (worth ${this.worth}${this.worth_coin} ${this.worth_determiner})` : ''}`
    }

    public get_xp = (): number => {
        let xp: number = 0
        let total_worth: number = 0

        // calculate total worth (in case of eaches)
        if (this.worth_determiner === Determiner.total) {
            total_worth = this.worth
        } else if (this.worth_determiner === Determiner.each) {
            total_worth = this.worth * this.qty
        }

        // convert from different denominations to gp
        switch (this.worth_coin) {
            case Denomination.pp:
                xp = total_worth * 5
                break
            case Denomination.gp:
                xp = total_worth
                break
            case Denomination.ep:
                xp = total_worth / 2
                break
            case Denomination.sp:
                xp = total_worth / 10
                break
            case Denomination.cp:
                xp = total_worth / 100
        }

        return xp
    }

    public to_gp = (n: number, c: Denomination): number => {
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

export class Coin_Treasure extends Treasure {
    constructor(qty: number, worth_coin: string, uuid: string = uuidv4()) {
        let name = 'Gold'
        switch (worth_coin) {
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
            worth_coin,
            'total',
            uuid,
            TreasureType.coin
        )
    }

    to_string = (): string => {
        return `${this.getQty().toLocaleString()} ${this.getName()}`
    }
}

// console.log(new Treasure('gem', 'red ruby', 4, 25, 'gp', 'each').to_string())
// console.log(new Coin_Treasure(1200, 'gp').to_string())
// console.log(
//     new Treasure(
//         'sword',
//         '+1 to attack and damage, pale blue metal, stronger than steel',
//         1,
//         0,
//         'gp',
//         'each'
//     ).to_string()
// )
