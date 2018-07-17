import curryRight from 'lodash/curryRight';
import PatternMatcher from './pattern-matcher';

/**
 * A utility function for retry logic related to exception handling
 *
 * @name retry
 * @param {Object} error The error object
 * @param {Object} retryHandler The retry handler
 */
function retry(error, { matcher, onRetry }) {
  const patternMatcher =
    matcher instanceof PatternMatcher
      ? matcher
      : new PatternMatcher(error, matcher);

  if (patternMatcher.match()) {
    return onRetry();
  }

  throw error;
}

export default curryRight(retry);
