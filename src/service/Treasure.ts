import { Denomination } from './Denomination'
import { Determiner } from './Determiner'

export class Treasure {
    name: string
    description: string
    qty: number
    worth: number
    worth_coin: Denomination
    worth_determiner: Determiner

    constructor(
        name: string,
        description: string,
        qty: number,
        worth: number,
        worth_coin: string,
        worth_determiner: string
    ) {
        this.name = name
        this.description = description
        this.qty = qty
        this.worth = worth
        this.worth_coin = worth_coin as Denomination
        this.worth_determiner = worth_determiner as Determiner
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
    constructor(qty: number, worth_coin: string) {
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
        super(`${name} coins`, '', qty, qty, worth_coin, 'total')
    }

    to_string = (): string => {
        return `${this.qty} ${this.name}`
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
