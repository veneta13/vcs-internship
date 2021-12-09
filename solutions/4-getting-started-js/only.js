/* eslint-disable valid-typeof */
// eslint-disable-next-line no-var
var only = function (type, arr) {
  return (arr.filter(item => (typeof item) === type)).length === arr.length
}

console.log(only('string', [1, 2, 3, 4])) // false
console.log(only('number', [1, 2, 3, 4])) // true
