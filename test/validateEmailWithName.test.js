import validateEmailWithName from '../esm/validateEmailWithName'

test('Email address with name is valid.', () => {
    expect.assertions(2)

    return validateEmailWithName('My Name <me@example.com>', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Email address with name and no lt/gt around email is not valid.', () => {
    expect.assertions(3)

    return validateEmailWithName('My Name me@example.com', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})

test('Just an email address is invalid.', () => {
    expect.assertions(3)

    return validateEmailWithName('me@example.com', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})
