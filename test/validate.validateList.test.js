import {validate, validateList, customMessages} from '../esm/'
import validateDate from '../esm//validateDate'
import validateNotEmpty from '../esm//validateNotEmpty'
import validateInteger from '../esm//validateInteger'

test('Validates items with array of values', () => {
    expect.assertions(1)

    return validate([], {
        ids: [validateList([
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ])],
    }, {
        ids: ['', 'abc', 'cdf'],
    })
        .then(result => {
            expect(result).toEqual({
                isValid: false,
                errors: [],
                paramErrors: {
                    ids: [
                        [{
                            code: 'is-empty',
                            message: 'Id is empty.',
                        }],
                        [{
                            code: 'not-integer',
                            message: 'Id not integer.',
                        }],
                        [{
                            code: 'not-integer',
                            message: 'Id not integer.',
                        }],
                    ],
                },
            })
        })
})

test('Shows as valid when using items with array of values', () => {
    expect.assertions(1)

    return validate([], {
        ids: [validateList([
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ])],
    }, {
        ids: [123, 456, 789],
    })
        .then(result => {
            expect(result).toEqual({
                isValid: true,
                errors: [],
                paramErrors: {
                    ids: [
                        [],
                        [],
                        [],
                    ],
                },
            })
        })
})

test('Validates items with array of values and the array itself', () => {
    expect.assertions(1)

    return validate([], {
        ids: [
            customMessages({'not-date': 'List not a date.'}, validateDate(x => x)),
            validateList([
                customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
                customMessages({'not-integer': 'Id not integer.'}, validateInteger),
            ]),
        ],
    }, {
        ids: ['', 'abc', 'cdf'],
    })
        .then(result => {
            expect(result).toEqual({
                isValid: false,
                errors: [],
                paramErrors: {
                    ids: [
                        {
                            code: 'not-date',
                            message: 'List not a date.',
                        },
                    ],
                },
            })
        })
})
