/* eslint-disable no-var */

import { groupBy } from './groupBy.js'

var countBy = function (groupingFunction, arr) {
  const result = {}
  for (const [key, value] of Object.entries(groupBy(groupingFunction, arr))) {
    result[key] = value.length
  }
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

console.log(countBy(function (student) {
  return student.course
}, students))
