import {curry, toStr} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

// will convert value to a string before validating. if original value is not a string or a
// number, results may be unpredictable.
export default curry((maxLength, value) => {
    const trailingS = maxLength === 1 ? '' : 's'

    return toStr(value).length > maxLength
        ? Promise.resolve(simpleValidationResult(messageObj('too-long', `This value cannot be longer than ${maxLength} character${trailingS}.`)))
        : Promise.resolve(simpleValidationResult())
})
