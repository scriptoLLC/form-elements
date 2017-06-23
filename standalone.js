const choo = require('choo')
const html = require('bel')
const els = require('./')

const scratch = {
  test: '',
  pushed: 0
}

function main (state, emit) {
  const formErrors = els.error()

  const inputOpts = {
    classes: ['w-50'],
    validate: true,
    onblur: function (evt) {
      console.log('you blurred me')
    },
    errorDisplay: formErrors
  }

  const $input = els.labeledInput('test input', 'email', oninput, scratch.test, inputOpts)

  return html`<div class="dt w-third center vh-100">
    <div class="v-mid dtc">
      ${formErrors.render()}<br>
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

const app = choo()
app.route('/', main)
document.body.appendChild(app.start())
