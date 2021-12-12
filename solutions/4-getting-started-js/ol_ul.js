var ul = function (items) {
  let result = ''
  result += '<ul>\n'
  result += items.map(element => '<li>' + element.label + '</li>').join('\n')
  result += '\n</ul>'
  return result
}

var ol = function (items) {
  let result = ''
  result += '<ol>\n'
  result += items.map(element => '<li>' + element.label + '</li>').join('\n')
  result += '\n</ol>'
  return result
}

var items = [{ label: 'Item 1' }, { label: 'Item 2' }]
console.log(ol(items))
console.log(ul(items))
