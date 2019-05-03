import {toInt, get, isString, curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult, isEmpty} from './index'
import parse from 'date-fns/parse'
import isValidDate from 'date-fns/is_valid'
import isEqual from 'date-fns/is_equal'
import isBefore from 'date-fns/is_before'

export default curry((toComponents, compareDateParamKey, onlyCheckIfCompareParamHasValue, allowEqual, value, params) => {
    const compareValue = get(compareDateParamKey, '', params)
    const validResult = simpleValidationResult()

    const doValidate = () => {
        const ensureComponents = x => ({
            day: toInt(0, get('day', 0, x)),
            month: toInt(0, get('month', 0, x)),
            year: toInt(0, get('year', 0, x)),
        })

        const notBeforeMessage = simpleValidationResult(messageObj('not-before', 'This date must come before the other date provided.'))

        const toDate = components => parse(`${components.year}-${components.month}-${components.day}`)

        const valueComponents = ensureComponents(isString(value) ? toComponents(value) : null)
        const compareComponents = ensureComponents(isString(compareValue) ? toComponents(compareValue) : null)

        const valueDate = toDate(valueComponents)
        const compareDate = toDate(compareComponents)

        if(!isValidDate(valueDate) || !isValidDate(compareDate)) return Promise.resolve(notBeforeMessage)
        else if(allowEqual && isEqual(valueDate, compareDate)) return Promise.resolve(validResult)
        else if(!isBefore(valueDate, compareDate)) return Promise.resolve(notBeforeMessage)
        else return Promise.resolve(validResult)
    }

    return onlyCheckIfCompareParamHasValue
        ? (!isEmpty(compareValue) ? doValidate() : Promise.resolve(validResult))
        : doValidate()
})
