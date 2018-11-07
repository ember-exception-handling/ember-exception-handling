import { module, test } from 'ember-qunit';
import { resolve, reject } from 'rsvp';
import { PatternMatcher, retry } from 'ember-exception-handling';

module('Unit | Utility | exception-handling/utils/retry');

test('retry successfully with the promise returned from onRetry', async function(assert) {
  assert.expect(1);

  const error = new Error('test');

  const ret = await retry(error, {
    matcher(e) {
      return e && e.message === 'test';
    },

    onRetry() {
      return resolve('resolved');
    },
  });

  assert.equal(ret, 'resolved', 'The retry call resolved successfully');
});

test('retry successfully with the promise returned from onRetry as an argument passed to catch', async function(assert) {
  assert.expect(1);

  const ret = await reject(new Error('test')).catch(
    retry({
      matcher(e) {
        return e && e.message === 'test';
      },

      onRetry() {
        return resolve('resolved');
      },
    })
  );

  assert.equal(ret, 'resolved', 'Retry was successful');
});

test('retry works correctly when passed an instance of PatternMatcher', async function(assert) {
  assert.expect(1);

  const error = new Error('test');

  const ret = await retry(error, {
    matcher: new PatternMatcher(error, { message: 'test' }),

    onRetry() {
      return resolve('resolved');
    },
  });

  assert.equal(ret, 'resolved', 'The retry call resolved successfully');
});

test('retry successfully with the promise returned from onRetry as an argument passed to catch', async function(assert) {
  assert.expect(1);

  const error = new Error('test');

  const ret = await reject(error).catch(
    retry({
      matcher: { message: 'test' },

      onRetry() {
        return resolve('resolved');
      },
    })
  );

  assert.equal(ret, 'resolved', 'The retry call resolved successfully');
});

test('retry unsuccessfully and handle the error with the promise returned from onRetry', async function(assert) {
  assert.expect(2);

  const error = new Error('test');
  const retryError = new Error('test');

  assert.rejects(
    retry(error, {
      matcher(e) {
        return e && e.message === 'test';
      },

      onRetry() {
        return reject(retryError).catch(e => {
          assert.equal(e, retryError, 'rejects with the correct error');

          throw e;
        });
      },
    }),
    retryError,
    'rejects with the correct error'
  );
});

test('retry unsuccessfully and re-throw with the promise returned from onRetry', async function(assert) {
  assert.expect(1);

  const error = new Error('test');
  const rejectedError = new Error('rejected');

  try {
    await retry(error, {
      matcher(e) {
        return e && e.message === 'test';
      },

      onRetry() {
        return reject(rejectedError);
      },
    });
  } catch (e) {
    assert.equal(
      e,
      rejectedError,
      'Error from retry properly re-thrown if retry fails'
    );
  }
});

test('retry unsuccessfully and re-throw with the promise returned from onRetry as an argument passed to catch', async function(assert) {
  assert.expect(1);

  const error = new Error('test');
  const rejectedError = new Error('rejected');

  assert.rejects(
    reject(error).catch(
      retry({
        matcher: { message: 'test' },

        onRetry() {
          return reject(rejectedError);
        },
      })
    ),
    rejectedError,
    'Error from retry properly re-thrown if retry fails'
  );
});

test('re-throw the original error if the matcher does not match the expected pattern', async function(assert) {
  assert.expect(1);

  const error = new Error('test');

  try {
    await retry(error, {
      matcher: { message: 'bar' },

      onRetry() {
        return resolve('resolved');
      },
    });
  } catch (e) {
    assert.equal(e, error, 'The original error was properly re-thrown');
  }
});

test('re-throw the original error if the matcher does not match the expected pattern as an argument passed to catch', function(assert) {
  assert.expect(1);

  const error = new Error('test');

  assert.rejects(
    reject(error).catch(
      retry({
        matcher: { message: 'bar' },

        onRetry() {
          return resolve('resolved');
        },
      })
    ),
    error,
    'The original error was properly re-thrown'
  );
});
