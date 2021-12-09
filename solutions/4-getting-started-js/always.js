// eslint-disable-next-line no-var
var always = function (value) {
  return function () {
    return value
  }
}

const f = always(5)
console.log(f()) // 5
