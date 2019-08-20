import {map} from '@cullylarson/f'
import validateFloat from '../esm/validateFloat'

test('A float is valid.', () => {
    return Promise.all([
        validateFloat(1, {}),
        validateFloat(1000.134, {}),
        validateFloat(0.034, {}),
        validateFloat(-1, {}),
        validateFloat(-1000.23994, {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('A float string is valid.', () => {
    return Promise.all([
        validateFloat('1', {}),
        validateFloat('1000.34923', {}),
        validateFloat('0.202', {}),
        validateFloat('-1', {}),
        validateFloat('-1000.1329', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('A non-float string is not valid.', () => {
    return Promise.all([
        validateFloat('one', {}),
        validateFloat('foo', {}),
        validateFloat('', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-float').length).toBe(1)
        }))
})

test('A string starting with a number is not valid.', () => {
    return Promise.all([
        validateFloat('1 one', {}),
        validateFloat('3 foo', {}),
        validateFloat('4asdf', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-float').length).toBe(1)
        }))
})

test('An array is not valid.', () => {
    validateFloat([], {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-float').length).toBe(1)
        })
})

test('An object is not valid.', () => {
    validateFloat({}, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-float').length).toBe(1)
        })
})
