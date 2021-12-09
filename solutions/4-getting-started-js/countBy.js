import { groupBy } from './groupBy.js'

var countBy = function (groupingFunction, arr) {
  return Object.entries(groupBy(groupingFunction, arr))
    .reduce((item, [key, val]) => {
      item[key] = val.length
      return item
    }, {})
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

console.log(countBy(function (student) {
  return student.course
}, students))
