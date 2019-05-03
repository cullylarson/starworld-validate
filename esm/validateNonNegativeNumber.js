import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

// does not check whether the value is a number (so non-numeric strings will show as being valid). use another validator if you need to verify is numeric
export default curry((value, params) => {
    return value < 0
        ? Promise.resolve(simpleValidationResult(messageObj('is-negative', 'Please provide a positive number or zero.')))
        : Promise.resolve(simpleValidationResult())
})
