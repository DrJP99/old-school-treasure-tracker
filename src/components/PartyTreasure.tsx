import { CoinTreasure, Treasure } from '../service/Treasure'

interface PartyTreasureProps {
    treasure: Treasure
    removeTreasure: (uuid: string) => void
    editTreasure: (uuid: string) => void
}

const PartyTreasure = ({
    treasure,
    removeTreasure,
    editTreasure,
}: PartyTreasureProps) => {
    return (
        <div>
            {treasure instanceof CoinTreasure ? (
                <h3>{treasure.toString()}</h3>
            ) : (
                <>
                    <h3>
                        {treasure.getQty() > 1 ? (
                            <>
                                {treasure.getQty().toLocaleString()}
                                {'x '}
                            </>
                        ) : (
                            <></>
                        )}
                        {treasure.getName()}
                    </h3>
                    <p>
                        {treasure.getDescription().length > 0 ? (
                            <>{treasure.getDescription()} </>
                        ) : (
                            ''
                        )}
                        {treasure.getWorth() > 0 ? (
                            <>
                                (worth {treasure.getWorth().toLocaleString()}
                                {treasure.getWorthCoin()}
                                {treasure.getQty() > 1 ? (
                                    <> {treasure.getWorthDeterminer()}</>
                                ) : (
                                    ''
                                )}
                                )
                            </>
                        ) : (
                            ''
                        )}
                    </p>
                </>
            )}
            <p>
                <button
                    className="btn btn-inline"
                    onClick={(e) => editTreasure(treasure.getUuid())}
                >
                    Edit
                </button>{' '}
                |{' '}
                <button
                    className="btn btn-inline"
                    onClick={(e) => removeTreasure(treasure.getUuid())}
                >
                    Remove
                </button>
            </p>
        </div>
    )
}

export default PartyTreasure
