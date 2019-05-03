import {map} from '@cullylarson/f'
import validateMatchesRegex from '../esm/validateMatchesRegex'

test('Matches is valid.', () => {
    return Promise.all([
        validateMatchesRegex(/^asdf$/, 'asdf', {}),
        validateMatchesRegex(/asdf$/, 'food-asdf', {}),
        validateMatchesRegex(/^[0-9]+$/, '123456', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('Does not match, is not valid.', () => {
    return Promise.all([
        validateMatchesRegex(/^asdf$/, 'asdff', {}),
        validateMatchesRegex(/asdf$/, 'food-asdff', {}),
        validateMatchesRegex(/^[0-9]+$/, '12a3456', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'no-match').length).toBe(1)
        }))
})

test('Array value is not valid.', () => {
    validateMatchesRegex(/^asdf$/, [], {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'no-match').length).toBe(1)
        })
})

test('Object value is not valid.', () => {
    validateMatchesRegex(/^asdf$/, {}, {})
        .then(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'no-match').length).toBe(1)
        })
})
