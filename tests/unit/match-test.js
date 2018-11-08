import { module, test } from 'ember-qunit';
import { reject } from 'rsvp';
import { PatternMatcher, match } from 'ember-exception-handling';

module('Unit | Utility | exception-handling/utils/match');

test('should not throw if the pattern matches', function(assert) {
  assert.expect(1);

  const error = new Error('test');

  match(error, {
    matcher: { message: 'test' },
    onMatch(e) {
      assert.equal(e, error, 'The error was handled properly');
    },
  });
});

test('should throw if the pattern does not match', function(assert) {
  assert.expect(1);

  const error = new Error('test');

  assert.throws(() => {
    match(error, { matcher: { message: 'bar' }, onMatch() {} });
  });
});

test('should not match if the pattern matches when passed as an argument to catch', async function(assert) {
  assert.expect(2);

  const error = new Error('test');

  const ret = await reject(error).catch(
    match({
      matcher(e) {
        return e && e.message === 'test';
      },

      onMatch(e) {
        assert.equal(e, error, 'The error is properly handled');
        return [];
      },
    })
  );

  assert.deepEqual(ret, [], 'The error is properly handled');
});

test('should match if the pattern does not match when passed as an argument to catch', function(assert) {
  assert.expect(1);

  const error = new Error('test');

  assert.rejects(
    reject(error).catch(
      match({
        matcher: { message: 'bar' },
        onMatch() {},
      })
    ),
    error,
    'The original error is re-thrown'
  );
});

test('should accept an instance of PatternMatcher', function(assert) {
  assert.expect(1);

  const error = new Error('test');

  assert.throws(() => {
    match(error, {
      matcher: new PatternMatcher(error, { message: 'bar' }),
      onMatch() {},
    });
  });
});

test('should accept an instance of PatternMatcher', function(assert) {
  assert.expect(1);

  const error = new Error('test');

  assert.rejects(
    reject(error).catch(
      match({
        matcher: new PatternMatcher(error, { message: 'bar' }),
        onMatch() {},
      })
    ),
    error,
    'The original error is re-thrown'
  );
});
