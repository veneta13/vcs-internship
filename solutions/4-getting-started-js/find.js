var find = function (predicate, arr) {
  return arr.find(item => predicate(item))
}

function isNumber (x) {
  return typeof x === 'number'
}

console.log(find(isNumber, ['1', '5']))
