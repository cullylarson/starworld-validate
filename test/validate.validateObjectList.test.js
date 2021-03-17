import {validate, validateObjectList, customMessages} from '../esm/'
import validateNotEmpty from '../esm/validateNotEmpty'
import validateInteger from '../esm/validateInteger'

test('Validates items with array of values', () => {
    expect.assertions(1)

    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        keywords: [validateObjectList({
            keyword: [customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty)],
            position: [customMessages({'not-integer': 'Id not integer.'}, validateInteger)],
        })],
    }, {
        keywords: [
            {
                keyword: '',
                position: 'asdf',
            },
            {
                keyword: 'foo',
                position: 20,
            },
            {
                keyword: 'something',
                position: 'ramble',
            },
        ],
    })
        .then(result => {
            expect(result).toEqual({
                isValid: false,
                errors: [],
                paramErrors: {
                    id: [{code: 'is-empty', message: 'Id is empty.'}],
                    keywords: [
                        {
                            keyword: [{code: 'is-empty', message: 'Id is empty.'}],
                            position: [{code: 'not-integer', message: 'Id not integer.'}],
                        },
                        {
                            keyword: [],
                            position: [],
                        },
                        {
                            keyword: [],
                            position: [{code: 'not-integer', message: 'Id not integer.'}],
                        },
                    ],
                },
            })
        })
})

test('Shows as valid on array of values', () => {
    expect.assertions(1)

    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        keywords: [validateObjectList({
            keyword: [customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty)],
            position: [customMessages({'not-integer': 'Id not integer.'}, validateInteger)],
        })],
    }, {
        id: 20,
        keywords: [
            {
                keyword: 'foo',
                position: 20,
            },
            {
                keyword: 'foo',
                position: 20,
            },
            {
                keyword: 'foo',
                position: 20,
            },
        ],
    })
        .then(result => {
            expect(result).toEqual({
                isValid: true,
                errors: [],
                paramErrors: {
                    id: [],
                    keywords: [
                        {
                            keyword: [],
                            position: [],
                        },
                        {
                            keyword: [],
                            position: [],
                        },
                        {
                            keyword: [],
                            position: [],
                        },
                    ],
                },
            })
        })
})

test('Works if an item is missing.', () => {
    expect.assertions(1)

    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        keywords: [validateObjectList({
            keyword: [customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty)],
            position: [customMessages({'not-integer': 'Id not integer.'}, validateInteger)],
        })],
    }, {
        keywords: [
            {
                position: 'asdf',
            },
            {
                keyword: 'foo',
                position: 20,
            },
            {
                keyword: 'something',
                position: 'ramble',
            },
        ],
    })
        .then(result => {
            expect(result).toEqual({
                isValid: false,
                errors: [],
                paramErrors: {
                    id: [{code: 'is-empty', message: 'Id is empty.'}],
                    keywords: [
                        {
                            keyword: [{code: 'is-empty', message: 'Id is empty.'}],
                            position: [{code: 'not-integer', message: 'Id not integer.'}],
                        },
                        {
                            keyword: [],
                            position: [],
                        },
                        {
                            keyword: [],
                            position: [{code: 'not-integer', message: 'Id not integer.'}],
                        },
                    ],
                },
            })
        })
})

test('Works on an object instead of an array.', () => {
    expect.assertions(1)

    return validate([], {
        id: [
            customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty),
            customMessages({'not-integer': 'Id not integer.'}, validateInteger),
        ],
        keywords: validateObjectList({
            keyword: [customMessages({'is-empty': 'Id is empty.'}, validateNotEmpty)],
            position: [customMessages({'not-integer': 'Id not integer.'}, validateInteger)],
        }),
    }, {
        id: 20,
        keywords: {
            123: {
                keyword: '',
                position: 'asdf',
            },
            456: {
                keyword: 'foo',
                position: 20,
            },
            789: {
                keyword: 'foo',
                position: 'rabble',
            },
        },
    })
        .then(result => {
            expect(result).toEqual({
                isValid: false,
                errors: [],
                paramErrors: {
                    id: [],
                    keywords: {
                        123: {
                            keyword: [{code: 'is-empty', message: 'Id is empty.'}],
                            position: [{code: 'not-integer', message: 'Id not integer.'}],
                        },
                        456: {
                            keyword: [],
                            position: [],
                        },
                        789: {
                            keyword: [],
                            position: [{code: 'not-integer', message: 'Id not integer.'}],
                        },
                    },
                },
            })
        })
})
