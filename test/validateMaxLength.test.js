import validateMaxLength from '../esm/validateMaxLength'

test('Short string is valid.', () => {
    expect.assertions(2)

    return validateMaxLength(10, 'food', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Empty string is valid.', () => {
    expect.assertions(2)

    return validateMaxLength(10, '', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('String right at max length is valid.', () => {
    expect.assertions(2)

    return validateMaxLength(4, 'food', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Long string is not valid.', () => {
    expect.assertions(3)

    return validateMaxLength(5, 'overrated', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-long').length).toBe(1)
        })
})

test('Short integer is valid.', () => {
    expect.assertions(2)

    return validateMaxLength(10, 12345, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Long integer is not valid.', () => {
    expect.assertions(3)

    return validateMaxLength(5, 123456, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-long').length).toBe(1)
        })
})

test('Short float is valid.', () => {
    expect.assertions(2)

    return validateMaxLength(10, 12.345, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Float is valid right at max length.', () => {
    expect.assertions(2)

    return validateMaxLength(6, 12.345, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Long float is not valid.', () => {
    expect.assertions(3)

    return validateMaxLength(5, 12.3456, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-long').length).toBe(1)
        })
})

test('Long float is not valid, with the decimal just pushing it over the limit.', () => {
    expect.assertions(3)

    return validateMaxLength(5, 12.345, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-long').length).toBe(1)
        })
})
