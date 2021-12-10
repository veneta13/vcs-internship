var pluck = function (property, arr) {
  return arr.map(item => item[property])
}

var students = [{
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

console.log(pluck('name', students))
// ["Daniel Taskoff", "Elena Jeleva", "Luboslava Dimitrova", "Anton Antonov", "Nikola Dichev"]
