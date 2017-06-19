const html = require('bel')
const helpers = require('./element-helper')

function errorContainer (opts) {
  const classes = helpers.classes(['center', 'w-100', 'tc', 'red', 'f4', 'mt3', 'mb3'], opts)
  const style = helpers.style('', opts)
  const el = helpers.opts(html`<div class="${classes.join(' ')}" style="${style}"></div>`, opts)
  return el
}

function errorMessage (key, txt) {
  return html`<div data-for="${key}">${txt}</div>`
}

function error (opts) {
  opts = opts || {}
  const messages = new Map()
  const container = errorContainer(opts)

  return {
    render: () => container,
    displayError,
    removeError,
    clear
  }

  function displayError (key, txt) {
    if (messages.has(key)) {
      const msgEl = getMsgDiv(key)
      msgEl.innerText = txt
    } else {
      container.appendChild(errorMessage(key, txt))
    }
    messages.set(key, txt)
  }

  function removeError (key) {
    if (messages.has(key)) {
      messages.delete(key)
      container.removeChild(getMsgDiv(key))
    }
  }

  function clear () {
    messages.forEach((_, key) => removeError(key))
  }

  function getMsgDiv (key) {
    return container.querySelector(`div[data-for="${key}"]`)
  }
}

module.exports = error
