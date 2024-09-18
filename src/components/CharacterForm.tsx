import { FormEvent, useEffect, useState } from 'react'
import { Char_Class } from '../service/Char_Class'
import { PC } from '../service/PC'
import { Denomination } from '../service/Denomination'
import { getEnumKeys } from '../service/EnumKeys'
import { capitalize } from '../service/Capitalize'
import { Character, NPC } from '../service/Character'

interface CharacterFormProps {
    returnCharacter: (char: Character) => void
    returnEditCharacter: (char: Character) => void
    closeForm: () => void
    character: Character | NPC | undefined
}

const CharacterForm = ({
    returnCharacter,
    returnEditCharacter,
    closeForm,
    character = undefined,
}: CharacterFormProps) => {
    const [name, setName] = useState<string>('')
    const [level, setLevel] = useState<number>(1)
    const [charClass, setCharClass] = useState<Char_Class>(Char_Class.cleric)
    const [xpMod, setXpMod] = useState<number>(0)
    const [pc, setPc] = useState<PC>(PC.pc)

    const [wage, setWage] = useState<number>(1)
    const [wageCoin, setWageCoin] = useState<Denomination>(Denomination.gp)
    const [share, setShare] = useState<string>('1/2')

    const [isNameError, setIsNameError] = useState<boolean>(false)
    const [isShareError, setIsShareError] = useState<boolean>(false)
    const [isLevelError, setIsLevelError] = useState<boolean>(false)
    const [isXpError, setXpError] = useState<boolean>(false)
    const [isWageError, setIsWageError] = useState<boolean>(false)

    const shareRegex: RegExp = /^[1234]\/[1234]$/

    useEffect(() => {
        if (character) {
            setName(character.get_name())
            setLevel(character.get_level())
            setCharClass(character.get_char_class())
            setXpMod(character.get_xp_mod())
            if (character instanceof NPC) {
                setPc(PC.npc)
                setWage(character.get_wage())
                setWageCoin(character.get_wage_coin())
                setShare(character.get_share())
            } else {
                setPc(PC.pc)
            }
        }
    }, [character])

    let resetFields = () => {
        setName('')
        setLevel(1)
        setCharClass(Char_Class.cleric)
        setXpMod(0)
        // setPc(PC.pc)
        setWage(1)
        setWageCoin(Denomination.gp)
        setShare('1/2')
    }

    let validate = (): boolean => {
        let error: boolean = false

        if (name.length === 0) {
            setIsNameError(true)
            error = true
        } else {
            setIsNameError(false)
        }
        if (!shareRegex.test(share)) {
            error = true
            setIsShareError(true)
        } else {
            setIsShareError(false)
        }
        if (level < 1) {
            setIsLevelError(true)
            error = true
        } else {
            setIsLevelError(false)
        }
        if (![-10, -5, 0, 5, 10].includes(xpMod)) {
            setXpError(true)
            error = true
        } else {
            setXpError(false)
        }
        if (wage < 1) {
            setIsWageError(true)
            error = true
        } else {
            setIsWageError(false)
        }

        return error
    }

    let addCharacter = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        let error: boolean = validate()

        if (!error) {
            var char: Character
            if (pc === PC.pc) {
                char = new Character(name, level, charClass, xpMod)
            } else {
                char = new NPC(
                    name,
                    level,
                    charClass,
                    xpMod,
                    wage,
                    wageCoin,
                    share
                )
            }
            resetFields()
            returnCharacter(char)
        }
    }

    let editCharacter = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        let error: boolean = validate()

        if (!error) {
            var char: Character
            if (pc === PC.pc) {
                char = new Character(
                    name,
                    level,
                    charClass,
                    xpMod,
                    true,
                    character?.get_uuid()
                )
            } else {
                char = new NPC(
                    name,
                    level,
                    charClass,
                    xpMod,
                    wage,
                    wageCoin,
                    share,
                    character?.get_uuid()
                )
            }
            resetFields()
            returnEditCharacter(char)
        }
    }

    let close = () => {
        resetFields()
        closeForm()
    }

    // console.log(character)

    return (
        <div className="form">
            <form
                onSubmit={character ? editCharacter : addCharacter}
                className="form-group"
            >
                <h3>Character</h3>
                <label htmlFor="character-pc"></label>
                <select
                    value={pc}
                    id="character-pc"
                    onChange={(e) => setPc(e.target.value as PC)}
                >
                    {getEnumKeys(PC).map((key, index) => (
                        <option key={index} value={PC[key]}>
                            {capitalize(key)}
                        </option>
                    ))}
                </select>
                <label htmlFor="character-name">
                    Name{' '}
                    {isNameError && (
                        <span className="error-message">
                            invalid name, cannot be empty
                        </span>
                    )}
                </label>
                <input
                    name="name"
                    id="character-name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <label htmlFor="character-level">
                    Level{' '}
                    {isLevelError && (
                        <span className="error-message">
                            invalid level, must be at least 1
                        </span>
                    )}
                </label>
                <input
                    name="level"
                    id="character-level"
                    type="number"
                    placeholder="Level"
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                />
                <label htmlFor="character-class">Class</label>
                <select
                    value={charClass}
                    id="character-class"
                    onChange={(e) => setCharClass(e.target.value as Char_Class)}
                >
                    {getEnumKeys(Char_Class).map((key, index) => (
                        <option key={index} value={Char_Class[key]}>
                            {capitalize(key)}
                        </option>
                    ))}
                </select>
                <label htmlFor="character-xp">
                    XP Bonus{' '}
                    {isXpError && (
                        <span className="error-message">
                            invalid xp bonus, must be -10, -5, 0, 5 or 10
                        </span>
                    )}
                </label>
                <input
                    name="xp"
                    id="character-xp"
                    type="number"
                    placeholder="XP bonus"
                    value={xpMod}
                    onChange={(e) => setXpMod(Number(e.target.value))}
                />
                {pc === PC.npc ? (
                    <>
                        <label htmlFor="character-wage">
                            Daily Wage{' '}
                            {isWageError && (
                                <span className="error-message">
                                    invalid daily wage, must be at least 1
                                </span>
                            )}
                        </label>
                        <input
                            name="wage"
                            id="character-wage"
                            type="number"
                            placeholder="Wage"
                            value={wage}
                            onChange={(e) => setWage(Number(e.target.value))}
                        />
                        <label htmlFor="character-coin">
                            Wage Denomination
                        </label>
                        <select
                            value={wageCoin}
                            id="character-coin"
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
                        <label htmlFor="character-share">
                            Treasure Share{' '}
                            {isShareError && (
                                <span className="error-message">
                                    invalid share, must match [1234]/[1234]
                                </span>
                            )}
                        </label>
                        <input
                            name="share"
                            id="character-share"
                            type="text"
                            placeholder="Share"
                            value={share}
                            onChange={(e) => setShare(e.target.value)}
                        />
                    </>
                ) : (
                    <></>
                )}
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

export default CharacterForm
