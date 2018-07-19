import { typeOf } from '@ember/utils';
import { get } from '@ember/object';

export class ObjectStrategy {
  constructor(error, handler) {
    this.error = error;
    this.handler = handler;
  }

  match() {
    return (
      typeOf(this.handler) === 'object' &&
      Object.keys(this.handler).reduce((isMatch, key) => {
        const item = get(this.error, key);
        const value = this.handler[key];
        const isCurrentMatch =
          typeOf(value) === 'regexp' ? value.test(item) : item === value;
        return isMatch && isCurrentMatch;
      }, true)
    );
  }
}
