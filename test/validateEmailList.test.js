import validateEmailList from '../esm/validateEmailList'

test('One email address is valid.', () => {
    expect.assertions(2)

    return validateEmailList('test@example.com', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Empty string is valid.', () => {
    expect.assertions(2)

    return validateEmailList('', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Multiple email addresses are valid.', () => {
    expect.assertions(2)

    return validateEmailList('  test@example.com, another@example.com,   more@example.com  ', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Multiple email addresses with some empty values are valid.', () => {
    expect.assertions(2)

    return validateEmailList('  test@example.com   ,  , another@example.com,   ,   more@example.com  ', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Multipe email addresses with one not valid.', () => {
    expect.assertions(3)

    return validateEmailList('test@xample.com, a@a, anothher@example.com', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})

test('All empty values is not valid.', () => {
    expect.assertions(3)

    return validateEmailList(', ,', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})
