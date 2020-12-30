import {validate, customMessages, validateObject, validateObjectList} from '../esm/'
import validateNotEmpty from '../esm/validateNotEmpty'
import validateInteger from '../esm/validateInteger'

test('Does simple validation', () => {
    expect.assertions(1)

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
    expect.assertions(1)

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
    expect.assertions(1)

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

test('Shows valid data as valid when using validateObject.', () => {
    expect.assertions(1)

    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        name: [customMessages({'is-empty': 'Name is empty.'}, validateNotEmpty)],
        extras: validateObject({
            keyword: [customMessages({'is-empty': 'Keyword is empty.'}, validateNotEmpty)],
            order: [customMessages({'is-empty': 'Order is empty.'}, validateNotEmpty)],
        }),
    }, {
        id: 123,
        name: 'Someone',
        extras: {
            keyword: 'asdf',
            order: 10,
        },
    })
        .then(result => {
            expect(result).toEqual({
                isValid: true,
                errors: [],
                paramErrors: {
                    id: [],
                    name: [],
                    extras: {
                        keyword: [],
                        order: [],
                    },
                },
            })
        })
})

test('Shows valid data as valid when using validateObjectList.', () => {
    expect.assertions(1)

    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        name: [customMessages({'is-empty': 'Name is empty.'}, validateNotEmpty)],
        keywords: [
            validateObjectList({
                keyword: [customMessages({'is-empty': 'Keyword is empty.'}, validateNotEmpty)],
                order: [customMessages({'is-empty': 'Order is empty.'}, validateNotEmpty)],
            }),
        ],
    }, {
        id: 123,
        name: 'Someone',
        keywords: [{
            keyword: 'asdf',
            order: 10,
        }],
    })
        .then(result => {
            expect(result).toEqual({
                isValid: true,
                errors: [],
                paramErrors: {
                    id: [],
                    name: [],
                    keywords: [{
                        keyword: [],
                        order: [],
                    }],
                },
            })
        })
})

test.only('Shows valid data as valid when using custom frankenstein validator.', () => {
    expect.assertions(1)

    const validateKeyword = (value, params, paramName) => {
        const validators = [
            customMessages({'is-empty': 'Keyword is empty.'}, validateNotEmpty),
        ]

        return validate([], {[paramName]: validators}, params)
            .then(result => {
                return {
                    isValid: result.isValid,
                    messages: result.paramErrors[paramName],
                }
            })
    }

    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        name: [customMessages({'is-empty': 'Name is empty.'}, validateNotEmpty)],
        // intentially not setting as an array
        keyword: validateKeyword,
    }, {
        id: 123,
        name: 'Someone',
        keyword: 'asdf',
    })
        .then(result => {
            expect(result).toEqual({
                isValid: true,
                errors: [],
                paramErrors: {
                    id: [],
                    name: [],
                    keyword: [],
                },
            })
        })
})
