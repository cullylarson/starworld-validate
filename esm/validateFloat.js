import {curry, isFloat} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default curry((value, params) => {
    return isFloat(value)
        ? Promise.resolve(simpleValidationResult())
        : Promise.resolve(simpleValidationResult(messageObj('not-float', 'Please provide a number.')))
})
