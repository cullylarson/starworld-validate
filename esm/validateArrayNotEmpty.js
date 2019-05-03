import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

// only works on strings and numbers
export default curry((value, params) => {
    return !Array.isArray(value) || !value.length
        ? Promise.resolve(simpleValidationResult(messageObj('is-empty', 'Please provide a value.')))
        : Promise.resolve(simpleValidationResult())
})
