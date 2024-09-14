import { Feat } from '../service/Feat'

interface PartyFeatProps {
    feat: Feat
}

const PartyFeat = ({ feat }: PartyFeatProps) => {
    return (
        <div>
            <h3>
                {feat.getName()} ({feat.getFeatLevel()})
            </h3>
            <p>{feat.getDescription()}</p>
        </div>
    )
}

export default PartyFeat
