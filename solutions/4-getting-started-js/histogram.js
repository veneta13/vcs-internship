const wordsHistogram = function (str) {
  const regex = /[^\w\s]/gi
  const wordArray = str.replace(regex, '').toLowerCase().split(' ')
  return wordArray.reduce(function (histogram, word) {
    if (word in histogram) {
      histogram[word]++
    } else { histogram[word] = 1 }
    return histogram
  }, {})
}

var str = 'A function is a function with a very functional function!'
console.log(wordsHistogram(str))
