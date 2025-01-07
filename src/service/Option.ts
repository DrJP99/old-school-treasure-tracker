import { CharClass } from './CharClass'
import { getEnumKeys } from './EnumKeys'

type Option = {
    availableClasses: CharClass[]
}

export const generateOptionObject = (): Option => {
    let newOptionObj: Option = {
        availableClasses: getEnumKeys(CharClass).map((c) => c as CharClass),
    }

    return newOptionObj
}

export const loadOption = (): Option => {
    let myOption = JSON.parse(window.localStorage.getItem('option') || '""')

    let tempOption: Option
    if (!myOption) {
        console.warn(
            'Option Object not found... Generating a new Option Object'
        )
        tempOption = generateOptionObject()
    } else {
        tempOption = myOption
    }

    return tempOption
}

export const saveOption = (optionObj: Option): void => {
	console.log('Saving option...')
	window.localStorage.setItem('option', JSON.stringify(optionObj))
}

export default Option
