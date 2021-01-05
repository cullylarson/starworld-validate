import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default (acceptableLengths = [5, 9]) => curry((value, params) => {
    const justNumbers = value.replace(/[^0-9]/g, '')

    return acceptableLengths.includes(justNumbers.length)
        ? Promise.resolve(simpleValidationResult())
        : Promise.resolve(simpleValidationResult(messageObj('not-valid', 'Please provide a valid zip code')))
})
