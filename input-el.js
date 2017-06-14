const html = require('bel')
const noop = () => {}

function input (type, handler, value, inputOpts) {
  handler = typeof handler === 'function' ? handler : noop
  inputOpts = inputOpts || {}

  const classes = ['w-100', 'outline-0', 'ba', 'b--moon-gray', 'f6', 'pa1', 'br2']
  let style = ''

  if (Array.isArray(inputOpts.classes)) {
    classes.push.apply(classes, inputOpts.classes)
  }

  if (typeof inputOpts.style === 'string') {
    style += inputOpts.style
  }

  const $inputEl = html`<input class="${classes.join(' ')}" style="${style}"
    type="${type}"
    oninput=${handler}
    value="${value}">`

  Object
    .keys(inputOpts)
    .filter((key) => key !== 'classes' || key !== 'style')
    .forEach((key) => {
      $inputEl[key] = inputOpts[key]
    })

  return $inputEl
}

module.exports = input
