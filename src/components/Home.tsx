import { Party } from '../service/Party'
import { Character, NPC } from '../service/Character'
import { Coin_Treasure, Treasure } from '../service/Treasure'
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

const Home = () => {
    const [party, setParty] = useState<Party>(new Party())

    const [characterFormVisible, setCharacterFormVisible] = useState(false)
    const [treasureFormVisible, setTreasureFormVisible] = useState(false)
    const [monsterFormVisible, setMonsterFormVisible] = useState(false)
    const [featFormVisible, setFeatFormVisible] = useState(false)
    const [buttonsVisible, setButtonsVisible] = useState(true)

    const [formCharacter, setFormCharacter] = useState<
        Character | NPC | undefined
    >(undefined)
    const [formTreasure, setFormTreasure] = useState<
        Treasure | Coin_Treasure | undefined
    >(undefined)
    const [formMonster, setFormMonster] = useState<Monster | undefined>(
        undefined
    )
    const [formFeat, setFormFeat] = useState<Feat | undefined>(undefined)

    const [copied, setCopied] = useState<boolean>(false)

    useEffect(() => {
        populate()
    }, [])

    let cloneParty = (): Party => {
        return new Party(
            party.get_characters(),
            party.get_treasure(),
            party.get_monsters(),
            party.get_feats(),
            party.get_pc_share(),
            party.get_num_shares(),
            party.getXp_pc_share(),
            party.getXp_num_shares()
        )
    }

    let addCharacter = (char: Character) => {
        let temp_party = cloneParty()
        temp_party.add_character(char)
        setParty(temp_party)
        setFormCharacter(undefined)
        showCharacterForm()
    }

    let editCharacter = (character: Character) => {
        let temp_party = cloneParty()
        temp_party.editCharacter(character)
        setParty(temp_party)
        showCharacterForm()
    }

    let addTreasure = (treasure: Treasure) => {
        let temp_party = cloneParty()
        temp_party.addTreasure(treasure)
        setParty(temp_party)
        showTreasureForm()
    }

    let editTreasure = (treasure: Treasure) => {
        let temp_party = cloneParty()
        temp_party.editTreasure(treasure)
        setParty(temp_party)
        showTreasureForm()
    }

    let addMonster = (monster: Monster) => {
        let temp_party = cloneParty()
        temp_party.addMonster(monster)
        setParty(temp_party)
        showMonsterForm()
    }

    let editMonster = (monster: Monster) => {
        let temp_party = cloneParty()
        temp_party.editMonster(monster)
        setParty(temp_party)
        showMonsterForm()
    }

    let addFeat = (feat: Feat) => {
        let temp_party = cloneParty()
        temp_party.addFeat(feat)
        setParty(temp_party)
        showFeatForm()
    }

    let editFeat = (feat: Feat) => {
        let temp_party = cloneParty()
        temp_party.editFeat(feat)
        setParty(temp_party)
        showFeatForm()
    }

    let showCharacterForm = () => {
        setButtonsVisible(!buttonsVisible)
        setCharacterFormVisible(!characterFormVisible)
        if (characterFormVisible) {
            setFormCharacter(undefined)
        }
    }

    let showTreasureForm = () => {
        setButtonsVisible(!buttonsVisible)
        setTreasureFormVisible(!treasureFormVisible)
    }

    let showMonsterForm = () => {
        setButtonsVisible(!buttonsVisible)
        setMonsterFormVisible(!monsterFormVisible)
    }

    let showFeatForm = () => {
        setButtonsVisible(!buttonsVisible)
        setFeatFormVisible(!featFormVisible)
    }

    let removeMonster = (uuid: string) => {
        let temp_party = cloneParty()
        temp_party.removeMonster(uuid)
        setParty(temp_party)
    }

    let removeTreasure = (uuid: string) => {
        let temp_party = cloneParty()
        temp_party.removeTreasure(uuid)
        setParty(temp_party)
    }

    let removeCharacter = (uuid: string) => {
        let temp_party = cloneParty()
        temp_party.remove_character_by_uuid(uuid)
        setParty(temp_party)
    }

    let removeFeat = (uuid: string) => {
        let temp_party = cloneParty()
        temp_party.removeFeat(uuid)
        setParty(temp_party)
    }

    let populate = () => {
        let temp_party = new Party(
            [
                new Character('Vin', 5, 'thief', 5),
                new Character('Bombur', 1, 'dwarf', 0),
                new Character('Quackdalf', 3, 'Magic-User', -10),
                new Character('Adolin', 6, 'fighter', 0),
                new NPC('Jon Snow', 2, 'fighter', 0, 5, 'sp', '3/4'),
            ],
            [
                new Coin_Treasure(6000, 'sp'),
                new Coin_Treasure(300, 'gp'),
                new Treasure('Emerald Necklace', '', 1, 1500, 'gp', 'each'),
                new Treasure('Silver Brooch', '', 1, 750, 'gp', 'each'),
            ],
            [
                new Monster('Carcass Crawlers', '', 75, 3),
                new Monster('Giant Centipedes', '', 6, 5),
                new Monster('Minotaurs', '', 275, 2),
                new Monster('Hydra', '5HD', 175, 1),
            ],
            [
                new Feat(
                    'Trap',
                    'minor',
                    'Dwarf detects a boulder trap and gets everyone out just in time'
                ),
                new Feat(
                    'Lore',
                    'minor',
                    "Magic-User recalls conversation with a sage about minotaur's ability to smell their prey. Party deliberately stays upwind of the minotaur, allowing for a surprise ambush"
                ),
                new Feat(
                    'Skills',
                    'minor',
                    'Thief twirls his lockpicks in a dextrous manner across and between his knuckles on order to delight a small child kept prisoner in the dungeon'
                ),
                new Feat(
                    'Quest',
                    'major',
                    'The party returns the small child to their parents back in town.'
                ),
            ]
        )

        setParty(temp_party)
    }

    let copyToClipboard = () => {
        console.log('Copied!')
        navigator.clipboard.writeText(ToClipboard(party))
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    return (
        <div className="home">
            <h1>OLD-SCHOOL TREASURE TRACKER</h1>

            <h2>Add Characters, Treasure or Monsters</h2>
            {buttonsVisible ? (
                <div id="create-buttons">
                    <button
                        className="btn btn-accept"
                        onClick={showCharacterForm}
                    >
                        Add Character
                    </button>
                    <button
                        className="btn btn-accept"
                        onClick={showTreasureForm}
                    >
                        Add Treasure
                    </button>
                    <button
                        className="btn btn-accept"
                        onClick={showMonsterForm}
                    >
                        Add Monster
                    </button>
                    <button className="btn  btn-accept" onClick={showFeatForm}>
                        Add Feat of Exploration
                    </button>
                </div>
            ) : null}

            {characterFormVisible ? (
                <CharacterForm
                    returnCharacter={addCharacter}
                    returnEditCharacter={editCharacter}
                    closeForm={showCharacterForm}
                    character={formCharacter}
                />
            ) : null}
            {treasureFormVisible ? (
                <TreasureForm
                    returnTreasure={addTreasure}
                    returnEditTreasure={editTreasure}
                    closeForm={showTreasureForm}
                    treasure={formTreasure}
                />
            ) : null}
            {monsterFormVisible ? (
                <MonsterForm
                    returnMonster={addMonster}
                    returnEditMonster={editMonster}
                    closeForm={showMonsterForm}
                    monster={formMonster}
                />
            ) : null}

            {featFormVisible ? (
                <FeatForm
                    returnFeat={addFeat}
                    returnEditFeat={editFeat}
                    closeForm={showFeatForm}
                    feat={formFeat}
                />
            ) : null}

            {party.get_characters().length > 0 ? (
                <>
                    <h2>
                        Total XP: {party.get_total_xp() + party.get_feat_xp()}
                    </h2>
                    {party.getNumPC() > 0 ? (
                        <>
                            <p>
                                <b>Party TXP:</b> {party.get_party_txp()}
                            </p>
                            <p>
                                <b>Each PC gains:</b>{' '}
                                {Math.round(
                                    party.get_xp_per_pc_share()
                                ).toFixed(0)}{' '}
                                XP, {party.getGpPerPCShare()}gp
                            </p>
                        </>
                    ) : null}
                    {party.getNumNPC() > 0 ? (
                        <>
                            <p>
                                <b>Each NPC gains:</b>{' '}
                                {Math.round(
                                    party.get_xp_per_npc_share()
                                ).toFixed(0)}{' '}
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
                                        (<b>{k}</b>) {v}gp
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

            {party.get_characters().length > 0 ? (
                <div>
                    <h2>Characters:</h2>
                    {party.get_characters().map((c) => (
                        <Char
                            character={c}
                            party={party}
                            removeCharacter={removeCharacter}
                            editCharacter={(e) => {
                                setFormCharacter(c)
                                showCharacterForm()
                            }}
                            key={c.get_uuid()}
                        />
                    ))}
                </div>
            ) : null}
            {party.get_treasure().length > 0 ? (
                <div>
                    <h2>Treasure found: ({party.get_treasure_xp()} XP)</h2>
                    {party.get_treasure().map((t) => (
                        <PartyTreasure
                            treasure={t}
                            removeTreasure={removeTreasure}
                            editTreasure={(e) => {
                                setFormTreasure(t)
                                showTreasureForm()
                            }}
                            key={t.getUuid()}
                        />
                    ))}
                </div>
            ) : null}
            {party.get_monsters().length > 0 ? (
                <div>
                    <h2>Monsters defeated: ({party.get_monster_xp()} XP)</h2>
                    {party.get_monsters().map((m) => (
                        <MonsterDefeated
                            monster={m}
                            removeMonster={removeMonster}
                            editMonster={(e) => {
                                setFormMonster(m)
                                showMonsterForm()
                            }}
                            key={m.getUuid()}
                        />
                    ))}
                </div>
            ) : null}
            {party.get_feats().length > 0 ? (
                <div>
                    <h2>Feats of Exploration ({party.get_feat_xp()} XP)</h2>
                    {party.get_feats().map((f) => (
                        <PartyFeat
                            feat={f}
                            txp={party.get_party_txp()}
                            removeFeat={removeFeat}
                            editFeat={(e) => {
                                setFormFeat(f)
                                showFeatForm()
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
