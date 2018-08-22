const html = require('nanohtml')

const applyOpts = require('./element-helper')
const mergeFuncs = require('./merge-function')
const createValidator = require('./create-validator')

const noop = () => {}

module.exports = input

function input (type, handler, value, inputOpts) {
  var classes = []
  var style = ''

  handler = typeof handler === 'function' ? handler : noop
  inputOpts = inputOpts || {}

  classes = applyOpts.classes(classes, inputOpts)
  style = applyOpts.style(style, inputOpts)

  var $inputEl = html`<input class="${classes.join(' ')}" style="${style}"
    type="${type}"
    oninput=${handler}
    value="${value}">`

  if (inputOpts.validate || typeof inputOpts.validator === 'function') {
    const validator = createValidator(inputOpts.errorDisplay, inputOpts.validator)
    const blur = inputOpts.onblur

    inputOpts.onblur = typeof blur === 'function'
      ? mergeFuncs(validator, blur) : validator
  }

  return applyOpts.opts($inputEl, inputOpts)
}
