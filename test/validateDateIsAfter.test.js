import {isString, map} from '@cullylarson/f'
import validateDateIsAfter from '../esm/validateDateIsAfter'

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

test('Is after other date and shows as valid.', () => {
    return Promise.all([
        validateDateIsAfter(toComponents, 'other', false, false, '2019-04-02', {other: '2019-04-01'}),
        validateDateIsAfter(toComponents, 'other', false, false, '2019-04-02', {other: '2018-04-01'}),
        validateDateIsAfter(toComponents, 'other', false, false, '2019-04-02', {other: '2019-03-30'}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('Is not after other date and shows as not valid.', () => {
    return Promise.all([
        validateDateIsAfter(toComponents, 'other', false, false, '2019-04-02', {other: '2019-04-03'}),
        validateDateIsAfter(toComponents, 'other', false, false, '2019-04-02', {other: '2020-04-01'}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-after').length).toBe(1)
        }))
})

test('Same as other date and shows as not valid.', () => {
    return Promise.all([
        validateDateIsAfter(toComponents, 'other', false, false, '2019-04-02', {other: '2019-04-02'}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-after').length).toBe(1)
        }))
})

test('Same as other date and shows as valid because of flag allowing it.', () => {
    return Promise.all([
        validateDateIsAfter(toComponents, 'other', false, true, '2019-04-02', {other: '2019-04-02'}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})

test('Other value is empty and shows as not valid.', () => {
    return Promise.all([
        validateDateIsAfter(toComponents, 'other', false, false, '2019-04-02', {other: ''}),
        validateDateIsAfter(toComponents, 'other', false, false, '2009-01-01', {other: ''}),
        validateDateIsAfter(toComponents, 'other', false, false, '1999-12-31', {other: ''}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(false)
            expect(x.messages.length).toBe(1)
            expect(x.messages.filter(x => x.code === 'not-after').length).toBe(1)
        }))
})

test('Other value is empty and shows as valid because of flag indicating should only check if other value is provided.', () => {
    return Promise.all([
        validateDateIsAfter(toComponents, 'other', true, false, '2019-04-02', {other: ''}),
        validateDateIsAfter(toComponents, 'other', true, false, '2009-01-01', {other: ''}),
        validateDateIsAfter(toComponents, 'other', true, false, '1999-12-31', {other: ''}),
    ])
        .then(map(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        }))
})
