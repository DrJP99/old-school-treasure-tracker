import { Feat } from '../service/Feat'

interface PartyFeatProps {
    feat: Feat
    txp: number
}

const PartyFeat = ({ feat, txp }: PartyFeatProps) => {
    return (
        <div>
            <h3>
                {feat.getName()} ({feat.getFeatLevel()})
            </h3>
            <p>
                {feat.getDescription().length > 0 ? (
                    <>{feat.getDescription()} - </>
                ) : null}
                {feat.getXP(txp)} XP
            </p>
        </div>
    )
}

export default PartyFeat
