import validatePhone from '../esm/validatePhone'

test('Valid phone number passes, with extra characters', () => {
    expect.assertions(2)

    return validatePhone(7)('908-3333', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Valid phone number passes, without extra characters', () => {
    expect.assertions(2)

    return validatePhone(7)('9083333', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Phone number longer than needed passes.', () => {
    expect.assertions(2)

    return validatePhone(7)('5419081234', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Phone number longer than needed passes, with extra characters.', () => {
    expect.assertions(2)

    return validatePhone(7)('(541) 908-3333', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Length is good, but not enough numbers.', () => {
    expect.assertions(3)

    return validatePhone(7)('(90) 8-333', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})

test('Longer phone number is not valid because not enough numbers.', () => {
    expect.assertions(3)

    return validatePhone(10)('(90) 888-333', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})
