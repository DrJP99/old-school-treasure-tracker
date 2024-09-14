import { Character, NPC } from '../service/Character'
import { Party } from '../service/Party'

interface CharProps {
    character: Character | NPC
    party: Party
}

const Char = ({ character, party }: CharProps) => {
    return (
        <div className="note-card" key={character.get_name()}>
            <div className="card-header">
                <div className="tags">
                    {!character.get_pc() && character instanceof NPC ? (
                        <>
                            <span className={`tag tag-green`}>NPC</span>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="card-header-top">
                    <h3 className="card-title">{character.get_name()}</h3>
                    <p className="date">
                        {character.get_char_class()} {character.get_level()}
                    </p>
                </div>
                <p className="note-creator">
                    XP Bonus: {character.get_xp_mod() >= 0 ? '+' : '-'}
                    {character.get_xp_mod()}%{'. '}
                    {character instanceof NPC ? (
                        <>
                            Daily wage: {character.get_wage()}
                            {character.get_wage_coin()}. Treasure share:{' '}
                            {character.get_share()}
                        </>
                    ) : (
                        <></>
                    )}
                </p>
            </div>
            <p>
                Share of XP:{' '}
                {Math.round(
                    (character instanceof NPC
                        ? party.get_xp_per_npc_share()
                        : party.get_xp_per_pc_share()) *
                        character.get_xp_mod_percentage()
                ).toFixed(0)}
            </p>
            <div className="note-buttons">
                <button className="btn btn-accept">Edit</button>
                <button className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}

export default Char
