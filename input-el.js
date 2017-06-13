const html = require('bel')

function input (label, type, handler, value) {
  return html`<label class="db mt3" style="text-indent: 4px;"><span class="ttu lh-copy" style="letter-spacing: 0.01em; font-size: 0.625rem">${label}</span><br>
    <input class="w-100 outline-0 ba b--moon-gray f6 pa1 br2" type="${type}" oninput=${handler} value="${value}">
  </label>`
}

module.exports = input
