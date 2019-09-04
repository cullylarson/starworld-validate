import validateAtLeastOneMatches from '../esm/validateAtLeastOneMatches'

test('Array with one value matching is valid.', () => {
    return validateAtLeastOneMatches(x => x === 2, [1, 2, 3], {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Empty array is not valid.', () => {
    return validateAtLeastOneMatches(x => x === 2, [], {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.filter(x => x.code === 'no-match').length).toBe(1)
        })
})

test('Array with no matching values is not valid.', () => {
    return validateAtLeastOneMatches(x => x === 2, [3, 4, 5], {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.filter(x => x.code === 'no-match').length).toBe(1)
        })
})
