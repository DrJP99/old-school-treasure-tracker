import { Monster } from '../service/Monster'

interface MonsterDefeatedProps {
    monster: Monster
    removeMonster: (uuid: string) => void
    editMonster: (uuid: string) => void
}

const MonsterDefeated = ({
    monster,
    removeMonster,
    editMonster,
}: MonsterDefeatedProps) => {
    return (
        <div>
            <h3>
                {monster.getQty().toLocaleString()} {monster.getName()}
            </h3>
            <p>
                {monster.getDescription().length > 0 ? (
                    <>{monster.getDescription()}. </>
                ) : (
                    ''
                )}
                <b>XP</b>: {monster.getXp().toLocaleString()}{' '}
                {monster.getQty() > 1 ? (
                    <>each ({monster.getTotalXp().toLocaleString()} total)</>
                ) : (
                    ''
                )}
            </p>
            <p>
                <button
                    className="btn btn-inline"
                    onClick={(e) => editMonster(monster.getUuid())}
                >
                    Edit
                </button>{' '}
                |{' '}
                <button
                    className="btn btn-inline"
                    onClick={(e) => removeMonster(monster.getUuid())}
                >
                    Remove
                </button>
            </p>
        </div>
    )
}

export default MonsterDefeated
