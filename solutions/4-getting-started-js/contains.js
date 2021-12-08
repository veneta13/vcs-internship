// eslint-disable-next-line no-var
var contains = function (element, arr) {
  return arr.find(item => item === element) !== undefined
}

console.log(contains(1, [1, 2, 3]))
