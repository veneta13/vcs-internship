/* eslint-disable no-unused-vars */
class Pizza {
  constructor (name, cost, timeToMake) {
    this.name = name
    this.cost = cost
    this.timeToMake = timeToMake
  }
}

class PizzaOrder {
  #id
  #callback

  constructor (pizza) {
    this.pizza = pizza
    this.#id = PizzaOrder.generateId
  }

  getId () {
    return this.#id
  }

  static get generateId () {
    PizzaOrder.counter = (PizzaOrder.counter || 0) + 1
    return PizzaOrder.counter
  }

  start () {
    setTimeout(() =>
      this.#callback(this.pizza, this),
    this.pizza.timeToMake)
  }

  ready (callback) {
    this.#callback = callback
  }
}

class Pizzeria {
  constructor () {
    this.profit = 0
  }

  async run () {
    this.profit += await this.executeOrder()
    this.run()
  }

  createPizza () {
    const pizzaType = ['Pineapple', 'Peperoni', 'Salami']
    const pizza = new Pizza(
      pizzaType[Math.floor(Math.random() * pizzaType.length)],
      Math.random() * 180 + 20,
      Math.random() * 3000 + 1000
    )
    return pizza
  }

  createOrder () {
    const pizza = this.createPizza()
    const order = new PizzaOrder(pizza)
    order.ready(function () {
      console.log('The ' + pizza.name + ' pizza is ready.')
    })
    return order
  }

  executeOrder () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const order = this.createOrder()
        order.start()
        resolve(order.pizza.cost)
        reject(new Error())
      }, 4000)
    })
  }
}

const pizzeria = new Pizzeria()
pizzeria.run()
