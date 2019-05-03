import {map} from '@cullylarson/f'
import validateUrl from '../esm/validateUrl'

test('Url is valid.', () => {
    return Promise.all([
        validateUrl('http://example.com', {}),
        validateUrl('http://www.example.com', {}),
        validateUrl('http://www.example.com/something', {}),
        validateUrl('https://example.com', {}),
        validateUrl('https://www.example.com', {}),
        validateUrl('https://www.example.com/something', {}),
        validateUrl('https://www.example.com/something/else', {}),
        validateUrl('https://www.example.com/something/else?fun=forever', {}),
        validateUrl('https://example', {}),
        validateUrl('https://.com', {}),
        validateUrl('https://..com', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('Url is not valid.', () => {
    return Promise.all([
        validateUrl('://example.com', {}),
        validateUrl('example.com', {}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-url').length).toBe(1)
        }))
})
