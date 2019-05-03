import {validate, onlyNotEmpty, customMessages} from '../esm/'
import validateInteger from '../esm/validateInteger'

test('Validates non-empty value', () => {
    return validate([], {
        id: [
            onlyNotEmpty(customMessages({'not-integer': 'Id not integer.'}, validateInteger)),
        ],
    }, {
        id: 'abc',
    })
        .then(result => {
            expect(result).toEqual({
                isValid: false,
                errors: [],
                paramErrors: {
                    id: [{
                        code: 'not-integer',
                        message: 'Id not integer.',
                    }],
                },
            })
        })
})

test('Does not validate empty value', () => {
    return validate([], {
        id: [
            onlyNotEmpty(customMessages({'not-integer': 'Id not integer.'}, validateInteger)),
        ],
    }, {
        id: '',
    })
        .then(result => {
            expect(result).toEqual({
                isValid: true,
                errors: [],
                paramErrors: {
                    id: [],
                },
            })
        })
})

test('Shows non-empty value as valid', () => {
    return validate([], {
        id: [
            onlyNotEmpty(customMessages({'not-integer': 'Id not integer.'}, validateInteger)),
        ],
    }, {
        id: 123,
    })
        .then(result => {
            expect(result).toEqual({
                isValid: true,
                errors: [],
                paramErrors: {
                    id: [],
                },
            })
        })
})
