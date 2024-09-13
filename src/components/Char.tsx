import { Character, NPC } from '../service/Character'
import { Party } from '../service/Party'

interface CharProps {
    character: Character
    party: Party
}

const Char = ({ character, party }: CharProps) => {
    return (
        <div key={character.get_name()}>
            <h3>
                {character.get_name()} ({character.get_char_class()}{' '}
                {character.get_level()})
                {!character.get_pc() && character instanceof NPC ? (
                    <>
                        {' - '}
                        <b>NPC</b>
                    </>
                ) : (
                    ''
                )}
            </h3>
            <p>
                {!character.get_pc() && character instanceof NPC ? (
                    <>
                        Wage: {character.get_wage()}
                        {character.get_wage_coin()} per day. Treasure share:{' '}
                        {character.get_share()}. Share of XP:{' '}
                        {party.get_xp_per_share() *
                            party.share_to_num(
                                character.get_share(),
                                party.get_pc_share()
                            )}
                    </>
                ) : (
                    <>
                        Share of XP:{' '}
                        {party.get_xp_per_pc_share() *
                            character.get_xp_mod_percentage()}
                    </>
                )}{' '}
            </p>
        </div>
    )
}

export default Char
