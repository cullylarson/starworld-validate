import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default curry((regex, value, params) => {
    return regex.test(value)
        ? Promise.resolve(simpleValidationResult())
        : Promise.resolve(simpleValidationResult(messageObj('no-match', 'The format of this value is not valid.')))
})
