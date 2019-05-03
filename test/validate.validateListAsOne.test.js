import {validate, validateListAsOne, customMessages} from '../esm/'
import validateDate from '../esm/validateDate'
import validateNotEmpty from '../esm/validateNotEmpty'
import validateInteger from '../esm/validateInteger'

test('Validates items with array of values', () => {
    return validate([], {
        ids: [validateListAsOne([
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
                    ids: [{
                        code: 'is-empty',
                        message: 'Id is empty.',
                    }],
                },
            })
        })
})

test('Validates items with array of values, when the second value is not valid', () => {
    return validate([], {
        ids: [validateListAsOne([
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ])],
    }, {
        ids: ['123', 'abc', 'cdf'],
    })
        .then(result => {
            expect(result).toEqual({
                isValid: false,
                errors: [],
                paramErrors: {
                    ids: [{
                        code: 'not-integer',
                        message: 'Id not integer.',
                    }],
                },
            })
        })
})

test('Shows as valid when using items with array of values', () => {
    return validate([], {
        ids: [validateListAsOne([
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
                    ids: [],
                },
            })
        })
})

test('Validates items with array of values and the array itself', () => {
    return validate([], {
        ids: [
            customMessages({'not-date': 'List not a date.'}, validateDate(x => x)),
            validateListAsOne([
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
                    ids: [{
                        code: 'not-date',
                        message: 'List not a date.',
                    }],
                },
            })
        })
})

test('Validates items with array of values and the array itself, when the array itself validator comes second', () => {
    return validate([], {
        ids: [
            validateListAsOne([
                customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
                customMessages({'not-integer': 'Id not integer.'}, validateInteger),
            ]),
            customMessages({'not-date': 'List not a date.'}, validateDate(x => x)),
        ],
    }, {
        ids: ['123', '456', '789'],
    })
        .then(result => {
            expect(result).toEqual({
                isValid: false,
                errors: [],
                paramErrors: {
                    ids: [{
                        code: 'not-date',
                        message: 'List not a date.',
                    }],
                },
            })
        })
})
