import validateNumberRange from '../esm/validateNumberRange'

test('Number below range is not valid', () => {
    expect.assertions(3)

    return validateNumberRange(7, 10, 6, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'out-of-range').length).toBe(1)
        })
})

test('Number above range is not valid', () => {
    expect.assertions(3)

    return validateNumberRange(7, 10, 11, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'out-of-range').length).toBe(1)
        })
})

test('Number equal to lower range is valid', () => {
    expect.assertions(2)

    return validateNumberRange(7, 10, 7, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Number equal to upper range is valid', () => {
    expect.assertions(2)

    return validateNumberRange(7, 10, 10, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Number in middle of range is valid', () => {
    expect.assertions(2)

    return validateNumberRange(7, 10, 8, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})
