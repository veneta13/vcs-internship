var without = function (exclude, arr) {
  exclude.forEach(excItem => {
    arr = arr.filter(arrItem => excItem !== arrItem)
  })
  return arr
}

console.log(without([5, 6], [1, 2, 3, 4, 5, 6])) // [1,2,3,4]
