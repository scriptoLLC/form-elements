const html = require('bel')
const noop = () => {}

function button (text, handler, buttonOpts) {
  handler = typeof handler === 'function' ? handler : noop
  buttonOpts = buttonOpts || {}

  const classes = ['b', 'f5', 'white', 'w-100', 'mt3', 'pt1', 'pb2', 'lh-copy', 'outline-0', 'bn', 'br2']
  let style = 'background: #00C9D8;'

  if (Array.isArray(buttonOpts.classes)) {
    classes.push.apply(classes, buttonOpts.classes)
  }

  if (typeof buttonOpts.style === 'string') {
    style += buttonOpts.style
  }

  const $button = html`<button class="${classes.join(' ')}" style="${style}" onclick=${handler}>
    ${text}
  </button>`

  Object
    .keys(buttonOpts)
    .filter((key) => key !== 'classes' || key !== 'style')
    .forEach((key) => {
      $button[key] = buttonOpts[key]
    })

  return $button
}

module.exports = button
