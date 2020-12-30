import validateNotEmpty from '../esm/validateNotEmpty'

test('Undefined is not valid.', () => {
    expect.assertions(3)

    return validateNotEmpty(undefined, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('Empty string is not valid.', () => {
    expect.assertions(3)

    return validateNotEmpty('', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('null is not valid.', () => {
    expect.assertions(3)

    return validateNotEmpty(null, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('false is not valid.', () => {
    expect.assertions(3)

    return validateNotEmpty(false, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('Zero is valid.', () => {
    expect.assertions(2)

    return validateNotEmpty(0, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('String is valid.', () => {
    expect.assertions(2)

    return validateNotEmpty('food', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Empty array is not valid.', () => {
    expect.assertions(3)

    return validateNotEmpty([], {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('Array with values is not valid.', () => {
    expect.assertions(3)

    return validateNotEmpty([1, 2, 'asdf'], {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('Object with is not valid.', () => {
    expect.assertions(3)

    return validateNotEmpty({}, {a: 'b'})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})
