// eslint-disable-next-line no-var
var groupBy = function (groupingFunction, arr) {
  const properties = new Set()
  const result = {}
  arr.forEach(item => properties.add(groupingFunction(item)))
  properties.forEach(property =>
    (result[property] = arr.filter(item =>
      Object.values(item).indexOf(property) !== -1)))
  return result
}

const students = [{
  name: 'Daniel Taskoff',
  course: 'Frontend JavaScript'
}, {
  name: 'Elena Jeleva',
  course: 'Programming 101'
}, {
  name: 'Luboslava Dimitrova',
  course: 'Frontend JavaScript'
}, {
  name: 'Anton Antonov',
  course: 'Core Java'
}, {
  name: 'Nikola Dichev',
  course: 'Core Java'
}]

console.log(groupBy(function (student) {
  return student.course
}, students))
