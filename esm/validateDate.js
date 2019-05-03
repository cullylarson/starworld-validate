import {toInt, curry, compose, get} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'
import parse from 'date-fns/parse'
import isValidDate from 'date-fns/is_valid'

// the year has to be four digits or it won't be valid
export default curry((toComponents, value, params) => {
    const components = compose(
        x => ({
            day: toInt(0, get('day', 0, x)),
            month: toInt(0, get('month', 0, x)),
            year: toInt(0, get('year', 0, x)),
        }),
        toComponents,
    )(value)

    const notDateMessage = simpleValidationResult(messageObj('not-date', 'This date is not valid.'))

    if(components.day < 1 || components.day > 31) return Promise.resolve(notDateMessage)
    if(components.month < 1 || components.month > 12) return Promise.resolve(notDateMessage)
    if(components.year < 1700 || components.year > 2300) return Promise.resolve(notDateMessage)

    const theDate = parse(`${components.year}-${components.month}-${components.day}`)

    return isValidDate(theDate)
        ? Promise.resolve(simpleValidationResult())
        : Promise.resolve(notDateMessage)
})
