import {curry} from '@cullylarson/f'
import {messageObj, isEmpty, simpleValidationResult} from './index'

// only works on strings and numbers
export default curry((value) => {
    return isEmpty(value)
        ? Promise.resolve(simpleValidationResult(messageObj('is-empty', 'Please provide a value.')))
        : Promise.resolve(simpleValidationResult())
})
