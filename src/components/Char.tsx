import { Character, NPC } from '../service/Character'
import { Party } from '../service/Party'

interface CharProps {
    character: Character | NPC
    party: Party
    removeCharacter: (uuid: string) => void
    editCharacter: (uuid: string) => void
}

const Char = ({
    character,
    party,
    removeCharacter,
    editCharacter,
}: CharProps) => {
    return (
        <div className="character mb-20">
            <h3>
                {character.get_name()} ({character.get_char_class()}{' '}
                {character.get_level()}
                {character instanceof NPC ? (
                    <>
                        , <span className="span-npc">NPC</span>
                    </>
                ) : null}
                )
            </h3>
            {character.get_xp_mod() !== 0 ? (
                <p>
                    <b>XP Modifier:</b> {character.get_xp_mod() > 0 ? '+' : ''}
                    {character.get_xp_mod()}%
                </p>
            ) : null}
            {character instanceof NPC ? (
                <p>
                    <b>Daily wage:</b> {character.get_wage()}
                    {character.get_wage_coin()}, <b>Shares of treasure:</b>{' '}
                    {character.get_share()}
                </p>
            ) : (
                <p>
                    <b title="Total XP Needed">TXP:</b> {character.get_txp()}
                </p>
            )}
            <p>
                <b>Receives:</b>
            </p>
            <ul>
                <li>
                    <b>XP:</b> +
                    {Math.round(
                        (character instanceof NPC
                            ? party.get_xp_per_npc_share()
                            : party.get_xp_per_pc_share()) *
                            character.get_xp_mod_percentage()
                    ).toFixed(0)}{' '}
                </li>
                <li>
                    <b>Treasure:</b>{' '}
                    {character instanceof NPC
                        ? party.getGpPerShare() *
                          party.share_to_num(
                              character.get_share(),
                              party.get_pc_share()
                          )
                        : party.getGpPerPCShare()}
                    gp
                </li>
            </ul>
            <p>
                <button
                    className="btn btn-inline"
                    onClick={(e) => editCharacter(character.get_uuid())}
                >
                    Edit
                </button>{' '}
                |{' '}
                <button
                    className="btn btn-inline"
                    onClick={(e) => removeCharacter(character.get_uuid())}
                >
                    Remove
                </button>
            </p>
        </div>
    )
}

export default Char
