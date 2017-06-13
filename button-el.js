const html = require('bel')

function button (text, handler) {
  return html`<button class="w-100 mt3 pt1 pb2 lh-copy outline-0 bn br2" style="background: #00C9D8;" onclick=${handler}>
    <span class="b f5 white">${text}</span>
  </button>`
}

module.exports = button
