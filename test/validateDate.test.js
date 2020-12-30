import {isString} from '@cullylarson/f'
import validateDate from '../esm/validateDate'

const toComponents = x => {
    if(!isString(x)) return null

    const bits = x.split('-')
    if(bits.length !== 3) return null

    return {
        day: bits[2],
        month: bits[1],
        year: bits[0],
    }
}

test('String date is valid.', () => {
    expect.assertions(2)

    return validateDate(toComponents, '2019-04-02', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('String date is not valid.', () => {
    expect.assertions(3)

    return validateDate(toComponents, '2019-04-32', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-date').length).toBe(1)
        })
})

test('Date with two digit year is not valid.', () => {
    expect.assertions(3)

    return validateDate(toComponents, '19-4-2', {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-date').length).toBe(1)
        })
})

test('Date with one digit month and day is valid.', () => {
    expect.assertions(2)

    return validateDate(toComponents, '2019-4-2', {})
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})
