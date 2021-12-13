/* eslint-disable no-extend-native */
Object.defineProperty(String.prototype, 'capitalize', {
  value () {
    return this.toUpperCase()
  }
})

Object.defineProperty(String.prototype, 'dasherize', {
  value () {
    return this.replaceAll('_', '-')
  }
})

Object.defineProperty(String.prototype, 'times', {
  value (times) {
    return Array(times).fill(this).join(' ')
  }
})

Object.defineProperty(String.prototype, 'blank', {
  value () {
    return this === '' || !this.replace(/\s/g, '').length
  }
})

console.log('javascript'.capitalize())
console.log('border_bottom_width'.dasherize())
console.log('bobi'.times(5))
console.log(' '.blank())
