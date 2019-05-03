import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default curry((value, params) => {
    const valueInt = Number.parseInt(value)
    const valueStr = value + ''
    const valueIntStr = valueInt + ''

    return Number.isNaN(valueInt) || valueStr !== valueIntStr
        ? Promise.resolve(simpleValidationResult(messageObj('not-integer', 'Please provide an integer.')))
        : Promise.resolve(simpleValidationResult())
})
