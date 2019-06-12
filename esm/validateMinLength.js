import {curry, toStr} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

// will convert value to a string before validating. if original value is not a string or a
// number, results may be unpredictable.
export default curry((minLength, value) => {
    const trailingS = minLength === 1 ? '' : 's'

    return toStr(value).length < minLength
        ? Promise.resolve(simpleValidationResult(messageObj('too-short', `This value must be at least ${minLength} character${trailingS} long.`)))
        : Promise.resolve(simpleValidationResult())
})
