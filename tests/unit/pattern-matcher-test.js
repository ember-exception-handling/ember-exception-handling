import { module, test } from 'ember-qunit';
import { A } from '@ember/array';
import PatternMatcher from 'exception-handling/utils/pattern-matcher';

module('Unit | Utility | exception-handling/utils/pattern-matcher');

const TEST_MESSAGE = 'Test message';

test('pattern matcher should return true for a callback function', function(assert) {
  assert.expect(1);

  const error = new Error(TEST_MESSAGE);
  const matcher = new PatternMatcher(error, function(errorToMatch) {
    return errorToMatch && errorToMatch.message === TEST_MESSAGE;
  });

  assert.equal(matcher.match(), true, 'Pattern was matched successfully');
});

test('pattern matcher should return false for a callback function', function(assert) {
  assert.expect(1);

  const error = new Error(TEST_MESSAGE);
  const matcher = new PatternMatcher(error, function(errorToMatch) {
    return errorToMatch && errorToMatch.message !== TEST_MESSAGE;
  });

  assert.equal(matcher.match(), false, 'Pattern was not matched');
});

test('pattern matcher should return true for an object string match', function(assert) {
  assert.expect(1);

  const error = new Error(TEST_MESSAGE);
  const matcher = new PatternMatcher(error, { message: TEST_MESSAGE });

  assert.equal(matcher.match(), true, 'Pattern was matched');
});

test('pattern matcher should return true for an object string match on an array', function(assert) {
  assert.expect(1);

  const error = new Error(TEST_MESSAGE);
  const matcher = new PatternMatcher(
    {
      test: A([error]),
    },
    { 'test.firstObject.message': TEST_MESSAGE }
  );

  assert.equal(matcher.match(), true, 'Pattern was matched');
});

test('pattern matcher should return false for an object string match', function(assert) {
  assert.expect(1);

  const error = new Error(TEST_MESSAGE);
  const matcher = new PatternMatcher(error, { message: 'test' });

  assert.equal(matcher.match(), false, 'Pattern was not matched');
});

test('pattern matcher should return true for an object string match if all props match', function(assert) {
  assert.expect(1);

  const matcher = new PatternMatcher(
    {
      foo: 'bar',

      test: {
        test: 'test',
      },
    },
    { foo: 'bar', 'test.test': 'test' }
  );

  assert.equal(matcher.match(), true, 'Pattern was matched');
});

test('pattern matcher should return false for an object string match if all props do not match', function(assert) {
  assert.expect(1);

  const matcher = new PatternMatcher(
    {
      foo: 'bar',

      test: {
        test: 'test',
      },
    },
    { foo: 'bar', 'test.test': 'bar' }
  );

  assert.equal(matcher.match(), false, 'Pattern was not matched');
});

test('pattern matcher should return true for an object RegExp match', function(assert) {
  assert.expect(1);

  const error = new Error(TEST_MESSAGE);
  const matcher = new PatternMatcher(error, { message: /message$/ });

  assert.equal(matcher.match(), true, 'Pattern was matched');
});

test('pattern matcher should return false for an object RegExp match', function(assert) {
  assert.expect(1);

  const error = new Error(TEST_MESSAGE);
  const matcher = new PatternMatcher(error, { message: /^message/ });

  assert.equal(matcher.match(), false, 'Pattern was not matched');
});

test('pattern matcher should return true if all props match', function(assert) {
  assert.expect(1);

  const matcher = new PatternMatcher(
    {
      foo: 'bar',

      test: {
        test: 'test',
      },
    },
    { foo: 'bar', 'test.test': /tes/ }
  );

  assert.equal(matcher.match(), true, 'Pattern was matched');
});

test('pattern matcher should return false if all props do not match', function(assert) {
  assert.expect(1);

  const matcher = new PatternMatcher(
    {
      foo: 'bar',

      test: {
        test: 'test',
      },
    },
    { foo: 'bar', 'test.test': /tes$/ }
  );

  assert.equal(matcher.match(), false, 'Pattern was not matched');
});

test('pattern matcher should throw if an unsupported handler is provided', function(assert) {
  assert.expect(1);
  assert.throws(
    () => new PatternMatcher({}, /test/),
    new Error('The handler must be either a function or an object'),
    'The expected error is thrown'
  );
});

test('pattern matcher should throw if an unsupported handler is provided', function(assert) {
  assert.expect(1);
  assert.throws(
    () => new PatternMatcher({}),
    new Error('The handler must be either a function or an object'),
    'The expected error is thrown'
  );
});

test('pattern matcher should throw if an unsupported handler is provided', function(assert) {
  assert.expect(1);
  assert.throws(
    () => new PatternMatcher({}, null),
    new Error('The handler must be either a function or an object'),
    'The expected error is thrown'
  );
});
