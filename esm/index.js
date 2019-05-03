import {curry, compose, filter, map, reduce, get, liftA, isString, isNumeric} from '@cullylarson/f'
import {then, pAll} from '@cullylarson/p'

export function messageObj(code, message) {
    return {
        code,
        message,
    }
}

export const validateOne = curry((params, validators, paramName) => {
    return validators
        // some validators might be null if set conditionally
        .filter(x => !!x)
        .reduce((accP, f) => {
            return accP.then(acc => {
                // if validator fails, don't continue validating
                if(acc.foundError) return Promise.resolve(acc)

                return f(get(paramName, undefined, params), params, paramName)
                    .then(result => {
                        return result.isValid
                            ? {foundError: false, results: liftA(result.messages)}
                            : {foundError: true, results: [...acc.results, ...liftA(result.messages)]}
                    })
            })
        }, Promise.resolve({foundError: false, results: []}))
})

// export so the same standard of 'empty' can be used externally
// doesn't work on arrays or objects (will always show them as empty, even if not)
export const isEmpty = x => x === '' || x === undefined || x === null || x === false || (!isString(x) && !isNumeric(x))

// if x is non-empty, then assume it's an invalid result message(s)
export const simpleValidationResult = x => x
    ? { isValid: false, messages: liftA(x) }
    : { isValid: true, messages: [] }

export const validate = curry((generalValidators, paramValidators, params) => {
    const hasParamErrors = reduce((acc, x) => acc || x.foundError, false)
    const flattenOnce = xs => [].concat.apply([], xs)

    // all of the general validators will run, even if one fails
    const generalErrorsP = compose(
        then(flattenOnce), // each validator returns an array, so need to flatten to get an array of messages instead of an array of arrays
        then(map(get('messages', []))),
        then(filter(x => !x.isValid)),
        xs => Promise.all(xs),
        map(f => f(params, params, undefined)),
        // some validators might be null if set conditionally
        filter(x => !!x)
    )(generalValidators)

    const paramErrorsP = compose(
        pAll,
        map(validateOne(params))
    )(paramValidators)

    return compose(
        then(([generalErrors, paramErrorResults]) => {
            return {
                isValid: !(generalErrors.length || hasParamErrors(paramErrorResults)),
                errors: generalErrors,
                paramErrors: map(get('results', []), paramErrorResults),
            }
        }),
        pAll
    )([generalErrorsP, paramErrorsP])
})

// performs validation on a list of items
export const validateList = curry((validators, values, params, paramName) => {
    return compose(
        then(x => {
            return {
                isValid: x.filter(x => x.foundError).length === 0,
                messages: map(get('results', []), x),
            }
        }),
        pAll,
        map((_, k) => validateOne(params, validators, [...liftA(paramName), k])),
        liftA
    )(values)
})

// performs validation on a list of items that each has its own set of parameters
export const validateObjectList = curry((validators, values, params, paramName) => {
    return compose(
        then(x => {
            return {
                isValid: x.filter(x => !x.isValid).length === 0,
                messages: map(get('paramErrors', []), x),
            }
        }),
        pAll,
        map((itemValues) => validate([], validators, itemValues))
    )(values)
})

// runs validators on each item in a list, but halts on first error, and returns a validation result
// as though this was one item and not a list.
export const validateListAsOne = curry((validators, values, params, paramName) => {
    // if the value is empty
    return compose(
        then(x => {
            return {
                isValid: !x.foundError,
                messages: x.results,
            }
        }),
        reduce((acc, _, k) => {
            return acc.then(x => {
                // valid so far
                return x.foundError === false
                    ? validateOne(params, validators, [...liftA(paramName), k])
                    : x
            })
        }, Promise.resolve({foundError: false, results: []})),
        liftA
    )(values)
})

// will only run the wrapped validator if the value is not empty (as determined by isEmpty)
export const onlyNotEmpty = (validator) => {
    // returns a validator that wraps the provided validator
    return curry((value, params, paramName) => {
        return isEmpty(value)
            // is empty, so we shouldn't validate it. return valid because we don't want to indicate that this is invalid
            ? Promise.resolve(simpleValidationResult())
            // not empty, continue validating
            : validator(value, params, paramName)
    })
}

export const customMessages = curry((customMessages, validator) => {
    // returns a validator that wraps the provided validator
    return curry((value, params, paramName) => {
        return validator(value, params, paramName)
            .then(result => {
                const mapOne = message => {
                    return customMessages[message.code]
                        ? messageObj(message.code, customMessages[message.code])
                        : message
                }

                return result.isValid
                    ? result
                    : Array.isArray(result.messages)
                        ? {...result, messages: map(mapOne, result.messages)}
                        : {...result, messages: mapOne(result.messages)}
            })
    })
})
