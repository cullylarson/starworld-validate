import {liftA, compose, curry, reduce, get} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

const hasDuplicates = comparator => compose(
    get('foundDuplicate', true),
    reduce((acc, x) => {
        if(acc.foundDuplicate) return acc

        return acc.uniqueValues.filter(y => comparator(y, x)).length > 0
            // found a duplicate
            ? {foundDuplicate: true}
            : {
                uniqueValues: [ ...acc.uniqueValues, x ],
                foundDuplicate: false,
            }
    }, {uniqueValues: [], foundDuplicate: false})
)

// compares values using a provided comparator. comparator should return true on equal,
// false on not equal
export default curry((comparator, values, params) => {
    return hasDuplicates(comparator)(liftA(values))
        ? Promise.resolve(simpleValidationResult(messageObj('has-duplicates', 'This list cannot contain duplicates.')))
        : Promise.resolve(simpleValidationResult())
})
