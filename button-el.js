const applyOpts = require('./element-helper')
const html = require('bel')
const noop = () => {}

module.exports = button

function button (text, handler, buttonOpts) {
  var classes = ['b', 'f5', 'white', 'w-100', 'mt3', 'pt1', 'pb2', 'lh-copy', 'outline-0', 'bn', 'br2']
  var style = 'background: #00C9D8;'

  handler = typeof handler === 'function' ? handler : noop
  buttonOpts = buttonOpts || {}

  classes = applyOpts.classes(classes, buttonOpts)
  style = applyOpts.style(style, buttonOpts)

  var $button = html`<button class="${classes.join(' ')}" style="${style}" onclick=${handler}>
    ${text}
  </button>`

  return applyOpts.opts($button, buttonOpts)
}
