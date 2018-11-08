# ember-exception-handling

![Build status](https://travis-ci.org/brendenpalmer/ember-exception-handling.svg?branch=master 'Build status')

This addon provides utilities related to exception handling for Ember applications.

## Installation

```
ember install ember-exception-handling
```

## Usage

Some example usages are listed below:

```js
import PatternMatcher from 'exception-handling/utils/pattern-matcher';

const error = new Error('test');
const matcher = new PatternMatcher(error, function(errorToMatch) {
  return errorToMatch && errorToMatch.message === 'test';
});

const isMatch = matcher.match(); // true
```

```js
import PatternMatcher from 'exception-handling/utils/pattern-matcher';

const error = new Error('test');
const matcher = new PatternMatcher(error, { message: 'test' });
});

const isMatch = matcher.match(); // true
```

```js
import rethrow from 'exception-handling/utils/rethrow';

getResource().catch(
  // will re-throw if matcher does not match the error object
  rethrow({
    matcher: { message: 'test' },

    onMatch(e) {
      return [];
    },
  })
);
```

```js
import retry from 'exception-handling/utils/retry';
import { resolve } from 'rsvp';

getResource().catch(
  // will retry if matcher matches the error object and re-throw otherwise
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

- `git clone https://github.com/brendenpalmer/ember-exception-handling.git`
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
