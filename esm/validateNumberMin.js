import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default curry((smallest, value, params) => {
    return value < smallest
        ? Promise.resolve(simpleValidationResult(messageObj('too-small', `Please provide a value that is at least ${smallest}.`)))
        : Promise.resolve(simpleValidationResult())
})
