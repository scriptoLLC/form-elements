const html = require('nanohtml')
const helpers = require('./element-helper')

function ErrorEl (opts) {
  if (!(this instanceof ErrorEl)) return new ErrorEl(opts)
  this.opts = opts || {}
  this.$el = null

  this._messages = new Map()
  this._cache(this.opts)
  this._hidden = true
}

ErrorEl.prototype._addTransition = function addTransition (transitionData) {
  if (typeof window !== 'undefined') {
    const keys = Object.keys(transitionData)
    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i]
      const td = transitionData[key]
      const val = typeof td === 'function' ? td.call(this) : td
      this.$el.style[key] = val
    }
  }
}

ErrorEl.prototype._cache = function cache () {
  const classes = helpers.classes([], this.opts)
  const style = helpers.style('', this.opts)
  const el = helpers.opts(html`<div><div class="${classes.join(' ')}" style="${style}"></div></div>`, this.opts)
  this.$el = el
  if (typeof window !== 'undefined') {
    this.$errorContainer = this.$el.children[0]
  }

  if (this.opts.animate) {
    this._addTransition(this.opts.hiddenState)
  }
}

ErrorEl.prototype.render = function render (opts) {
  if (!this.$el) {
    this._cache()
  }
  return this.$el
}

ErrorEl.prototype._renderError = function renderError (key, txt) {
  return html`<div class="${key}">${txt}</div>`
}

ErrorEl.prototype._show = function show () {
  if (this.opts.animate) {
    this._addTransition(this.opts.visibleState)
  }
}

ErrorEl.prototype._hide = function hide () {
  if (this.opts.animate) {
    this._addTransition(this.opts.hiddenState)
  }
}

ErrorEl.prototype.displayError = function displayError (key, txt) {
  if (this._messages.has(key)) {
    const msgEl = this._getMsgDiv(key)
    msgEl.innerText = txt
  } else {
    this.$errorContainer.appendChild(this._renderError(key, txt))
  }
  this._messages.set(key, txt)
  this._show()
}

ErrorEl.prototype.removeError = function removeError (key) {
  if (this._messages.has(key)) {
    this._messages.delete(key)
    const child = this._getMsgDiv(key)
    child.addEventListener('transitionend', this._removeChild.bind(this))
    child.style.transition = 'opacity 0.4s ease-out'
    child.style.opacity = 0
  }
}

ErrorEl.prototype._removeChild = function (evt) {
  this.$errorContainer.removeChild(evt.currentTarget)
  evt.currentTarget.removeEventListener('transitionend', this._removeChild)
  this._hide()
}

ErrorEl.prototype.clear = function clear () {
  this._messages.forEach((_, key) => this.removeError(key))
}

ErrorEl.prototype._getMsgDiv = function getMsgDiv (key) {
  return this.$el.querySelector(`.${key}`)
}

module.exports = ErrorEl
