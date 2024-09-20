import { Party } from '../service/Party'
import { Character, NPC } from '../service/Character'
import { CoinTreasure, Treasure } from '../service/Treasure'
import { Monster } from '../service/Monster'
import Char from './Char'
import PartyTreasure from './PartyTreasure'
import MonsterDefeated from './MonsterDefeated'
import CharacterForm from './CharacterForm'
import TreasureForm from './TreasureForm'
import MonsterForm from './MonsterForm'
import { useEffect, useState } from 'react'
import PartyFeat from './PartyFeat'
import { Feat } from '../service/Feat'
import FeatForm from './FeatForm'
import { ToClipboard } from '../service/ToClipboard'
import Modal from './Modal'

const Home = () => {
    const [party, setParty] = useState<Party>(new Party())
    const [formCharacter, setFormCharacter] = useState<
        Character | NPC | undefined
    >(undefined)
    const [formTreasure, setFormTreasure] = useState<
        Treasure | CoinTreasure | undefined
    >(undefined)
    const [formMonster, setFormMonster] = useState<Monster | undefined>(
        undefined
    )
    const [formFeat, setFormFeat] = useState<Feat | undefined>(undefined)

    const [copied, setCopied] = useState<boolean>(false)

    const [loaded, setLoaded] = useState<boolean>(false)

    enum Element {
        character = 'character',
        treasure = 'treasure',
        monster = 'monster',
        feat = 'feat',
    }

    const [showModal, setShowModal] = useState<Element | undefined>(undefined)

    useEffect(() => {
        loadParty()
    }, [])

    useEffect(() => {
        if (loaded) {
            saveParty()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [party])

    useEffect(() => {
        // prevent scrolling when modal is open
        if (showModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'scroll'
        }
    }, [showModal])

    let cloneParty = (): Party => {
        return new Party(
            party.getCharacters(),
            party.getTreasure(),
            party.getMonsters(),
            party.getFeats(),
            party.getPcShare(),
            party.getNumShares(),
            party.getXpPcShare(),
            party.getXpNumShares()
        )
    }

    let add = (element: Character | Treasure | Monster | Feat) => {
        let tempParty = cloneParty()
        if (element instanceof Character) {
            tempParty.addCharacter(element)
            setFormCharacter(undefined)
        } else if (element instanceof Treasure) {
            tempParty.addTreasure(element)
            setFormTreasure(undefined)
        } else if (element instanceof Monster) {
            tempParty.addMonster(element)
            setFormMonster(undefined)
        } else if (element instanceof Feat) {
            tempParty.addFeat(element)
            setFormFeat(undefined)
        } else {
            console.error(`${element} is not permitted!`)
        }
        setParty(tempParty)
        closeModal()
    }

    let edit = (element: Character | Treasure | Monster | Feat) => {
        let tempParty = cloneParty()
        if (element instanceof Character) {
            tempParty.editCharacter(element)
            setFormCharacter(undefined)
        } else if (element instanceof Treasure) {
            tempParty.editTreasure(element)
            setFormTreasure(undefined)
        } else if (element instanceof Monster) {
            tempParty.editMonster(element)
            setFormMonster(undefined)
        } else if (element instanceof Feat) {
            tempParty.editFeat(element)
            setFormFeat(undefined)
        } else {
            console.error(`${element} is not permitted!`)
        }
        setParty(tempParty)
        closeModal()
    }

    let remove = (element: Character | Treasure | Monster | Feat) => {
        let tempParty = cloneParty()
        if (element instanceof Character) {
            tempParty.removeCharacterByUuid(element.getUuid())
            setFormCharacter(undefined)
        } else if (element instanceof Treasure) {
            tempParty.removeTreasure(element.getUuid())
            setFormTreasure(undefined)
        } else if (element instanceof Monster) {
            tempParty.removeMonster(element.getUuid())
            setFormMonster(undefined)
        } else if (element instanceof Feat) {
            tempParty.removeFeat(element.getUuid())
            setFormFeat(undefined)
        } else {
            console.error(`${element} is not permitted!`)
        }
        setParty(tempParty)
        closeModal()
    }

    let saveParty = (): void => {
        localStorage.setItem('party', JSON.stringify(party))
    }

    let loadParty = (): void => {
        let myParty = JSON.parse(window.localStorage.getItem('party') || '""')

        let tempParty = new Party()
        tempParty.JSONparse(myParty)
        setParty(tempParty)
        setLoaded(true)
    }

    let copyToClipboard = () => {
        console.log('Copied!')
        navigator.clipboard.writeText(ToClipboard(party))
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    let closeModal = () => {
        setFormCharacter(undefined)
        setFormTreasure(undefined)
        setFormMonster(undefined)
        setFormFeat(undefined)
        setShowModal(undefined)
    }

    return (
        <div className="home">
            <h1>OLD-SCHOOL TREASURE TRACKER</h1>

            <h2>Add Characters, Treasure or Monsters</h2>

            <div id="create-buttons">
                <button
                    className="btn btn-inline"
                    onClick={() => {
                        setShowModal(Element.character)
                    }}
                >
                    Add Character
                </button>
                {' | '}
                <button
                    className="btn btn-inline"
                    onClick={() => {
                        setShowModal(Element.treasure)
                    }}
                >
                    Add Treasure
                </button>
                {' | '}
                <button
                    className="btn btn-inline"
                    onClick={() => {
                        setShowModal(Element.monster)
                    }}
                >
                    Add Monster
                </button>
                {' | '}
                <button
                    className="btn  btn-inline"
                    onClick={() => {
                        setShowModal(Element.feat)
                    }}
                >
                    Add Feat of Exploration
                </button>
            </div>

            {showModal && (
                <Modal closeModal={closeModal}>
                    {showModal === Element.character && (
                        <CharacterForm
                            returnCharacter={add}
                            returnEditCharacter={edit}
                            closeForm={closeModal}
                            character={formCharacter}
                        />
                    )}
                    {showModal === Element.treasure && (
                        <TreasureForm
                            returnTreasure={add}
                            returnEditTreasure={edit}
                            closeForm={closeModal}
                            treasure={formTreasure}
                        />
                    )}
                    {showModal === Element.monster && (
                        <MonsterForm
                            returnMonster={add}
                            returnEditMonster={edit}
                            closeForm={closeModal}
                            monster={formMonster}
                        />
                    )}
                    {showModal === Element.feat && (
                        <FeatForm
                            returnFeat={add}
                            returnEditFeat={edit}
                            closeForm={closeModal}
                            feat={formFeat}
                        />
                    )}
                </Modal>
            )}

            {party.getCharacters().length > 0 ? (
                <>
                    <h2>
                        Total XP:{' '}
                        {(
                            party.getTotalXp() + party.getFeatXp()
                        ).toLocaleString()}
                    </h2>
                    {party.getNumPC() > 0 ? (
                        <>
                            <p>
                                <b>Party TXP:</b>{' '}
                                {party.getPartyTxp().toLocaleString()}
                            </p>
                            <p>
                                <b>Each PC gains:</b>{' '}
                                {Math.round(
                                    party.getXpPerPcShare()
                                ).toLocaleString()}{' '}
                                XP, {party.getGpPerPCShare().toLocaleString()}gp
                            </p>
                        </>
                    ) : null}
                    {party.getNumNPC() > 0 ? (
                        <>
                            <p>
                                <b>Each NPC gains:</b>{' '}
                                {Math.round(
                                    party.getXpPerNpcShare()
                                ).toLocaleString()}{' '}
                                XP
                            </p>
                            <p>
                                <b>Treasure per fractional share:</b>{' '}
                            </p>
                            <ul>
                                {Object.entries(
                                    party.getGpPerFractionalShare()
                                ).map(([k, v]) => (
                                    <li key={k}>
                                        (<b>{k}</b>) {v.toLocaleString()}gp
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : null}
                    <p>
                        <button
                            className="btn btn-inline"
                            onClick={() => copyToClipboard()}
                        >
                            Copy to Clipboard
                        </button>
                        {copied ? <span>{'  '}Copied!</span> : null}
                    </p>
                </>
            ) : null}

            {party.getCharacters().length > 0 ? (
                <div>
                    <h2>Characters:</h2>
                    {party.getCharacters().map((c) => (
                        <Char
                            character={c}
                            party={party}
                            removeCharacter={() => remove(c)}
                            editCharacter={() => {
                                setFormCharacter(c)
                                setShowModal(Element.character)
                            }}
                            key={c.getUuid()}
                        />
                    ))}
                </div>
            ) : null}
            {party.getTreasure().length > 0 ? (
                <div>
                    <h2>
                        Treasure found: (
                        {party.getTreasureXp().toLocaleString()} XP)
                    </h2>
                    {party.getTreasure().map((t) => (
                        <PartyTreasure
                            treasure={t}
                            removeTreasure={() => remove(t)}
                            editTreasure={() => {
                                setFormTreasure(t)
                                setShowModal(Element.treasure)
                            }}
                            key={t.getUuid()}
                        />
                    ))}
                </div>
            ) : null}
            {party.getMonsters().length > 0 ? (
                <div>
                    <h2>
                        Monsters defeated: (
                        {party.getMonsterXp().toLocaleString()} XP)
                    </h2>
                    {party.getMonsters().map((m) => (
                        <MonsterDefeated
                            monster={m}
                            removeMonster={() => remove(m)}
                            editMonster={() => {
                                setFormMonster(m)
                                setShowModal(Element.monster)
                            }}
                            key={m.getUuid()}
                        />
                    ))}
                </div>
            ) : null}
            {party.getFeats().length > 0 ? (
                <div>
                    <h2>
                        Feats of Exploration (
                        {party.getFeatXp().toLocaleString()} XP)
                    </h2>
                    {party.getFeats().map((f) => (
                        <PartyFeat
                            feat={f}
                            txp={party.getPartyTxp()}
                            removeFeat={() => remove(f)}
                            editFeat={() => {
                                setFormFeat(f)
                                setShowModal(Element.feat)
                            }}
                            key={f.getUuid()}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default Home
