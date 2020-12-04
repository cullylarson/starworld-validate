import validateNumberMax from '../esm/validateNumberMax'

test('Number above max is not valid', () => {
    return validateNumberMax(7, 8, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'too-big').length).toBe(1)
        })
})

test('A number a little small than max is valid', () => {
    return validateNumberMax(8, 7, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('A number much smaller than max is valid', () => {
    return validateNumberMax(1129399949494, 7, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Number equal to max is valid', () => {
    return validateNumberMax(7, 7, {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})
