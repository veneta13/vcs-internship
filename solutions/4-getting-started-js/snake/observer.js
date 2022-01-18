/* eslint-disable no-unused-vars */
/* eslint-disable semi */

class EventObserver {
  constructor () {
    this.events = [];
  }

  subscribe = function (name, callback) {
    this.events.push(
      {
        name,
        func: callback
      });
  }

  unsubscribe = function (event) {
    this.events = this.events.filter(element => {
      if (element.name !== event) {
        return true;
      } else {
        return false;
      }
    })
  }

  fire = function (eventName, ...args) {
    this.events.forEach(event => {
      if (event.name === eventName) {
        event.func(args);
      }
    })
  }
}

const eventObserver = new EventObserver();
