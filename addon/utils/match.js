import curryRight from 'lodash/curryRight';
import PatternMatcher from './pattern-matcher';

/**
 * A utility function for catching / handling errors based upon
 * a particular pattern
 *
 * @name match
 * @param {Object} error The error object
 * @param {Object} matchHandler The match handler
 */
function match(error, { matcher, onMatch }) {
  const patternMatcher =
    matcher instanceof PatternMatcher
      ? matcher
      : new PatternMatcher(error, matcher);

  if (patternMatcher.match() && typeof onMatch === 'function') {
    return onMatch(error);
  }

  throw error;
}

export default curryRight(match);
