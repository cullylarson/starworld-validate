import validateEmailWithName from '../esm/validateEmailWithName'

test('Email address with name is valid.', () => {
    return validateEmailWithName('My Name <me@example.com>', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Email address with name and no lt/gt around email is not valid.', () => {
    return validateEmailWithName('My Name me@example.com', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})

test('Just an email address is invalid.', () => {
    return validateEmailWithName('me@example.com', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})
