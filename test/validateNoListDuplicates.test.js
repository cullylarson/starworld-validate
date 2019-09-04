import {map} from '@cullylarson/f'
import validateNoListDuplicates from '../esm/validateNoListDuplicates'

test('No duplicates, is valid.', () => {
    return Promise.all([
        validateNoListDuplicates([1, 2, 'food', 'props', 1000], {}),
        validateNoListDuplicates(['hype', {hey: 'there'}, {hey: 'you'}, [1], [2]], {}),
        validateNoListDuplicates(['baskets', [1, 2], [1, 3]], {}),
        validateNoListDuplicates(['parade', {a: {b: 'c'}}, {a: {b: 'c', d: 'e'}}], {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('No duplicates when values are objects, is valid.', () => {
    return validateNoListDuplicates([{a: 'AAA', b: 'BBB'}], {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Has duplicates, not valid.', () => {
    return Promise.all([
        validateNoListDuplicates([1, 1, 'food', 'props', 1000], {}),
        validateNoListDuplicates(['hype', {hey: 'there'}, {hey: 'there'}], {}),
        validateNoListDuplicates(['hype', [1], [1], [2]], {}),
        validateNoListDuplicates(['baskets', [1, 2], [1, 2]], {}),
        validateNoListDuplicates(['parade', {a: {b: 'c', d: 'e'}}, {a: {b: 'c', d: 'e'}}], {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'has-duplicates').length).toBe(1)
        }))
})

test.only('Has duplicates when values are objects, not valid.', () => {
    return Promise.all([
        validateNoListDuplicates([{a: 'AAA', b: 'BBB'}, {a: 'AAA', b: 'BBB'}], {}),
        validateNoListDuplicates([{a: 'AAA', b: 'BBB'}, {b: 'BBB', a: 'AAA'}], {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'has-duplicates').length).toBe(1)
        }))
})
