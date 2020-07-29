import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'
import isEmailRegex from './isEmailRegex'

export default curry((value, params) => {
    return isEmailRegex.test(value)
        ? Promise.resolve(simpleValidationResult())
        : Promise.resolve(simpleValidationResult(messageObj('not-valid', 'Please provide a valid email address.')))
})
