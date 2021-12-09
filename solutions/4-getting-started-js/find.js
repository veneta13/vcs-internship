var find = function (predicate, arr) {
  return arr.find(predicate)
}

function isNumber (x) {
  return typeof x === 'number'
}

console.log(find(isNumber, ['1', '5']))
