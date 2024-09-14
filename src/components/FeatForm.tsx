import { FormEvent, useState } from 'react'
import { Feat } from '../service/Feat'
import { FeatLevel } from '../service/FeatLevel'
import { getEnumKeys } from '../service/EnumKeys'
import { capitalize } from '../service/Capitalize'

interface FeatFormProps {
    returnFeat: (feat: Feat) => void
    closeForm: () => void
}

const FeatForm = ({ returnFeat, closeForm }: FeatFormProps) => {
    const [name, setName] = useState<string>('')
    const [featLevel, setFeatLevel] = useState<FeatLevel>(FeatLevel.minor)
    const [description, setDescription] = useState<string>('')

    let resetFields = () => {
        setName('')
        setFeatLevel(FeatLevel.minor)
        setDescription('')
    }

    let addFeat = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        let feat = new Feat(name, featLevel, description)
        resetFields()
        returnFeat(feat)
    }

    let close = () => {
        resetFields()
        closeForm()
    }

    return (
        <div className="form">
            <form onSubmit={(e) => addFeat(e)} className="form-group">
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
