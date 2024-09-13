import { FormEvent, useState } from 'react'
import { Monster } from '../service/Monster'

interface MonsterFormProps {
    returnMonster: (monster: Monster) => void
}

const MonsterForm = ({ returnMonster }: MonsterFormProps) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [xp, setXp] = useState(0)
    const [qty, setQty] = useState(1)

    let addMonster = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const monster = new Monster(name, description, xp, qty)

        returnMonster(monster)
    }

    return (
        <form onSubmit={addMonster}>
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
                name="xp"
                type="number"
                placeholder="XP"
                value={xp}
                onChange={(e) => setXp(Number(e.target.value))}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default MonsterForm
