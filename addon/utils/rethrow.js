import curryRight from 'lodash/curryRight';
import PatternMatcher from './pattern-matcher';

/**
 * A utility function for catching / handling errors based upon
 * a particular pattern
 *
 * @name rethrow
 * @param {Object} error The error object
 * @param {Object} rethrowHandler The rethrow handler
 */
function rethrow(error, { matcher, onMatch }) {
  const patternMatcher =
    matcher instanceof PatternMatcher
      ? matcher
      : new PatternMatcher(error, matcher);

  if (patternMatcher.match() && typeof onMatch === 'function') {
    return onMatch(error);
  }

  throw error;
}

export default curryRight(rethrow);
