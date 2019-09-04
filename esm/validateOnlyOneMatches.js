import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

// Validates an array. The provided function is called for each value in the array. If the function
// returns true for only one value, the array is valid. Otherwise, not valid. Empty arrays are
// always invalid.
export default curry((f, value, params) => {
    const getNotValid = () => Promise.resolve(simpleValidationResult(messageObj('not-just-one-matched', 'Only one matching value may be provided.')))

    if(!Array.isArray(value) || !value.length) return getNotValid()

    const matches = value.filter(f)

    return matches.length === 1
        ? Promise.resolve(simpleValidationResult())
        : getNotValid()
})
