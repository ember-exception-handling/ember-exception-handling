import { typeOf } from '@ember/utils';
import { CallbackStrategy } from './strategies/callback';
import { ObjectStrategy } from './strategies/object';

function getStrategy(error, handler) {
  switch (typeOf(handler)) {
    case 'function':
      return new CallbackStrategy(error, handler);
    case 'object':
      return new ObjectStrategy(error, handler);
    default:
      throw new Error('The handler must be either a function or an object');
  }
}

/**
 * A simple pattern matcher - can be used on its own or in conjunction
 * with the match utility / retry utility
 */
export default class PatternMatcher {
  constructor(error, handler) {
    this.error = error;
    this.handler = handler;
    this.strategy = getStrategy(error, handler);
  }

  setError(error) {
    this.error = error;
    this.strategy = getStrategy(error, this.handler);
  }

  match(error) {
    if (error) {
      this.setError(error);
    }

    return this.strategy.match();
  }
}
