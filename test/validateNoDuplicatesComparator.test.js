import {map} from '@cullylarson/f'
import validateNoDuplicatesComparator from '../esm/validateNoDuplicatesComparator'

test('No duplicates, is valid.', () => {
    expect.assertions(2 * 2)

    const comparator = (x, y) => x === y

    return Promise.all([
        validateNoDuplicatesComparator(comparator, [1, 2, 3, '2'], {}),
        validateNoDuplicatesComparator(comparator, ['hype', 'baskets', 'stuff'], {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('No duplicates using non-strict comparison, is valid.', () => {
    expect.assertions(2 * 2)

    const comparator = (x, y) => x == y // eslint-disable-line eqeqeq

    return Promise.all([
        validateNoDuplicatesComparator(comparator, [1, 2, 3], {}),
        validateNoDuplicatesComparator(comparator, ['hype', 'baskets', 'stuff'], {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('Has duplicates, not valid.', () => {
    expect.assertions(3 * 2)

    const comparator = (x, y) => x === y

    return Promise.all([
        validateNoDuplicatesComparator(comparator, [1, 2, 3, 2], {}),
        validateNoDuplicatesComparator(comparator, ['hype', 'baskets', 'stuff', 'hype'], {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'has-duplicates').length).toBe(1)
        }))
})

test('Has duplicates using non-strict comparison, not valid.', () => {
    expect.assertions(3)

    const comparator = (x, y) => x == y // eslint-disable-line eqeqeq

    return Promise.all([
        validateNoDuplicatesComparator(comparator, [1, 2, 3, '2'], {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'has-duplicates').length).toBe(1)
        }))
})
