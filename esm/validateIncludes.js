import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default curry((arr, value, params) => {
    return arr.includes(value)
        ? Promise.resolve(simpleValidationResult())
        : Promise.resolve(simpleValidationResult(messageObj('not-listed', 'This is not a valid option.')))
})
