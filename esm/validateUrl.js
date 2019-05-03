import {URL} from 'whatwg-url'
import {curry} from '@cullylarson/f'
import {messageObj, simpleValidationResult} from './index'

export default curry((value, params) => {
    try {
        new URL(value) // eslint-disable-line no-new
        return Promise.resolve(simpleValidationResult())
    }
    catch(_) {
        return Promise.resolve(simpleValidationResult(messageObj('not-url', 'Please provide a valid URL.')))
    }
})
