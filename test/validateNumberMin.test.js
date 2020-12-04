import validateNumberMin from '../esm/validateNumberMin'

test('Number below min is not valid', () => {
    return validateNumberMin(7, 6, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-small').length).toBe(1)
        })
})

test('A number a little bigger than min is valid', () => {
    return validateNumberMin(7, 8, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('A number much bigger than min is valid', () => {
    return validateNumberMin(7, 1129399949494, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Number equal to min is valid', () => {
    return validateNumberMin(7, 7, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})
