import validateEmailList from '../esm/validateEmailList'

test('One email address is valid.', () => {
    return validateEmailList('test@example.com', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Multiple email addresses are valid.', () => {
    return validateEmailList('  test@example.com, another@example.com,   more@example.com  ', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Multiple email addresses with some empty values are valid.', () => {
    return validateEmailList('  test@example.com   ,  , another@example.com,   ,   more@example.com  ', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Multipe email addresses with one not valid.', () => {
    return validateEmailList('test@xample.com, a@a, anothher@example.com', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})
