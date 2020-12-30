import {map} from '@cullylarson/f'
import validateDollars from '../esm/validateDollars'

test('A float dollar amount is valid.', () => {
    expect.assertions(2 * 5)

    return Promise.all([
        validateDollars({allowZero: true, allowNegative: true}, 1, {}),
        validateDollars({allowZero: true, allowNegative: true}, 1000.13, {}),
        validateDollars({allowZero: true, allowNegative: true}, 0.03, {}),
        validateDollars({allowZero: true, allowNegative: true}, -1, {}),
        validateDollars({allowZero: true, allowNegative: true}, -1000.23, {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('A float string dollar amount is valid.', () => {
    expect.assertions(2 * 5)

    return Promise.all([
        validateDollars({allowZero: true, allowNegative: true}, '1', {}),
        validateDollars({allowZero: true, allowNegative: true}, '1000.34', {}),
        validateDollars({allowZero: true, allowNegative: true}, '0.20', {}),
        validateDollars({allowZero: true, allowNegative: true}, '-1', {}),
        validateDollars({allowZero: true, allowNegative: true}, '-1000.13', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('A float with too many decimal places is not valid.', () => {
    expect.assertions(3 * 5)

    return Promise.all([
        validateDollars({allowZero: true, allowNegative: true}, 1000.124, {}),
        validateDollars({allowZero: true, allowNegative: true}, 0.034, {}),
        validateDollars({allowZero: true, allowNegative: true}, '34.788', {}),
        validateDollars({allowZero: true, allowNegative: true}, '.777', {}),
        validateDollars({allowZero: true, allowNegative: true}, -1000.23994, {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-dollars').length).toBe(1)
        }))
})

test('Zero is not valid when not allowed.', () => {
    expect.assertions(3 * 2)

    return Promise.all([
        validateDollars({allowZero: false, allowNegative: true}, 0, {}),
        validateDollars({allowZero: false, allowNegative: true}, '0', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-zero').length).toBe(1)
        }))
})

test('Negative is invalid when not allowed.', () => {
    expect.assertions(3 * 5)

    return Promise.all([
        validateDollars({allowZero: true, allowNegative: false}, -1, {}),
        validateDollars({allowZero: true, allowNegative: false}, '-1', {}),
        validateDollars({allowZero: true, allowNegative: false}, -78.02, {}),
        validateDollars({allowZero: true, allowNegative: false}, '-88.88', {}),
        validateDollars({allowZero: true, allowNegative: false}, -0.01, {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-negative').length).toBe(1)
        }))
})

test('A non-float string is not valid.', () => {
    expect.assertions(3 * 3)

    return Promise.all([
        validateDollars({allowZero: true, allowNegative: true}, 'one', {}),
        validateDollars({allowZero: true, allowNegative: true}, 'foo', {}),
        validateDollars({allowZero: true, allowNegative: true}, '', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-dollars').length).toBe(1)
        }))
})

test('A string starting with a number is not valid.', () => {
    expect.assertions(3 * 3)

    return Promise.all([
        validateDollars({allowZero: true, allowNegative: true}, '1 one', {}),
        validateDollars({allowZero: true, allowNegative: true}, '3 foo', {}),
        validateDollars({allowZero: true, allowNegative: true}, '4asdf', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-dollars').length).toBe(1)
        }))
})

test('An array is not valid.', () => {
    expect.assertions(3)

    validateDollars({allowZero: true, allowNegative: true}, [], {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-dollars').length).toBe(1)
        })
})

test('An object is not valid.', () => {
    validateDollars({allowZero: true, allowNegative: true}, {}, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-dollars').length).toBe(1)
        })
})
