const applyOpts = require('./element-helper')
const html = require('bel')

module.exports = label

function label (label, labelOpts) {
  var classes = ['db', 'mt3', 'ttu', 'lh-copy']
  var style = 'text-indent: 4px;'

  labelOpts = labelOpts || {}

  classes = applyOpts.classes(classes, labelOpts)
  style = applyOpts.style(style, labelOpts)

  var $label = html`<label class="${classes.join(' ')}" style="${style}">
    ${label}<br>
  </label>`

  return applyOpts.opts($label, labelOpts)
}
