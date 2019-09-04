import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default curry((value, params) => {
    return value === true || value === false
        ? Promise.resolve(simpleValidationResult())
        : Promise.resolve(simpleValidationResult(messageObj('not-boolean', 'Please provide a true or false value.')))
})
