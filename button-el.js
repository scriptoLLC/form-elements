const applyOpts = require('./element-helper')
const html = require('nanohtml')
const noop = () => {}

module.exports = button

function button (text, handler, buttonOpts) {
  var classes = []
  var style = ''

  handler = typeof handler === 'function' ? handler : noop
  buttonOpts = buttonOpts || {}

  classes = applyOpts.classes(classes, buttonOpts)
  style = applyOpts.style(style, buttonOpts)

  var $button = html`<button class="${classes.join(' ')}" style="${style}" onclick=${handler}>
    ${text}
  </button>`

  return applyOpts.opts($button, buttonOpts)
}
