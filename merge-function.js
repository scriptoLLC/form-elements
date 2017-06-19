module.exports = function merge (...funcs) {
  return function (...args) {
    for (let i = 0, len = funcs.length; i < len; i++) {
      funcs[i].call(funcs[i], ...args)
    }
  }
}
