import validateLength from '../esm/validateLength'

test('String at short end of range is valid.', () => {
    expect.assertions(2)

    return validateLength(4, 10, 'food', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('String at long end of range is valid.', () => {
    expect.assertions(2)

    return validateLength(4, 10, 'foodfoodfo', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('String in middle of range is valid.', () => {
    expect.assertions(2)

    return validateLength(4, 10, 'foodfood', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Too-long string is not valid.', () => {
    expect.assertions(3)

    return validateLength(3, 5, 'overrated', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-long').length).toBe(1)
        })
})

test('Too-short string is not valid.', () => {
    expect.assertions(3)

    return validateLength(3, 5, 'ov', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-short').length).toBe(1)
        })
})

test('Integer is valid.', () => {
    expect.assertions(2)

    return validateLength(3, 10, 12345, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Too-long integer is not valid.', () => {
    expect.assertions(3)

    return validateLength(3, 5, 123456, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-long').length).toBe(1)
        })
})

test('Too-short integer is not valid.', () => {
    expect.assertions(3)

    return validateLength(3, 5, 12, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-short').length).toBe(1)
        })
})

test('Float is valid.', () => {
    expect.assertions(2)

    return validateLength(3, 8, 12.345, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Too-long float is not valid.', () => {
    expect.assertions(3)

    return validateLength(3, 5, 12.3456, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-long').length).toBe(1)
        })
})

test('Too-short float is not valid.', () => {
    expect.assertions(3)

    return validateLength(5, 8, 1.2, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-short').length).toBe(1)
        })
})

test('Float is not valid because it includes the decimal when testing length.', () => {
    expect.assertions(3)

    return validateLength(3, 5, 12.345, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-long').length).toBe(1)
        })
})

test('Float is valid when length includes the decimal and puts it right at the limit.', () => {
    expect.assertions(2)

    return validateLength(3, 6, 12.345, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})
