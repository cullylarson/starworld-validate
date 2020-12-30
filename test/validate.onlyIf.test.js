import {validate, onlyIf, customMessages, notEmpty} from '../esm/'
import validateInteger from '../esm/validateInteger'

const isNumber = x => typeof x === 'number'

test('Runs validation on a numeric value, where the test is that it is numeric.', () => {
    expect.assertions(1)

    return validate([], {
        id: [
            onlyIf(isNumber, customMessages({'not-integer': 'Id not integer.'}, validateInteger)),
        ],
    }, {
        id: 1.1,
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

test('Does not run validation on a non-numeric value, where he test is that it is numeric.', () => {
    expect.assertions(1)

    return validate([], {
        id: [
            onlyIf(isNumber, customMessages({'not-integer': 'Id not integer.'}, validateInteger)),
        ],
    }, {
        id: 'asdf',
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

test('Shows integer value as valid, when test is that it is numeric.', () => {
    expect.assertions(1)

    return validate([], {
        id: [
            onlyIf(isNumber, customMessages({'not-integer': 'Id not integer.'}, validateInteger)),
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

test('Runs validation on non-empty value, where the test is that it is not empty.', () => {
    expect.assertions(1)

    return validate([], {
        id: [
            onlyIf(notEmpty, customMessages({'not-integer': 'Id not integer.'}, validateInteger)),
        ],
    }, {
        id: 'asdf',
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

test('Does not run validation on empty value, where the test is that it is not empty.', () => {
    expect.assertions(1)

    return validate([], {
        id: [
            onlyIf(notEmpty, customMessages({'not-integer': 'Id not integer.'}, validateInteger)),
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
