// eslint-disable-next-line no-var
var contains = function (element, arr) {
  return Boolean(arr.find(item => item === element))
}

console.log(contains(1, [1, 2, 3]))
