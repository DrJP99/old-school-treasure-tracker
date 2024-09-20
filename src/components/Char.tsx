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
                {character.getName()} ({character.getCharClass()}{' '}
                {character.getLevel()}
                {character instanceof NPC ? (
                    <>
                        , <span className="span-npc">NPC</span>
                    </>
                ) : null}
                )
            </h3>
            {character.getXpMod() !== 0 ? (
                <p>
                    <b>XP Modifier:</b> {character.getXpMod() > 0 ? '+' : ''}
                    {character.getXpMod()}%
                </p>
            ) : null}
            {character instanceof NPC ? (
                <p>
                    <b>Daily wage:</b> {character.getWage()}
                    {character.getWageCoin()}, <b>Shares of treasure:</b>{' '}
                    {character.getShare()}
                </p>
            ) : (
                <p>
                    <b title="Total XP Needed">TXP:</b>{' '}
                    {character.getTxp().toLocaleString()}
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
                            ? party.getXpPerNpcShare()
                            : party.getXpPerPcShare()) *
                            character.getXpModPercentage()
                    ).toLocaleString()}{' '}
                </li>
                <li>
                    <b>Treasure:</b>{' '}
                    {character instanceof NPC
                        ? (
                              party.getGpPerShare() *
                              party.shareToNum(
                                  character.getShare(),
                                  party.getPcShare()
                              )
                          ).toLocaleString()
                        : party.getGpPerPCShare().toLocaleString()}
                    gp
                </li>
            </ul>
            <p>
                <button
                    className="btn btn-inline"
                    onClick={(e) => editCharacter(character.getUuid())}
                >
                    Edit
                </button>{' '}
                |{' '}
                <button
                    className="btn btn-inline"
                    onClick={(e) => removeCharacter(character.getUuid())}
                >
                    Remove
                </button>
            </p>
        </div>
    )
}

export default Char
