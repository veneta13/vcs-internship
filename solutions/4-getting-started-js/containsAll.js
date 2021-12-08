/* eslint-disable no-var */
var containsAll = function (elements, arr) {
  return elements.every(element => arr.find(item => item === element))
}

console.log(containsAll([4, 2, 3], [1, 2, 4, 3, 5]))
