import {map} from '@cullylarson/f'
import validateBoolean from '../esm/validateBoolean'

test('True and false are valid.', () => {
    expect.assertions(2 * 2)

    return Promise.all([
        validateBoolean(true, {}),
        validateBoolean(false, {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('A variety of other types are not valid.', () => {
    expect.assertions(3 * 9)

    return Promise.all([
        validateBoolean('true', {}),
        validateBoolean('false', {}),
        validateBoolean('asdf', {}),
        validateBoolean(1, {}),
        validateBoolean(0, {}),
        validateBoolean(1.234, {}),
        validateBoolean(0.234, {}),
        validateBoolean(null, {}),
        validateBoolean(undefined, {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-boolean').length).toBe(1)
        }))
})
