import { FormEvent, useEffect, useState } from 'react'
import { Feat } from '../service/Feat'
import { FeatLevel } from '../service/FeatLevel'
import { getEnumKeys } from '../service/EnumKeys'
import { capitalize } from '../service/Capitalize'

interface FeatFormProps {
    returnFeat: (feat: Feat) => void
    returnEditFeat: (feat: Feat) => void
    closeForm: () => void
    feat: Feat | undefined
}

const FeatForm = ({
    returnFeat,
    returnEditFeat,
    closeForm,
    feat = undefined,
}: FeatFormProps) => {
    const [name, setName] = useState<string>('')
    const [featLevel, setFeatLevel] = useState<FeatLevel>(FeatLevel.minor)
    const [description, setDescription] = useState<string>('')

    useEffect(() => {
        if (feat) {
            setName(feat.getName())
            setFeatLevel(feat.getFeatLevel())
            setDescription(feat.getDescription())
        }
    }, [feat])

    let resetFields = () => {
        setName('')
        setFeatLevel(FeatLevel.minor)
        setDescription('')
    }

    let addFeat = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        let newFeat = new Feat(name, featLevel, description)
        resetFields()
        returnFeat(newFeat)
    }

    let editFeat = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        let newFeat = new Feat(name, featLevel, description, feat?.getUuid())
        resetFields()
        returnEditFeat(newFeat)
    }

    let close = () => {
        resetFields()
        closeForm()
    }

    return (
        <div className="form">
            <form onSubmit={feat ? editFeat : addFeat} className="form-group">
                <h3>Feat of Exploration</h3>
                <label htmlFor="feat-level">Feat Award</label>
                <select
                    value={featLevel}
                    id="character-class"
                    onChange={(e) => setFeatLevel(e.target.value as FeatLevel)}
                >
                    {getEnumKeys(FeatLevel).map((key, index) => (
                        <option key={index} value={FeatLevel[key]}>
                            {capitalize(key)}
                        </option>
                    ))}
                </select>
                <label htmlFor="feat-name">Name</label>
                <input
                    type="text"
                    name="feat-name"
                    id="feat-name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="feat-description">Description</label>
                <input
                    type="text"
                    name="feat-description"
                    id="feat-description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="form-footer">
                    <button className="btn btn-danger" onClick={close}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-accept float-right"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FeatForm
