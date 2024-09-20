import { FormEvent, useEffect, useState } from 'react'
import { Monster } from '../service/Monster'

interface MonsterFormProps {
    returnMonster: (monster: Monster) => void
    returnEditMonster: (monster: Monster) => void
    closeForm: () => void
    monster: Monster | undefined
}

const MonsterForm = ({
    returnMonster,
    returnEditMonster,
    closeForm,
    monster = undefined,
}: MonsterFormProps) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [xp, setXp] = useState(0)
    const [qty, setQty] = useState(1)

    const [isNameError, setIsNameError] = useState<boolean>(false)
    const [isQtyError, setIsQtyError] = useState<boolean>(false)
    const [isXpError, setXpError] = useState<boolean>(false)

    useEffect(() => {
        if (monster) {
            setName(monster.getName())
            setDescription(monster.getDescription())
            setXp(monster.getXp())
            setQty(monster.getQty())
        }
    }, [monster])

    let resetFields = () => {
        setName('')
        setDescription('')
        setXp(0)
        setQty(1)
    }

    let validate = (): boolean => {
        let error = false

        if (name.length < 1) {
            setIsNameError(true)
            error = true
        } else {
            setIsNameError(false)
        }
        if (qty < 1) {
            setIsQtyError(true)
            error = true
        } else {
            setIsQtyError(false)
        }
        if (xp < 1) {
            setXpError(true)
            error = true
        } else {
            setXpError(false)
        }

        return error
    }

    let addMonster = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        let error = validate()

        if (!error) {
            const monster = new Monster(name, description, xp, qty)
            resetFields()
            returnMonster(monster)
        }
    }

    let editMonster = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        let error = validate()

        if (!error) {
            const newMonster = new Monster(
                name,
                description,
                xp,
                qty,
                monster?.getUuid()
            )

            resetFields()
            returnEditMonster(newMonster)
        }
    }

    let close = () => {
        resetFields()
        closeForm()
    }

    return (
        <div className="form">
            <form
                onSubmit={monster ? editMonster : addMonster}
                className="form-group"
            >
                <h3>Monster</h3>
                <label htmlFor="monster-name">
                    Name{' '}
                    {isNameError && (
                        <span className="error-message">
                            invalid name, cannot be empty
                        </span>
                    )}
                </label>
                <input
                    name="name"
                    id="monster-name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="monster-description">Description</label>
                <input
                    name="description"
                    id="monster-description"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="monster-qty">
                    Quantity{' '}
                    {isQtyError && (
                        <span className="error-message">
                            invalid quantity, must be at least 1
                        </span>
                    )}
                </label>
                <input
                    name="qty"
                    id="monster-qty"
                    type="number"
                    placeholder="Quantity"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                />
                <label htmlFor="monster-xp">
                    XP for Each Monster{' '}
                    {isXpError && (
                        <span className="error-message">
                            invalid xp, must be at least 1
                        </span>
                    )}
                </label>
                <input
                    name="xp"
                    type="number"
                    placeholder="XP"
                    value={xp}
                    onChange={(e) => setXp(Number(e.target.value))}
                />
                <div className="form-footer">
                    <button className="btn btn-danger" onClick={close}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-accept float-right"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MonsterForm
