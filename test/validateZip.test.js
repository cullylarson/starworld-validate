import validateZip from '../esm/validateZip'

test('Valid zip code passes, with extra characters', () => {
    expect.assertions(2)

    return validateZip([5])('97333-', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Valid zip code passes, without extra characters', () => {
    expect.assertions(2)

    return validateZip([5])('97330', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Zip code longer than specified does not pass.', () => {
    expect.assertions(3)

    return validateZip([5])('123456', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})

test('Length is good, but not enough digits.', () => {
    expect.assertions(3)

    return validateZip([5])('9)8-3', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-valid').length).toBe(1)
        })
})

test('Providing multiple lengths works.', () => {
    expect.assertions(2)

    return validateZip([5, 9])('99999-1234', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})
