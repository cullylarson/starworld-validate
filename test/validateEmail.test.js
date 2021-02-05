import validateEmail from '../esm/validateEmail'

test('Example email address is valid.', () => {
    expect.assertions(2)

    return validateEmail('test@example.com', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Super simple email is valid.', () => {
    expect.assertions(2)

    return validateEmail('a@a.a', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Top-level domain missing, not valid.', () => {
    expect.assertions(3)

    return validateEmail('a@a', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})

test('Name before the @ missing, not valid.', () => {
    expect.assertions(3)

    return validateEmail('@a.a', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})

test('Domain missing, not valid.', () => {
    expect.assertions(3)

    return validateEmail('a@.a', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})

test('Whitespace in address, not valid.', () => {
    expect.assertions(15)

    return Promise.all([
        validateEmail('aaa aaa@example.com', {})
            .then(x => {
                expect(x.isValid).toBe(false)
                expect(x.messages.length).toBe(1)
                expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
            }),
        validateEmail(' aaaaaa@example.com', {})
            .then(x => {
                expect(x.isValid).toBe(false)
                expect(x.messages.length).toBe(1)
                expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
            }),
        validateEmail('aaaaaa@ex ample.com', {})
            .then(x => {
                expect(x.isValid).toBe(false)
                expect(x.messages.length).toBe(1)
                expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
            }),
        validateEmail('aaaaaa@example.c om', {})
            .then(x => {
                expect(x.isValid).toBe(false)
                expect(x.messages.length).toBe(1)
                expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
            }),
        validateEmail('aaaaaa@example.com ', {})
            .then(x => {
                expect(x.isValid).toBe(false)
                expect(x.messages.length).toBe(1)
                expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
            }),
    ])
})

test('More than one @ symbol, not valid.', () => {
    expect.assertions(15)

    return Promise.all([
        validateEmail('aaa@aaa@example.com', {})
            .then(x => {
                expect(x.isValid).toBe(false)
                expect(x.messages.length).toBe(1)
                expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
            }),
        validateEmail('aaaaaa@exa@mple.com', {})
            .then(x => {
                expect(x.isValid).toBe(false)
                expect(x.messages.length).toBe(1)
                expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
            }),
        validateEmail('aaaaaa@example.c@om', {})
            .then(x => {
                expect(x.isValid).toBe(false)
                expect(x.messages.length).toBe(1)
                expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
            }),
        validateEmail('@aaaaaa@example.com', {})
            .then(x => {
                expect(x.isValid).toBe(false)
                expect(x.messages.length).toBe(1)
                expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
            }),
        validateEmail('aaaaaa@example.com@', {})
            .then(x => {
                expect(x.isValid).toBe(false)
                expect(x.messages.length).toBe(1)
                expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
            }),
    ])
})
