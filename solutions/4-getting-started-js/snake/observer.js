function EventObserver () {
  this.observers = []
}

EventObserver.prototype = {
  subscribe: function (observer) {
    this.observers.push(observer)
  },
  unsubscribe: function (observer) {
    this.observers = this.observers.filter(element => {
      if (element !== observer) {
        return true
      } else {
        return false
      }
    })
  },
  fire: function () {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}
