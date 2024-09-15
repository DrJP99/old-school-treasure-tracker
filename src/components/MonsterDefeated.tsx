import { Monster } from '../service/Monster'

interface MonsterDefeatedProps {
    monster: Monster
    removeMonster: (uuid: string) => void
}

const MonsterDefeated = ({ monster, removeMonster }: MonsterDefeatedProps) => {
    return (
        <div>
            <h3>
                {monster.get_qty()} {monster.get_name()}
            </h3>
            <p>
                {monster.get_description().length > 0 ? (
                    <>{monster.get_description()}. </>
                ) : (
                    ''
                )}
                <b>XP</b>: {monster.get_xp()}{' '}
                {monster.get_qty() > 1 ? (
                    <>each ({monster.get_total_xp()} total)</>
                ) : (
                    ''
                )}
            </p>
            <p>
                <button onClick={(e) => console.log('Edit')}>Edit</button>|{' '}
                <button onClick={(e) => removeMonster(monster.getUuid())}>
                    Remove
                </button>
            </p>
        </div>
    )
}

export default MonsterDefeated
