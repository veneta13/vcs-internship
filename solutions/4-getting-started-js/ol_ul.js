var ul = function (items) {
  let result = ''
  result += '<ul>\n'
  result += items.map(element => {
    if (!('children' in element)) {
      return '<li>' + element.label + '</li>'
    } else {
      return '<li>' + element.label + ul(element.children) + '</li>'
    }
  }).join('\n')
  result += '\n</ul>'
  return result
}

var ol = function (items) {
  let result = ''
  result += '<ol>\n'
  result += items.map(element => {
    if (!('children' in element)) {
      return '<li>' + element.label + '</li>'
    } else {
      return '<li>' + element.label + ol(element.children) + '</li>'
    }
  }).join('\n')
  result += '\n</ol>'
  return result
}

var items = [{ label: 'Item 1' },
  {
    label: 'Item 2',
    children: [
      {
        label: 'Level 2 of Item 2'
      },
      {
        label: 'Another level 2'
      }
    ]
  }]

console.log(ol(items))
console.log(ul(items))
