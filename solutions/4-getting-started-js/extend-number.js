/* eslint-disable no-extend-native */
Number.prototype.times = function (action) {
  (function call (func, count, max) {
    func()
    if (count < max) {
      call(func, count + 1, max)
    }
  })(action, 1, this)
};

(5).times(function () {
  console.log('OMG!')
})
