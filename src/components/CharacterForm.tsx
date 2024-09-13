import { FormEvent, useState } from 'react'
import { Char_Class } from '../service/Char_Class'
import { PC } from '../service/PC'
import { Denomination } from '../service/Denomination'
import { getEnumKeys } from '../service/EnumKeys'
import { capitalize } from '../service/Capitalize'
import { Character, NPC } from '../service/Character'

interface CharacterFormProps {
    returnCharacter: (char: Character) => void
}

const CharacterForm = ({ returnCharacter }: CharacterFormProps) => {
    const [name, setName] = useState<string>('')
    const [level, setLevel] = useState<number>(1)
    const [charClass, setCharClass] = useState<Char_Class>(Char_Class.cleric)
    const [xpMod, setXpMod] = useState<number>(0)
    const [pc, setPc] = useState<PC>(PC.pc)

    const [wage, setWage] = useState<number>(1)
    const [wageCoin, setWageCoin] = useState<Denomination>(Denomination.gp)
    const [share, setShare] = useState<string>('1/2')

    let addCharacter = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        var char: Character
        if (pc === PC.pc) {
            char = new Character(name, level, charClass, xpMod)
        } else {
            char = new NPC(name, level, charClass, xpMod, wage, wageCoin, share)
        }

        returnCharacter(char)
    }

    return (
        <form onSubmit={(e) => addCharacter(e)}>
            <input
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />
            <input
                name="level"
                type="number"
                placeholder="Level"
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
            />
            <select
                value={charClass}
                onChange={(e) => setCharClass(e.target.value as Char_Class)}
            >
                {getEnumKeys(Char_Class).map((key, index) => (
                    <option key={index} value={Char_Class[key]}>
                        {capitalize(key)}
                    </option>
                ))}
            </select>
            <input
                name="xp"
                type="number"
                placeholder="XP bonus"
                value={xpMod}
                onChange={(e) => setXpMod(Number(e.target.value))}
            />
            <select value={pc} onChange={(e) => setPc(e.target.value as PC)}>
                {getEnumKeys(PC).map((key, index) => (
                    <option key={index} value={PC[key]}>
                        {capitalize(key)}
                    </option>
                ))}
            </select>
            {pc === PC.npc ? (
                <>
                    <input
                        name="wage"
                        type="number"
                        placeholder="Wage"
                        value={wage}
                        onChange={(e) => setWage(Number(e.target.value))}
                    />
                    <select
                        value={wageCoin}
                        onChange={(e) =>
                            setWageCoin(e.target.value as Denomination)
                        }
                    >
                        {getEnumKeys(Denomination).map((key, index) => (
                            <option key={index} value={Denomination[key]}>
                                {key}
                            </option>
                        ))}
                    </select>
                    <input
                        name="share"
                        type="text"
                        placeholder="Share"
                        value={share}
                        onChange={(e) => setShare(e.target.value)}
                    />
                </>
            ) : (
                <></>
            )}
            <button type="submit">Submit</button>
        </form>
    )
}

export default CharacterForm
