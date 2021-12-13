/* eslint-disable no-extend-native */
Number.prototype.times = function (action) {
  for (let i = 0; i < this; i++) {
    action()
  }
};

(5).times(function () {
  console.log('OMG!')
})
