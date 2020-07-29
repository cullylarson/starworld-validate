import {curry, isString, trim} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'
import {isEmailRegex} from './validateEmail'

// If value is empty, will not return an error. Assumes a comma-separated list of email addresses. Will split, trim, and get rid of empty values. So, will not validate any empty values (e.g. "test@example.com, , another@example.com" will only test two email addresses). However, if there are only empty values, will return an error.
export default curry((value, params) => {
    const notValidResult = Promise.resolve(simpleValidationResult(messageObj('not-valid', 'At least one of the email addresses provided is not valid.')))

    if(!value) return Promise.resolve(simpleValidationResult())
    if(!isString(value)) return notValidResult

    const addresses = value.split(',').map(trim).filter(Boolean)

    if(!addresses.length) return notValidResult

    for(const address of addresses) {
        if(!isEmailRegex.test(address)) return notValidResult
    }

    return Promise.resolve(simpleValidationResult())
})
