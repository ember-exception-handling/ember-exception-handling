/**
 * A simple curry right function, curries a function with
 * args applied from the right
 *
 * @name curryRight
 * @param {Function} fn The function to curry
 * @param {number} [len] The number of arguments the
 * function accepts, defaults to fn.length
 */
export function curryRight(fn, len = fn.length) {
  return (...outerArgs) => {
    const allArgs = [];

    const buildArgsOrInvokeFn = (...args) => {
      allArgs.unshift(...args);

      if (allArgs.length >= len) {
        return fn(...allArgs);
      }

      return buildArgsOrInvokeFn;
    };

    return buildArgsOrInvokeFn(...outerArgs);
  };
}
