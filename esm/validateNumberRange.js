import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default curry((smallest, largest, value, params) => {
    return value < smallest || value > largest
        ? Promise.resolve(simpleValidationResult(messageObj('out-of-range', `Please provide a value between ${smallest} and ${largest}.`)))
        : Promise.resolve(simpleValidationResult())
})
