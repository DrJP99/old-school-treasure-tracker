import { FormEvent, useState } from 'react'
import { Party } from '../service/Party'
import { Char_Class } from '../service/Char_Class'
import { Denomination } from '../service/Denomination'
import { Character, NPC } from '../service/Character'
import { getEnumKeys } from '../service/EnumKeys'

let capitalize = (s: string): string => {
    let res = s
    let divider = res.includes('-') ? '-' : ' '
    let resArray: string[] = res.split(/[-\s]/)

    resArray = resArray.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    res = resArray.join(divider)
    return res
}

enum PC {
    pc = 'PC',
    npc = 'NPC',
}

const Home = () => {
    const [party, setParty] = useState<Party>(new Party())

    const [name, setName] = useState<string>('')
    const [level, setLevel] = useState<number>(1)
    const [charClass, setCharClass] = useState<Char_Class>(Char_Class.cleric)
    const [xpMod, setXpMod] = useState<number>(0)
    const [pc, setPc] = useState<PC>(PC.pc)

    const [wage, setWage] = useState<number>(1)
    const [wageCoin, setWageCoin] = useState<Denomination>(Denomination.gp)
    const [share, setShare] = useState<string>('1/2')

    let addCharacter = (e: FormEvent) => {
        e.preventDefault()

        var char: Character
        if (pc === PC.pc) {
            char = new Character(name, level, charClass, xpMod)
        } else {
            char = new NPC(name, level, charClass, xpMod, wage, wageCoin, share)
        }
        let temp_party: Party = new Party(
            party.get_characters(),
            party.get_treasure(),
            party.get_party_txp(),
            party.get_pc_share(),
            party.get_num_shares()
        )
        console.log(char.to_string())
        temp_party.add_character(char)
        console.log(temp_party)
        setParty(temp_party)
    }

    return (
        <div>
            <h1>Home</h1>

            <p>
                Party TXP: {party.get_party_txp()}; Shares per PC:{' '}
                {party.get_pc_share()}; Total number of shares:{' '}
                {party.get_num_shares()};{' '}
            </p>

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
                <select
                    value={pc}
                    onChange={(e) => setPc(e.target.value as PC)}
                >
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

            <div>
                {party.get_characters().map((c) => (
                    <div key={c.get_name()}>
                        <h3>
                            {c.get_name()} ({c.get_char_class()} {c.get_level()}
                            )
                        </h3>
                        <p>
                            {!c.get_pc() && c instanceof NPC ? (
                                <>
                                    <b>NPC</b> - Wage: {c.get_wage()}
                                    {c.get_wage_coin()} per day. Treasure share:{' '}
                                    {c.get_share()}.
                                </>
                            ) : (
                                <></>
                            )}{' '}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
