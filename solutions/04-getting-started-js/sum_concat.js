function sum(a, b) {
  if (typeof a == 'number' && typeof b == 'number') {
    return a + b;
  } else throw new TypeError('Error: arguments of sum should be numbers.');
}

function concat(a, b) {
  if (typeof a == 'string' && typeof b == 'string') {
    return a + b;
  } else throw new TypeError('Error: arguments of concat should be string.');
}
