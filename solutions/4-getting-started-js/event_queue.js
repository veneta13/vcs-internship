var queue = (function () {
  const data = {}
  const publicMethods = {}

  publicMethods.on = function (eventName, callback) {
    if (eventName in data) {
      data[eventName].push(callback)
    } else {
      data[eventName] = [callback]
    }
  }

  publicMethods.remove = function (eventName) {
    data.remove(eventName)
  }

  publicMethods.trigger = function (eventName) {
    while (data[eventName].length !== 0) {
      (data[eventName].shift())()
    }
  }

  return publicMethods
})()

queue.on('PANIC_EVENT', function () {
  console.log('PANIC_EVENT HAPPENED!')
})

queue.on('PANIC_EVENT', function () {
  console.log('PANIC_EVENT HAPPENED AGAIN!')
})

queue.trigger('PANIC_EVENT')
