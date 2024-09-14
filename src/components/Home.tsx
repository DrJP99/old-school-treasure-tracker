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
import { useState } from 'react'

const Home = () => {
    const [party, setParty] = useState<Party>(new Party())

    const [characterFormVisible, setCharacterFormVisible] = useState(false)
    const [treasureFormVisible, setTreasureFormVisible] = useState(false)
    const [monsterFormVisible, setMonsterFormVisible] = useState(false)
    const [buttonsVisible, setButtonsVisible] = useState(true)

    let addCharacter = (char: Character) => {
        let temp_party: Party = new Party(
            party.get_characters(),
            party.get_treasure(),
            party.get_monsters(),
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

    return (
        <div className="home">
            <h1>OLD-SCHOOL TREASURE TRACKER</h1>

            <h2>Total XP: {party.get_total_xp()}</h2>
            <p>
                Total XP: {party.get_total_xp()}; Each PC gains:{' '}
                {party.get_xp_per_pc_share()} XP; Each NPC gains:{' '}
                {party.get_xp_per_npc_share()} XP
            </p>

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

            <div>
                <h2>Characters:</h2>
                <p>
                    <b>PCs:</b> 12 <b>NPCs:</b> 34
                </p>
                {party.get_characters().map((c) => (
                    <Char character={c} party={party} />
                ))}
            </div>
            <div>
                <h2>Treasure found: ({party.get_treasure_xp()} XP)</h2>
                {party.get_treasure().map((t) => (
                    <PartyTreasure treasure={t} />
                ))}
            </div>
            <div>
                <h2>Monsters defeated: ({party.get_monster_xp()} XP)</h2>
                {party.get_monsters().map((m) => (
                    <MonsterDefeated monster={m} />
                ))}
            </div>
        </div>
    )
}

export default Home
