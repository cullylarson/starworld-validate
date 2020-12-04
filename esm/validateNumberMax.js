import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default curry((largest, value, params) => {
    return value > largest
        ? Promise.resolve(simpleValidationResult(messageObj('too-big', `Please provide a value that is no greater than ${largest}.`)))
        : Promise.resolve(simpleValidationResult())
})
