/* eslint-disable no-var */
var containsAll = function (elements, arr) {
  const mappedArray = elements.map(element => arr.find(item => item === element))
  return JSON.stringify(mappedArray) === JSON.stringify(elements)
}

console.log(containsAll([4, 2, 3], [1, 2, 4, 3, 5]))
