# @cullylarson/validate

> A compossible validation library.

## Motivation

1. I like using error codes. It makes it easier to recognize a specific error if there are many, and to change the wording of an error message. All validators in `@cullylarson/validate` provide an error code and a default message. There are easy ways to provide custom messages.

1. I wanted something that's declarative, but also easy to extend without editing the library itself. The validation definition in `@cullylarson/validate` is a function composed of validators and other functions. Modifying functionality is as simple as creating new functions and adding them to the definition.

1. I wanted a validation result that could be used directly as the result of a REST API call. So validating the data provided to the call is as simple as running the validation function and returning the result if it isn't valid.

1. I wanted to be able to provide general errors–errors that pertain to the data as a whole (e.g. "Data must be provided in JSON format.")–as well as errors specific to parameters (e.g. "You must provide an email address"). This allows the consumer of an API to display general errors as well as display parameter errors next to the parameter itself (e.g. next to its input in a form).

1. I wanted a validator that can handle lists of data (e.g. an array of user IDs) as well as repeater fields, with sub-fields (e.g. a list of keywords with each keyword having a "label" and a "position" field–`{keywords: [ {label: "something", position: 100}, {label: "festival", 3} ]}`).

1. I wanted to be able to handle cases where data is only validated if it passes certain conditions (e.g. only validate if data is not empty).

1. I wanted to do all of this using functions that could be composed to easily extend the functionality of the library.

## Validators

A validator must return a Promise that resolves to an object with these parameters:

- **isValid** (_boolean_) Whether the data is valid.
- **messages** (_array_) An array of error messages (empty if isValid is true). Each message is itself an object with these parameters
    - **code** (_string_) An error code. The convension I've been using is all lower case, with dash spacing. Make it human readable and reasonably description, even if it's a bit long. Changing this code should be considered a breaking change. (_example: not-url_)
    - **message** (_string_) A default error message. Even though the message can be changed by consumers, try to make this something that people won't want/need to change. Something that could be displayed directly to users. (_example: "Please provide a valid URL."_)

TODO -- document the exceptions e.g. `validateObjectList` and `validateList`

## Example

This example covers all use-cases for the library.

```js
const validateUser = validate([
    validateNoDuplicates(pool, 'users', 'id', id, { email: 'email' }),
], {
    id: [validateNotEmpty, validateInteger],
    name: [validateNotEmpty],
    email: [
        customMessage({'is-empty', 'You must provide an email address.'}, validateNotEmpty),
        validateEmail,
    ],
    description: [],
    keywords: [validateObjectList({
        keyword: [validateNotEmpty],
        position: [validateNotEmpty, validateInteger],
    })],
    url: [
        onlyIf(notEmpty, validateUrl),
    ],
    startDate: [
        validateNotEmpty,
        validateDate(dateToComponents),
        validateDateIsBefore(dateToComponents, 'endDate'),
    ],
    endDate: [
        validateNotEmpty,
        validateDate(dateToComponents),
        validateDateIsAfter(dateToComponents, 'startDate'),
    ],
    friendIds: [validateListAsOne([
        customMessages({'not-found': 'One of the friends you have selected could not be found.'}, validateMustExist(pool, 'friends', 'id')),
        customMessages({'has-duplicates': 'One friend has been selected twice.'}, validateNoListDuplicates),
    ])],
    projectIds: [validateList([validateNotEmpty, validateMustExist(pool, 'projects', 'id')])],
})
```
