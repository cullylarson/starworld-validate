import {liftA, compose, map, curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

const hasDuplicates = compose(
    x => (new Set(x)).size !== x.length,
    map(x => JSON.stringify(x))
)

// does a deep compare of objects and arrays (by value, not by reference)
export default curry((values, params) => {
    return hasDuplicates(liftA(values))
        ? Promise.resolve(simpleValidationResult(messageObj('has-duplicates', 'This list cannot contain duplicates.')))
        : Promise.resolve(simpleValidationResult())
})
