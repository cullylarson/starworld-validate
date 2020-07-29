import validateEmail from '../esm/validateEmail'

test('Example email address is valid.', () => {
    return validateEmail('test@example.com', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Super simple email is valid.', () => {
    return validateEmail('a@a.a', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Top-level domain missing, not valid.', () => {
    return validateEmail('a@a', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})

test('Name before the @ missing, not valid.', () => {
    return validateEmail('@a.a', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})

test('Domain missing, not valid.', () => {
    return validateEmail('a@.a', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})
