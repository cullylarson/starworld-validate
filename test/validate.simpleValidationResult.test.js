import {simpleValidationResult} from '../esm/'

test('Result without messages or paramErrors is valid.', () => {
    expect(simpleValidationResult()).toEqual({
        isValid: true,
        messages: [],
    })
})

test('Result with messages is invalid and contains messages.', () => {
    const expectedResult = {
        isValid: false,
        messages: ['foo'],
    }

    expect(simpleValidationResult('foo')).toEqual(expectedResult)
    expect(simpleValidationResult(['foo'])).toEqual(expectedResult)
})
