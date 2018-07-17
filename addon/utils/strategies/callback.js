import { typeOf } from '@ember/utils';

export class CallbackStrategy {
  constructor(error, handler) {
    this.error = error;
    this.handler = handler;
  }

  match() {
    return typeOf(this.handler) === 'function' && this.handler(this.error);
  }
}
