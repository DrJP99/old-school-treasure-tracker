import { Party } from '../service/Party'
import { Character } from '../service/Character'
import { Treasure } from '../service/Treasure'
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
import { FeatLevel } from '../service/FeatLevel'
import FeatForm from './FeatForm'

const Home = () => {
    const [party, setParty] = useState<Party>(new Party())

    const [characterFormVisible, setCharacterFormVisible] = useState(false)
    const [treasureFormVisible, setTreasureFormVisible] = useState(false)
    const [monsterFormVisible, setMonsterFormVisible] = useState(false)
    const [featFormVisible, setFeatFormVisible] = useState(false)
    const [buttonsVisible, setButtonsVisible] = useState(true)

    // useEffect(() => {
    //     let temp_party: Party = new Party(
    //         party.get_characters(),
    //         party.get_treasure(),
    //         party.get_monsters(),
    //         party.get_feats(),
    //         party.get_party_txp(),
    //         party.get_pc_share(),
    //         party.get_num_shares(),
    //         party.getXp_pc_share(),
    //         party.getXp_num_shares()
    //     )

    //     temp_party.addFeat(
    //         new Feat('Exploration', FeatLevel.minor, 'Found 5 rooms in dungeon')
    //     )
    //     setParty(temp_party)
    // }, [])

    let addCharacter = (char: Character) => {
        let temp_party: Party = new Party(
            party.get_characters(),
            party.get_treasure(),
            party.get_monsters(),
            party.get_feats(),
            party.get_party_txp(),
            party.get_pc_share(),
            party.get_num_shares(),
            party.getXp_pc_share(),
            party.getXp_num_shares()
        )
        temp_party.add_character(char)
        setParty(temp_party)
        showCharacterForm()
    }

    let addTreasure = (treasure: Treasure) => {
        let temp_party: Party = new Party(
            party.get_characters(),
            party.get_treasure(),
            party.get_monsters(),
            party.get_feats(),
            party.get_party_txp(),
            party.get_pc_share(),
            party.get_num_shares(),
            party.getXp_pc_share(),
            party.getXp_num_shares()
        )
        temp_party.addTreasure(treasure)
        setParty(temp_party)
        showTreasureForm()
    }

    let addMonster = (monster: Monster) => {
        let temp_party: Party = new Party(
            party.get_characters(),
            party.get_treasure(),
            party.get_monsters(),
            party.get_feats(),
            party.get_party_txp(),
            party.get_pc_share(),
            party.get_num_shares(),
            party.getXp_pc_share(),
            party.getXp_num_shares()
        )
        temp_party.addMonster(monster)
        setParty(temp_party)
        showMonsterForm()
    }

    let addFeat = (feat: Feat) => {
        let temp_party: Party = new Party(
            party.get_characters(),
            party.get_treasure(),
            party.get_monsters(),
            party.get_feats(),
            party.get_party_txp(),
            party.get_pc_share(),
            party.get_num_shares(),
            party.getXp_pc_share(),
            party.getXp_num_shares()
        )
        temp_party.addFeat(feat)
        setParty(temp_party)
        showFeatForm()
    }

    let showCharacterForm = () => {
        setButtonsVisible(!buttonsVisible)
        setCharacterFormVisible(!characterFormVisible)
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
                    closeForm={showCharacterForm}
                />
            ) : null}
            {treasureFormVisible ? (
                <TreasureForm
                    returnTreasure={addTreasure}
                    closeForm={showTreasureForm}
                />
            ) : null}
            {monsterFormVisible ? (
                <MonsterForm
                    returnMonster={addMonster}
                    closeForm={showMonsterForm}
                />
            ) : null}

            {featFormVisible ? (
                <FeatForm returnFeat={addFeat} closeForm={showFeatForm} />
            ) : null}

            {party.get_characters().length > 0 ? (
                <>
                    <h2>Total XP: {party.get_total_xp()}</h2>
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
                                XP
                            </p>
                        </>
                    ) : null}
                    {party.getNumNPC() > 0 ? (
                        <p>
                            <b>Each NPC gains:</b>{' '}
                            {Math.round(party.get_xp_per_npc_share()).toFixed(
                                0
                            )}{' '}
                            XP
                        </p>
                    ) : null}
                </>
            ) : null}

            {party.get_characters().length > 0 ? (
                <div>
                    <h2>Characters:</h2>
                    {party.get_characters().map((c) => (
                        <Char character={c} party={party} key={c.get_uuid()} />
                    ))}
                </div>
            ) : null}
            {party.get_treasure().length > 0 ? (
                <div>
                    <h2>Treasure found: ({party.get_treasure_xp()} XP)</h2>
                    {party.get_treasure().map((t) => (
                        <PartyTreasure treasure={t} key={t.getUuid()} />
                    ))}
                </div>
            ) : null}
            {party.get_monsters().length > 0 ? (
                <div>
                    <h2>Monsters defeated: ({party.get_monster_xp()} XP)</h2>
                    {party.get_monsters().map((m) => (
                        <MonsterDefeated monster={m} key={m.getUuid()} />
                    ))}
                </div>
            ) : null}
            {party.get_feats().length > 0 ? (
                <div>
                    <h2>Feats of Exploration ({party.get_feat_xp()} XP)</h2>
                    {party.get_feats().map((f) => (
                        <PartyFeat feat={f} key={f.getUuid()} />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default Home
