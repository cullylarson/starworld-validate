import {validate, customMessages} from '../esm/'
import validateNotEmpty from '../esm/validateNotEmpty'
import validateInteger from '../esm/validateInteger'

test('Does simple validation', () => {
    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        name: [customMessages({'is-empty': 'Name is empty.'}, validateNotEmpty)],
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
                    name: [{
                        code: 'is-empty',
                        message: 'Name is empty.',
                    }],
                },
            })
        })
})

test('Show valid data as valid', () => {
    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        name: [customMessages({'is-empty': 'Name is empty.'}, validateNotEmpty)],
    }, {
        id: 123,
        name: 'Someone',
    })
        .then(result => {
            expect(result).toEqual({
                isValid: true,
                errors: [],
                paramErrors: {
                    id: [],
                    name: [],
                },
            })
        })
})

test('Shows general validator message', () => {
    return validate([
        customMessages({'not-integer': 'Params not integer.'}, validateInteger),
        customMessages({'not-integer': 'Params not integer 2.'}, validateInteger),
    ], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        name: [customMessages({'is-empty': 'Name is empty.'}, validateNotEmpty)],
    }, {
        id: 'asdf',
        name: '',
    })
        .then(result => {
            expect(result).toEqual({
                isValid: false,
                errors: [
                    {
                        code: 'not-integer',
                        message: 'Params not integer.',
                    },
                    {
                        code: 'not-integer',
                        message: 'Params not integer 2.',
                    },
                ],
                paramErrors: {
                    id: [{
                        code: 'not-integer',
                        message: 'Id not integer.',
                    }],
                    name: [{
                        code: 'is-empty',
                        message: 'Name is empty.',
                    }],
                },
            })
        })
})
