const charsHistogram = function (str) {
  const regex = /\W/g
  const charArray = str.replace(regex, '').toLowerCase().split('')
  return charArray.reduce(function (histogram, char) {
    if (char in histogram) {
      histogram[char]++
    } else {
      histogram[char] = 1
    }
    return histogram
  }, {})
}

var str = 'Count the characters in this very profound sentence'
console.log(charsHistogram(str))
