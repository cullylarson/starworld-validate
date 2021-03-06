import validateArrayNotEmpty from '../esm/validateArrayNotEmpty'

test('Shows an array with values as valid.', () => {
    expect.assertions(2)

    return validateArrayNotEmpty([1, 2, 3], {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Shows an empty array is not valid.', () => {
    expect.assertions(2)

    return validateArrayNotEmpty([], {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('Shows a non-array string is not valid.', () => {
    expect.assertions(2)

    return validateArrayNotEmpty('foo', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('Shows a non-array integer is not valid.', () => {
    expect.assertions(2)

    return validateArrayNotEmpty(123, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})
