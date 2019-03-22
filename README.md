# ember-exception-handling

![Build status](https://travis-ci.com/ember-exception-handling/ember-exception-handling.svg?branch=master 'Build status')

This addon provides utilities related to exception handling for Ember applications.

## Installation

```
ember install ember-exception-handling
```

## Usage

While some errors in JavaScript applications are typed, and specific types of `Error`s can be evaluated for,
most errors are simply utilizing the `Error` class. As such, the same exception handling semantics aren't as
readily available to JavaScript engineers.

While the above is true, it's still possible to make use of patterns that help evaluate whether a certain kind
of error has been throw. To do this, we employ _pattern matching_, which allows us flexibility to introspect
errors and error properties to determine how to handle each exception.

This addon comes with a few useful types and utilities.

### `PatterMatcher` Class

`PatternMatcher` is a class used to specify an error pattern to match. The `PatternMatcher` constructor takes the following forms:

#### `constructor(error, Function)`

```js
import PatternMatcher from 'exception-handling/utils/pattern-matcher';

const error = new Error('test');
const matcher = new PatternMatcher(error, function(errorToMatch) {
  return errorToMatch && errorToMatch.message === 'test';
});

const isMatch = matcher.match(); // true
```

#### `constructor(error, Object);`

```js
import PatternMatcher from 'exception-handling/utils/pattern-matcher';

const error = new Error('test');
const matcher = new PatternMatcher(error, { message: 'test' });
});

const isMatch = matcher.match(); // true
```

### `match` Utility

TL;DR use when you want to match certain patterns within an error, and rethrow anything
not matched.

```js
import match from 'exception-handling/utils/match';

getResource().catch(
  match({
    matcher: { message: 'test' },

    onMatch(e) {
      return [];
    },
  })
);
```

### `retry` Utility

TL;DR use when you want to retry if a certain pattern is matched, and rethrow anything not matched.

```js
import retry from 'exception-handling/utils/retry';
import { resolve } from 'rsvp';

getResource().catch(
  retry({
    matcher: { message: 'test' },

    onRetry() {
      return resolve('resolved');
    },
  })
);
```

## Contributing

### Installation

- `git clone https://github.com/ember-exception-handling/ember-exception-handling.git`
- `cd ember-exception-handling`
- `npm install`

### Linting

- `npm run lint:hbs`
- `npm run lint:js`
- `npm run lint:js -- --fix`

### Running tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

- `ember serve`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

This project is licensed under the [MIT License](LICENSE).
