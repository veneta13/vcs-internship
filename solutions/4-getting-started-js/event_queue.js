var queue = (function () {
  const callbacks = {}
  const publicMethods = {}

  publicMethods.on = function (eventName, callback) {
    if (eventName in callbacks) {
      callbacks[eventName].push(callback)
    } else {
      callbacks[eventName] = [callback]
    }
  }

  publicMethods.remove = function (eventName) {
    callbacks.remove(eventName)
  }

  publicMethods.trigger = function (eventName) {
    callbacks[eventName].forEach(callback => {
      callback()
    })
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
queue.trigger('PANIC_EVENT')
