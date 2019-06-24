import { module, test } from 'ember-qunit';
import { curryRight } from 'ember-exception-handling/-internal/curry-utils';

module('Unit | Utility | exception-handling/-internal/curry-utils', function() {
  test('curryRight should work as expected', function(assert) {
    assert.expect(10);

    const add = (a, b, c) => {
      return a + b + c;
    };

    const subtract = (a, b, c) => {
      return c - b - a;
    };

    const curriedAdd = curryRight(add);
    const curriedSubtract = curryRight(subtract);

    assert.equal(add(1, 2, 3), curriedAdd(3)(2)(1));
    assert.equal(curriedAdd(3)(2)(1), 6);
    assert.equal(curriedAdd(3)(1, 2), 6);
    assert.equal(curriedAdd(2, 3)(1), 6);
    assert.equal(curriedAdd(1, 2, 3), 6);

    assert.equal(subtract(1, 2, 6), curriedSubtract(6)(2)(1));
    assert.equal(curriedSubtract(6)(2)(1), 3);
    assert.equal(curriedSubtract(1, 2, 6), 3);
    assert.equal(curriedSubtract(2, 6)(1), 3);
    assert.equal(curriedSubtract(6)(1, 2), 3);
  });
});
