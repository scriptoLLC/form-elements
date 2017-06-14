const inputEl = require('./input-el')
const labelEl = require('./label-el')

function labeledInput (text, type, handler, value, inputOpts, labelOpts) {
  const $label = labelEl(text, labelOpts)
  const $input = inputEl(type, handler, value, inputOpts)
  $label.appendChild($input)
  return $label
}

module.exports = labeledInput
