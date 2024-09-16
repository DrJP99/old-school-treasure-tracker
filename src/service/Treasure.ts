import { Denomination } from './Denomination'
import { Determiner } from './Determiner'
import { v4 as uuidv4 } from 'uuid'

export class Treasure {
    private name: string
    private uuid: string
    private description: string
    private qty: number
    private worth: number
    private worth_coin: Denomination
    private worth_determiner: Determiner

    constructor(
        name: string,
        description: string,
        qty: number,
        worth: number,
        worth_coin: string,
        worth_determiner: string,
        uuid: string = uuidv4()
    ) {
        this.name = name
        this.uuid = uuid
        this.description = description
        this.qty = qty
        this.worth = worth
        this.worth_coin = worth_coin as Denomination
        this.worth_determiner = worth_determiner as Determiner
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
        super(`${name} coins`, '', qty, qty, worth_coin, 'total', uuid)
    }

    to_string = (): string => {
        return `${this.getQty()} ${this.getName()}`
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
