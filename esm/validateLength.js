import {curry, toStr} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

// will convert value to a string before validating. if original value is not a string or a
// number, results may be unpredictable.
// minLength and maxLength are inclusive (i.e. the value can be that short/long).
export default curry((minLength, maxLength, value) => {
    const trailingSMax = maxLength === 1 ? '' : 's'
    const trailingSMin = minLength === 1 ? '' : 's'

    const length = toStr(value).length

    if(length > maxLength) {
        return Promise.resolve(simpleValidationResult(messageObj('too-long', `This value cannot be longer than ${maxLength} character${trailingSMax}.`)))
    }
    else if(length < minLength) {
        return Promise.resolve(simpleValidationResult(messageObj('too-short', `This value must be at least ${minLength} character${trailingSMin} long.`)))
    }
    else {
        return Promise.resolve(simpleValidationResult())
    }
})
