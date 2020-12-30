import {map} from '@cullylarson/f'
import validateInteger from '../esm/validateInteger'

test('An integer is valid.', () => {
    expect.assertions(2 * 5)

    return Promise.all([
        validateInteger(1, {}),
        validateInteger(1000, {}),
        validateInteger(0, {}),
        validateInteger(-1, {}),
        validateInteger(-1000, {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('An integer string is valid.', () => {
    expect.assertions(2 * 5)

    return Promise.all([
        validateInteger('1', {}),
        validateInteger('1000', {}),
        validateInteger('0', {}),
        validateInteger('-1', {}),
        validateInteger('-1000', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('A non-integer string is not valid.', () => {
    expect.assertions(3 * 3)

    return Promise.all([
        validateInteger('one', {}),
        validateInteger('foo', {}),
        validateInteger('', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-integer').length).toBe(1)
        }))
})

test('A string starting with a number is not valid.', () => {
    expect.assertions(3 * 3)

    return Promise.all([
        validateInteger('1 one', {}),
        validateInteger('3 foo', {}),
        validateInteger('4asdf', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-integer').length).toBe(1)
        }))
})

test('An array is not valid.', () => {
    expect.assertions(3)

    validateInteger([], {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-integer').length).toBe(1)
        })
})

test('An object is not valid.', () => {
    expect.assertions(3)

    validateInteger({}, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-integer').length).toBe(1)
        })
})
