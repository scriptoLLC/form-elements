const applyOpts = require('./element-helper')
const html = require('bel')

module.exports = label

function label (label, labelOpts, children) {
  var classes = []
  var style = ''

  if (!Array.isArray(children)) {
    children = [children]
  }

  labelOpts = labelOpts || {}

  classes = applyOpts.classes(classes, labelOpts)
  style = applyOpts.style(style, labelOpts)

  var $label = html`<label class="${classes.join(' ')}" style="${style}">
    ${label}<br>
    ${children.map((child) => child)}
  </label>`

  return applyOpts.opts($label, labelOpts)
}
