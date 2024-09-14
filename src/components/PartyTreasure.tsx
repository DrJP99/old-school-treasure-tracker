import { Coin_Treasure, Treasure } from '../service/Treasure'

interface PartyTreasureProps {
    treasure: Treasure
}

const PartyTreasure = ({ treasure }: PartyTreasureProps) => {
    return (
        <div>
            {treasure instanceof Coin_Treasure ? (
                <h3>{treasure.to_string()}</h3>
            ) : (
                <>
                    <h3>
                        {treasure.getQty() > 1 ? (
                            <>
                                {treasure.getQty()}
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
                                (worth {treasure.getWorth()}
                                {treasure.getWorth_coin()}
                                {treasure.getQty() > 1 ? (
                                    <> {treasure.getWorth_determiner()}</>
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
        </div>
    )
}

export default PartyTreasure
