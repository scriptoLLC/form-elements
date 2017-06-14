const entry = require('@scriptollc/app-entry')
const html = require('bel')
const els = require('./')

const scratch = {
  test: '',
  pushed: 0
}

function main (state, emit) {
  const inputOpts = {
    classes: ['w-50'],
    onblur: function (evt) {
      console.log('you blurred me')
    }
  }

  const $input = els.labeledInput('test input', 'text', oninput, scratch.test, inputOpts)

  return html`<div class="dt w-third center vh-100">
    <div class="v-mid dtc">
      <b>Button pushed:</b> ${scratch.pushed}<br>
      <b>Input value:</b> ${scratch.test}<br>
      ${$input}<br>
      ${els.button('i am a button', (evt) => ++scratch.pushed && emit('render'))}
    </div>
  </div>`

  function oninput (evt) {
    scratch.test = evt.currentTarget.value
  }
}

entry([], [{route: '/', method: main}], 'body')
