var zip = function () {
  const args = [].slice.call(arguments)
  const arrLength = args.reduce((arr1, arr2) =>
    arr1.length > arr2.length
      ? arr1
      : arr2, [])
  return arrLength.map((_, index) =>
    args.map(array => array[index]))
}

console.log(zip([1, 2, 3], [4, 5, 6]))
// [ [1, 4], [2, 5], [3, 6] ]

console.log(zip([1, 2, 3], [4, 5, 6], [7, 8, 9]))
// [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
