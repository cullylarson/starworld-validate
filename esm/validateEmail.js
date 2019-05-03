import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default curry((value, params) => {
    return /^.+@.+\..+$/.test(value)
        ? Promise.resolve(simpleValidationResult())
        : Promise.resolve(simpleValidationResult(messageObj('not-valid', 'Please provide a valid email address.')))
})
