import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default curry((value, params) => {
    return !Array.isArray(value) || !value.length
        ? Promise.resolve(simpleValidationResult(messageObj('is-empty', 'Please provide a value.')))
        : Promise.resolve(simpleValidationResult())
})
