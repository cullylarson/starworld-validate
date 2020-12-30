import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default (minLength = 10) => curry((value, params) => {
    const endS = minLength === 1 ? '' : 's'

    // must have at least minLength numeric characters
    return value.replace(/[^0-9]/g, '').length >= minLength
        ? Promise.resolve(simpleValidationResult())
        : Promise.resolve(simpleValidationResult(messageObj('not-valid', `Please provide a valid phone number, with at least ${minLength} digit${endS}.`)))
})
