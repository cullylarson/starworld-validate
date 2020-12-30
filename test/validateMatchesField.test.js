import validateMatchesField from '../esm/validateMatchesField'

test('Does match and is valid.', () => {
    expect.assertions(2)

    return validateMatchesField('spice', 'Spice', 'food', {spice: 'food'})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Empty string is valid if it matches.', () => {
    expect.assertions(2)

    return validateMatchesField('spice', 'Spice', '', {spice: ''})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Does not match and is not valid.', () => {
    expect.assertions(3)

    return validateMatchesField('spice', 'Spice', 'food', {spice: 'heron'})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'no-match').length).toBe(1)
        })
})

test('Missing field is not valid.', () => {
    expect.assertions(3)

    return validateMatchesField('spice', 'Spice', '', {apes: 'are smart'})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'no-match').length).toBe(1)
        })
})
