const applyOpts = require('./element-helper')
const html = require('bel')
const noop = () => {}

module.exports = input

function input (type, handler, value, inputOpts) {
  var classes = ['w-100', 'outline-0', 'ba', 'b--moon-gray', 'f6', 'pa1', 'br2']
  var style = ''

  handler = typeof handler === 'function' ? handler : noop
  inputOpts = inputOpts || {}

  classes = applyOpts.classes(classes, inputOpts)
  style = applyOpts.style(style, inputOpts)

  var $inputEl = html`<input class="${classes.join(' ')}" style="${style}"
    type="${type}"
    oninput=${handler}
    value="${value}">`

  return applyOpts.opts($inputEl, inputOpts)
}
