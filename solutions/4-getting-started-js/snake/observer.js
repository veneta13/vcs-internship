/* eslint-disable no-unused-vars */
/* eslint-disable semi */

class EventObserver {
  constructor () {
    this.observers = [];
  }

  subscribe = function (observer) {
    this.observers.push(observer);
  }

  unsubscribe = function (observer) {
    this.observers = this.observers.filter(element => {
      if (element !== observer) {
        return true;
      } else {
        return false;
      }
    })
  }

  fire = function () {
    this.observers.forEach(observer => {
      observer.update();
    })
  }
}

class DirectionObserver extends EventObserver {
  fire = data => {
    this.observers.forEach(observer => {
      observer.changeDirection(data);
    })
  }
}

class CollisionObserver extends EventObserver {
  fire = (...data) => {
    this.observers.forEach(observer => {
      observer.collisionUpdate(data);
    })
  }
}
