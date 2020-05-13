import {map} from '@cullylarson/f'
import validateIncludes from '../esm/validateIncludes'

test('Valid when value is in array.', () => {
    return Promise.all([
        validateIncludes(['asdf', 'foods', 'hoops'], 'foods', {}),
        validateIncludes([null, 'asdf'], null, {}),
        validateIncludes([true, false, 'asdf'], false, {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('Invalid when value is not in array.', () => {
    return Promise.all([
        validateIncludes(['asdf', 'foods', 'hoops'], 'joy', {}),
        validateIncludes([null, 'asdf'], 'hoops', {}),
        validateIncludes([false, 'asdf'], true, {}),
        validateIncludes([], 'asdf', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-listed').length).toBe(1)
        }))
})
