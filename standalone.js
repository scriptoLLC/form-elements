const choo = require('choo')
const html = require('nanohtml')
const els = require('./')

const scratch = {
  test: '',
  test2: '',
  pushed: 0
}

const errOpts = {
  classes: ['error-note'],
  animate: true,
  hiddenState: {
    height: function () {
      let height = this.$errorContainer.clientHeight
      if (this.$errorContainer.children.length === 0) {
        height = '0'
      }
      console.log('setting height to', height)
      return `${height}px`
    },
    overflow: 'hidden',
    transition: 'height 0.8s'
  },
  visibleState: {
    height: function () {
      let height = this.$errorContainer.clientHeight
      if (this.$errorContainer.children.length === 0) {
        height = '0'
      }
      console.log('setting height to', height)
      return `${height}px`
    }
  }
}

function main (state, emit) {
  const formErrors = els.error(errOpts)

  const inputOpts = {
    classes: [],
    validate: true,
    onblur: function (evt) {
      console.log('you blurred me')
    },
    errorDisplay: formErrors
  }

  const input2Opts = {
    classes: [],
    required: true,
    validate: true,
    errorDisplay: formErrors
  }

  const $input = els.labeledInput('test email', 'email', oninput, scratch.test, inputOpts)
  const $input2 = els.labeledInput('test required', 'text', oninput2, scratch.test2, input2Opts)

  return html`<div class="">
    <div class="">
      ${formErrors.render()}<br>
      <b>Button pushed:</b> ${scratch.pushed}<br>
      <b>Input value:</b> ${scratch.test}<br>
      ${$input}<br>
      ${$input2}<br>
      ${els.button('i am a button', (evt) => ++scratch.pushed && emit('render'))}
    </div>
  </div>`

  function oninput (evt) {
    scratch.test = evt.currentTarget.value
  }

  function oninput2 (evt) {
    scratch.test2 = evt.currentTarget.value
  }
}

const style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = `.error-note {
    background-color: #ffe7e7;
    color: #ff0000;
    margin-bottom: 20px;
    border-radius: 3px;
    padding: 10px;
}`
document.getElementsByTagName('head')[0].appendChild(style)

const app = choo()
app.route('/', main)
document.body.appendChild(app.start())
