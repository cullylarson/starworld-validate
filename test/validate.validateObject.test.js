import {validate, validateObject, customMessages} from '../esm/'
import validateNotEmpty from '../esm/validateNotEmpty'
import validateInteger from '../esm/validateInteger'

test('Validates items with array of values', () => {
    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        extras: validateObject({
            keyword: [customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty)],
            position: [customMessages({'not-integer': 'Id not integer.'}, validateInteger)],
        }),
    }, {
        extras: {
            keyword: '',
            position: 'asdf',
        },
    })
        .then(result => {
            expect(result).toEqual({
                isValid: false,
                errors: [],
                paramErrors: {
                    id: [{code: 'is-empty', message: 'Id is empty.'}],
                    extras: {
                        keyword: [{code: 'is-empty', message: 'Id is empty.'}],
                        position: [{code: 'not-integer', message: 'Id not integer.'}],
                    },
                },
            })
        })
})

test('Works when params are all valid.', () => {
    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        extras: validateObject({
            keyword: [customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty)],
            position: [customMessages({'not-integer': 'Id not integer.'}, validateInteger)],
        }),
    }, {
        id: 20,
        extras: {
            keyword: 'foo',
            position: 20,
        },
    })
        .then(result => {
            expect(result).toEqual({
                isValid: true,
                errors: [],
                paramErrors: {
                    id: [],
                    extras: {
                        keyword: [],
                        position: [],
                    },
                },
            })
        })
})

test("Works if a param isn't included.", () => {
    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        extras: validateObject({
            keyword: [customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty)],
            position: [customMessages({'not-integer': 'Id not integer.'}, validateInteger)],
        }),
    }, {
        extras: {
            position: 'asdf',
        },
    })
        .then(result => {
            expect(result).toEqual({
                isValid: false,
                errors: [],
                paramErrors: {
                    id: [{code: 'is-empty', message: 'Id is empty.'}],
                    extras: {
                        keyword: [{code: 'is-empty', message: 'Id is empty.'}],
                        position: [{code: 'not-integer', message: 'Id not integer.'}],
                    },
                },
            })
        })
})
