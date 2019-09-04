import {liftA, compose, curry, reduce, get} from '@cullylarson/f'
import deepEqual from 'fast-deep-equal'
import {messageObj, simpleValidationResult} from './index'

const hasDuplicates = compose(
    get('foundDuplicate', true),
    reduce((acc, x) => {
        if(acc.foundDuplicate) return acc

        return acc.uniqueValues.filter(y => deepEqual(y, x)).length > 0
            // found a duplicate
            ? {foundDuplicate: true}
            : {
                uniqueValues: [ ...acc.uniqueValues, x ],
                foundDuplicate: false,
            }
    }, {uniqueValues: [], foundDuplicate: false})
)

// does a deep compare of objects and arrays (by value, not by reference)
export default curry((values, params) => {
    return hasDuplicates(liftA(values))
        ? Promise.resolve(simpleValidationResult(messageObj('has-duplicates', 'This list cannot contain duplicates.')))
        : Promise.resolve(simpleValidationResult())
})
