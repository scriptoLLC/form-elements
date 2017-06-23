const inputEl = require('./input-el')
const labelEl = require('./label-el')

function labeledInput (text, type, handler, value, inputOpts, labelOpts) {
  const $input = inputEl(type, handler, value, inputOpts)
  const $label = labelEl(text, labelOpts, $input)
  return $label
}

module.exports = labeledInput
