import validateMinLength from '../esm/validateMinLength'

test('Long string is valid.', () => {
    return validateMinLength(3, 'food', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Empty string is not valid.', () => {
    return validateMinLength(1, '', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-short').length).toBe(1)
        })
})

test('String right at min length is valid.', () => {
    return validateMinLength(4, 'food', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Short string is not valid.', () => {
    return validateMinLength(10, 'overrated', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-short').length).toBe(1)
        })
})

test('Long integer is valid.', () => {
    return validateMinLength(4, 12345, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Short integer is not valid.', () => {
    return validateMinLength(7, 123456, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-short').length).toBe(1)
        })
})

test('Long float is valid.', () => {
    return validateMinLength(4, 12.345, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Float is valid right at min length.', () => {
    return validateMinLength(6, 12.345, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Short float is not valid.', () => {
    return validateMinLength(8, 12.3456, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-short').length).toBe(1)
        })
})
