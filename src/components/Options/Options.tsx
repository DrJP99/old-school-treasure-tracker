import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEnumKeys } from '../../service/EnumKeys'
import { CharClass } from '../../service/CharClass'
import Option, { loadOption, saveOption } from '../../service/Option'

const Options = () => {
    const navigate = useNavigate()

    const [option, setOption] = useState<Option>(loadOption())

    useEffect(() => {
        handleSetOption(option)
    }, [option])

    const handleSetOption = (option: Option) => {
        setClasses(
            getEnumKeys(CharClass).map((key) => {
                return {
                    key: key,
                    value: option.availableClasses.includes(key as CharClass),
                }
            })
        )

        setOption(option)
    }

    // useEffect(() => {
    //     if (option) {
    //         setClasses(
    //             getEnumKeys(CharClass).map((key) => {
    //                 return {
    //                     key: key,
    //                     value: option.availableClasses.includes(
    //                         key as CharClass
    //                     ),
    //                 }
    //             })
    //         )
    //     }
    // }, [option])

    type SelectedClass = {
        key: string
        value: boolean
    }

    const [classes, setClasses] = useState<SelectedClass[]>(
        getEnumKeys(CharClass).map((key) => {
            return {
                key: key,
                value: true,
            }
        })
    )

    const handleCheck = (index: number) => {
        setClasses(
            classes.map((c, idx) => {
                return idx === index ? { ...c, value: !c.value } : { ...c }
            })
        )
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const optionObject: Option = {
            availableClasses: classes
                .filter((c) => c.value)
                .map((c) => c.key as CharClass),
        }

        saveOption(optionObject)
        handleSetOption(optionObject)
    }

    const handleCancel = () => {
        handleSetOption(option)
    }

    return (
        <div>
            <h2>Options</h2>
            <p>Select the classes you want to use for your campaign:</p>
            <form onSubmit={handleSubmit}>
                <ul className="option-list">
                    {classes.map((c, idx) => (
                        <li key={c.key}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={c.value}
                                    value={c.key}
                                    onChange={() => handleCheck(idx)}
                                />
                                {c.key}
                            </label>
                        </li>
                    ))}
                </ul>
                <div>
                    <button className="btn btn-inline" onClick={handleCancel}>
                        Cancel
                    </button>
                    {' | '}
                    <button type="submit" className="btn btn-inline">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Options
