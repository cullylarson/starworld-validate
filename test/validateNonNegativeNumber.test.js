import {map} from '@cullylarson/f'
import validateNonNegativeNumber from '../esm/validateNonNegativeNumber'

test('Positive numbers, is valid.', () => {
    expect.assertions(2 * 2)

    return Promise.all([
        validateNonNegativeNumber(1, {}),
        validateNonNegativeNumber(1000, {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('Positive numbers as strings, is valid.', () => {
    expect.assertions(2 * 2)

    return Promise.all([
        validateNonNegativeNumber('1', {}),
        validateNonNegativeNumber('1000', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('Zero is valid.', () => {
    expect.assertions(2)

    validateNonNegativeNumber(0, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Zero as string is valid.', () => {
    expect.assertions(2)

    validateNonNegativeNumber('0', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Negative number is not valid.', () => {
    expect.assertions(3 * 2)

    return Promise.all([
        validateNonNegativeNumber(-1, {}),
        validateNonNegativeNumber(-10000, {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-negative').length).toBe(1)
        }))
})

test('Negative numbers as strings are not valid.', () => {
    expect.assertions(3 * 2)

    return Promise.all([
        validateNonNegativeNumber('-1', {}),
        validateNonNegativeNumber('-10000', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-negative').length).toBe(1)
        }))
})

test("A non-integer string is valid (because the validator doesn't verify numeric values).", () => {
    expect.assertions(2 * 2)

    return Promise.all([
        validateNonNegativeNumber('one', {}),
        validateNonNegativeNumber('foo', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})
