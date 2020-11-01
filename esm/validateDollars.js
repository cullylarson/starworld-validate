import {curry, isFloat} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

const digitsAfterDecimal = x => {
    const [, after] = x.toString().split('.')

    if(after === undefined) return 0

    return after.split('').length
}

export default curry(({allowZero = true, allowNegative = true}, value, params) => {
    const notMoneyResult = simpleValidationResult(messageObj('not-dollars', 'Please provide a valid dollar amount.'))

    if(!isFloat(value)) {
        return Promise.resolve(notMoneyResult)
    }

    const floatValue = parseFloat(value)

    if(!allowZero && floatValue === 0) {
        return Promise.resolve(simpleValidationResult(messageObj('is-zero', 'A zero amount is not allowed.')))
    }

    if(!allowNegative && floatValue < 0) {
        return Promise.resolve(simpleValidationResult(messageObj('is-negative', 'A negative amount is not allowed.')))
    }

    if(digitsAfterDecimal(floatValue) > 2) {
        return Promise.resolve(notMoneyResult)
    }

    return Promise.resolve(simpleValidationResult())
})
