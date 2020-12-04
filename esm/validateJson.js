import {messageObj, simpleValidationResult} from './index'

export default (value) => {
    try {
        JSON.parse(value)
    }
    catch (e) {
        return Promise.resolve(simpleValidationResult(messageObj('not-json', 'The value provided is not valid JSON.')))
    }

    return Promise.resolve(simpleValidationResult())
}
