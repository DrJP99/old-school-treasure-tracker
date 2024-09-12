import { Denomination } from "./Denomination"
import { Determiner } from "./Determiner"

export class Treasure {
	name: string
	description: string
	qty: number
	worth: number
	worth_coin: Denomination
	worth_determiner: Determiner

	constructor(name: string, description: string, qty: number, worth: number, worth_coin: string, worth_determiner: string) {
		this.name = name
		this.description = description
		this.qty = qty
		this.worth = worth
		this.worth_coin = worth_coin as Denomination
		this.worth_determiner = worth_determiner as Determiner
	}

	to_string = () : string => {
		return `${this.qty > 1 ? `${this.qty}x ` : ''}${this.name}${this.description.length > 0 ? `(${this.description})` : ''}${this.worth > 0 ? `, (worth ${this.worth}${this.worth_coin} ${this.worth_determiner})` : ''}`
	}
}

export class Coin_Treasure extends Treasure{
	constructor(qty: number, worth_coin: string) {
		let name = 'Gold'
		switch (worth_coin) {
			case('pp'):
				name = 'Platinum'
				break
			case('gp'):
				name = 'Gold'
				break
			case('ep'):
				name = 'Electrum'
				break
			case('sp'):
				name = 'Silver'
				break
			case('cp'):
				name = 'Copper'
				break
		}
		super(`${name} coins`, '', qty, qty, worth_coin, 'total')
	}

	to_string = () : string => {
		return `${this.qty} ${this.name}`
	}
}

console.log(new Treasure('gem', 'red ruby', 4, 25, 'gp', 'each').to_string())
console.log(new Coin_Treasure(1200, 'gp').to_string())
console.log(new Treasure('sword', '+1 to attack and damage, pale blue metal, stronger than steel', 1, 0, 'gp', 'each').to_string())
