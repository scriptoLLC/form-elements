const entry = require('@scriptollc/app-entry')
const html = require('bel')
const els = require('./')

const scratch = {
  test: '',
  pushed: 0
}

function main (state, emit) {
  return html`<div class="dt w-third center vh-100">
    <div class="v-mid dtc">
      <b>Button pushed:</b> ${scratch.pushed}<br>
      <b>Input value:</b> ${scratch.text}<br>
      ${els.input('test input', 'text', (evt) => (scratch.text = evt.currentTarget.value), scratch.test)}<br>
      ${els.button('i am a button', (evt) => ++scratch.pushed && emit('render'))}
    </div>
  </div>`
}

entry([], [{route: '/', method: main}], 'body')
