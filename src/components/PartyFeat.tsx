import { Feat } from '../service/Feat'

interface PartyFeatProps {
    feat: Feat
    txp: number
    removeFeat: (uuid: string) => void
    editFeat: (uuid: string) => void
}

const PartyFeat = ({ feat, txp, removeFeat, editFeat }: PartyFeatProps) => {
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
            <p>
                <button onClick={(e) => editFeat(feat.getUuid())}>Edit</button>|{' '}
                <button onClick={(e) => removeFeat(feat.getUuid())}>
                    Remove
                </button>
            </p>
        </div>
    )
}

export default PartyFeat
