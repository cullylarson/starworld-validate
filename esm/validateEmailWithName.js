import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

// allows an email address with a name (e.g. "My Name <me@example.com>")
export default curry((value, params) => {
    return /^.+? <.+@.+\..+>$/.test(value)
        ? Promise.resolve(simpleValidationResult())
        : Promise.resolve(simpleValidationResult(messageObj('not-valid', 'Please provide a valid name and email address, in the format: My Name <me@example.com>')))
})
