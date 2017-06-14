const html = require('bel')

function label (label, labelOpts) {
  labelOpts = labelOpts || {}
  const classes = ['db', 'mt3', 'ttu', 'lh-copy']
  let style = 'text-indent: 4px;'

  if (Array.isArray(labelOpts.classes)) {
    classes.push.apply(classes, labelOpts.classes)
  }

  if (typeof labelOpts.style === 'string') {
    style += labelOpts.style
  }

  const $label = html`<label class="${classes.join(' ')}" style="${style}">
    ${label}<br>
  </label>`

  Object
    .keys(labelOpts)
    .filter((key) => key !== 'classes' || key !== 'style')
    .forEach((key) => {
      $label[key] = labelOpts[key]
    })

  return $label
}

module.exports = label
