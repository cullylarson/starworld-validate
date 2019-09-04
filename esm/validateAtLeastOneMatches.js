import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

// Validates an array. The provided function is called for each value in the array. If the function
// returns true for at least one value, the array is valid. Otherwise, not valid. Empty arrays are
// always invalid.
export default curry((f, value, params) => {
    const getNotValid = () => Promise.resolve(simpleValidationResult(messageObj('no-match', 'Please provide a value.')))

    if(!Array.isArray(value) || !value.length) return getNotValid()

    const matches = value.filter(f)

    return matches.length > 0
        ? Promise.resolve(simpleValidationResult())
        : getNotValid()
})
