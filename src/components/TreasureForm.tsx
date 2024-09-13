import { FormEvent, useState } from 'react'
import { Coin_Treasure, Treasure } from '../service/Treasure'
import { Determiner } from '../service/Determiner'
import { Denomination } from '../service/Denomination'
import { getEnumKeys } from '../service/EnumKeys'
import { capitalize } from '../service/Capitalize'

interface TreasureFormProps {
    returnTreasure: (treasure: Treasure) => void
}

enum CoinTreasure {
    treasure = 'treasure',
    coins = 'coins',
}

const TreasureForm = ({ returnTreasure }: TreasureFormProps) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [qty, setQty] = useState(1)
    const [coinTreasure, setCoinTreasure] = useState<CoinTreasure>(
        CoinTreasure.treasure
    )
    const [worth, setWorth] = useState(0)
    const [worthCoin, setWorthCoin] = useState<Denomination>(Denomination.gp)
    const [worthDeterminer, setWorthDeterminer] = useState<Determiner>(
        Determiner.each
    )

    let addTreasure = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        var treasure: Treasure
        if (coinTreasure === CoinTreasure.treasure) {
            treasure = new Treasure(
                name,
                description,
                qty,
                worth,
                worthCoin,
                worthDeterminer
            )
        } else {
            treasure = new Coin_Treasure(qty, worthCoin)
        }

        returnTreasure(treasure)
    }

    return (
        <form onSubmit={addTreasure}>
            <select
                value={coinTreasure}
                onChange={(e) =>
                    setCoinTreasure(e.target.value as CoinTreasure)
                }
            >
                {getEnumKeys(CoinTreasure).map((key, index) => (
                    <option key={index} value={CoinTreasure[key]}>
                        {capitalize(key)}
                    </option>
                ))}
            </select>
            {coinTreasure === CoinTreasure.treasure ? (
                <>
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        name="description"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        name="qty"
                        type="number"
                        placeholder="Quantity"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                    />
                    <input
                        name="worth"
                        type="number"
                        placeholder="Worth"
                        value={worth}
                        onChange={(e) => setWorth(Number(e.target.value))}
                    />
                    <select
                        value={worthCoin}
                        onChange={(e) =>
                            setWorthCoin(e.target.value as Denomination)
                        }
                    >
                        {getEnumKeys(Denomination).map((key, index) => (
                            <option key={index} value={Denomination[key]}>
                                {key}
                            </option>
                        ))}
                    </select>
                    <select
                        value={worthDeterminer}
                        onChange={(e) =>
                            setWorthDeterminer(e.target.value as Determiner)
                        }
                    >
                        {getEnumKeys(Determiner).map((key, index) => (
                            <option key={index} value={Determiner[key]}>
                                {key}
                            </option>
                        ))}
                    </select>
                </>
            ) : (
                <>
                    <input
                        name="qty"
                        type="number"
                        placeholder="Quantity"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                    />
                    <select
                        value={worthCoin}
                        onChange={(e) =>
                            setWorthCoin(e.target.value as Denomination)
                        }
                    >
                        {getEnumKeys(Denomination).map((key, index) => (
                            <option key={index} value={Denomination[key]}>
                                {key}
                            </option>
                        ))}
                    </select>
                </>
            )}
            <button type="submit">submit</button>
        </form>
    )
}

export default TreasureForm
