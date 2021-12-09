// eslint-disable-next-line no-var
var groupBy = function (groupingFunction, arr) {
  return arr.reduce((result, item) => {
    const value = item[Object.keys(item).find(key => item[key] === groupingFunction(item))]
    result[value] = (result[value] || []).concat(item)
    return result
  }, {})
}

export { groupBy }
