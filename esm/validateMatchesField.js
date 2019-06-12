import {curry, get} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

// make sure this parameter matches another parameter
export default curry((otherParamName, otherParamTitle, value, params) => {
    const otherValue = get(otherParamName, undefined, params)

    return otherValue !== value
        ? Promise.resolve(simpleValidationResult(messageObj('no-match', `This value must match ${otherParamTitle}.`)))
        : Promise.resolve(simpleValidationResult())
})
