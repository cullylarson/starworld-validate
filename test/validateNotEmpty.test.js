import validateNotEmpty from '../esm/validateNotEmpty'

test('Undefined is not valid.', () => {
    return validateNotEmpty(undefined, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('Empty string is not valid.', () => {
    return validateNotEmpty('', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('null is not valid.', () => {
    return validateNotEmpty(null, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('false is not valid.', () => {
    return validateNotEmpty(false, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('Zero is valid.', () => {
    return validateNotEmpty(0, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('String is valid.', () => {
    return validateNotEmpty('food', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Empty array is not valid.', () => {
    return validateNotEmpty([], {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('Array with values is not valid.', () => {
    return validateNotEmpty([1, 2, 'asdf'], {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})

test('Object with is not valid.', () => {
    return validateNotEmpty({}, {a: 'b'})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'is-empty').length).toBe(1)
        })
})
