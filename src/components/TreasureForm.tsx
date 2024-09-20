import { FormEvent, useEffect, useState } from 'react'
import { CoinTreasure, Treasure } from '../service/Treasure'
import { Determiner } from '../service/Determiner'
import { Denomination } from '../service/Denomination'
import { getEnumKeys } from '../service/EnumKeys'
import { capitalize } from '../service/Capitalize'

interface TreasureFormProps {
    returnTreasure: (treasure: Treasure) => void
    returnEditTreasure: (treasure: Treasure) => void
    closeForm: () => void
    treasure: Treasure | CoinTreasure | undefined
}

enum CoinOrTreasure {
    treasure = 'treasure',
    coins = 'coins',
}

const TreasureForm = ({
    returnTreasure,
    returnEditTreasure,
    closeForm,
    treasure = undefined,
}: TreasureFormProps) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [qty, setQty] = useState(1)
    const [coinTreasure, setCoinTreasure] = useState<CoinOrTreasure>(
        CoinOrTreasure.treasure
    )
    const [worth, setWorth] = useState(0)
    const [worthCoin, setWorthCoin] = useState<Denomination>(Denomination.gp)
    const [worthDeterminer, setWorthDeterminer] = useState<Determiner>(
        Determiner.each
    )

    const [isNameError, setIsNameError] = useState<boolean>(false)
    const [isQtyError, setIsQtyError] = useState<boolean>(false)
    const [isWorthError, setIsWorthError] = useState<boolean>(false)

    useEffect(() => {
        if (treasure) {
            setQty(treasure.getQty())
            setWorthCoin(treasure.getWorthCoin())
            if (!(treasure instanceof CoinTreasure)) {
                setCoinTreasure(CoinOrTreasure.treasure)
                setName(treasure.getName())
                setDescription(treasure.getDescription())
                setWorth(treasure.getWorth())
                setWorthDeterminer(treasure.getWorthDeterminer())
            } else {
                setCoinTreasure(CoinOrTreasure.coins)
            }
        }
    }, [treasure])

    let resetFields = () => {
        setName('')
        setDescription('')
        setQty(1)
        setWorth(0)
        setWorthCoin(Denomination.gp)
        setWorthDeterminer(Determiner.each)
    }

    let validate = (): boolean => {
        let error = false

        if (coinTreasure === CoinOrTreasure.treasure) {
            if (name.length === 0) {
                setIsNameError(true)
                error = true
            } else {
                setIsNameError(false)
            }
            if (worth < 0) {
                setIsWorthError(true)
                error = true
            } else {
                setIsWorthError(false)
            }
        }
        if (qty < 1) {
            setIsQtyError(true)
            error = true
        } else {
            setIsQtyError(false)
        }

        return error
    }

    let addTreasure = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        let error: boolean = validate()
        if (!error) {
            var treasure: Treasure
            if (coinTreasure === CoinOrTreasure.treasure) {
                treasure = new Treasure(
                    name,
                    description,
                    qty,
                    worth,
                    worthCoin,
                    worthDeterminer
                )
            } else {
                treasure = new CoinTreasure(qty, worthCoin)
            }

            resetFields()
            returnTreasure(treasure)
        }
    }

    let editTreasure = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        let error: boolean = validate()

        if (!error) {
            var newTreasure: Treasure
            if (coinTreasure === CoinOrTreasure.treasure) {
                newTreasure = new Treasure(
                    name,
                    description,
                    qty,
                    worth,
                    worthCoin,
                    worthDeterminer,
                    treasure?.getUuid()
                )
            } else {
                newTreasure = new CoinTreasure(
                    qty,
                    worthCoin,
                    treasure?.getUuid()
                )
            }

            resetFields()
            returnEditTreasure(newTreasure)
        }
    }

    let close = () => {
        resetFields()
        closeForm()
    }

    return (
        <div className="form">
            <form
                onSubmit={treasure ? editTreasure : addTreasure}
                className="form-group"
            >
                <h3>Treasure</h3>
                <select
                    value={coinTreasure}
                    onChange={(e) => {
                        resetFields()
                        setCoinTreasure(e.target.value as CoinOrTreasure)
                    }}
                >
                    {getEnumKeys(CoinOrTreasure).map((key, index) => (
                        <option key={index} value={CoinOrTreasure[key]}>
                            {capitalize(key)}
                        </option>
                    ))}
                </select>
                {coinTreasure === CoinOrTreasure.treasure ? (
                    <>
                        <label htmlFor="treasure-name">
                            Name{' '}
                            {isNameError && (
                                <span className="error-message">
                                    invalid name, cannot be empty
                                </span>
                            )}
                        </label>
                        <input
                            name="name"
                            id="treasure-name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="treasure-description">
                            Description
                        </label>
                        <input
                            name="description"
                            id="treasure-description"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label htmlFor="treasure-qty">
                            Quantity{' '}
                            {isQtyError && (
                                <span className="error-message">
                                    invalid quantity, must be at least 1
                                </span>
                            )}
                        </label>
                        <input
                            name="qty"
                            id="treasure-qty"
                            type="number"
                            placeholder="Quantity"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                        />
                        <label htmlFor="treasure-worth">
                            Worth{' '}
                            {isWorthError && (
                                <span className="error-message">
                                    invalid worth, must be 0 or greater
                                </span>
                            )}
                        </label>
                        <input
                            name="worth"
                            id="treasure-worth"
                            type="number"
                            placeholder="Worth"
                            value={worth}
                            onChange={(e) => setWorth(Number(e.target.value))}
                        />
                        <label htmlFor="treasure-coin">Coin</label>
                        <select
                            value={worthCoin}
                            id="treasure-coin"
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
                        <label htmlFor="treasure-determiner">Determiner</label>
                        <select
                            value={worthDeterminer}
                            id="treasure-determiner"
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
                        <label htmlFor="treasure-qty"></label>
                        <input
                            name="qty"
                            id="treasure-qty"
                            type="number"
                            placeholder="Quantity"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                        />
                        <label htmlFor="treasure-coin">Coin</label>
                        <select
                            value={worthCoin}
                            id="treasure-coin"
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
                <div className="form-footer">
                    <button className="btn btn-danger" onClick={close}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-accept float-right"
                    >
                        submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TreasureForm
