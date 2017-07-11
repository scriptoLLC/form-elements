const test = require('tape')

const error = require('../error-el')
const input = require('../input-el')

const emailErrors = {
  chrome: "Please include an '@' in the email address. 't' is missing an '@'.",
  firefox: 'Please enter an email address.',
  safari: 'Please enter an email address.'
}

let browser = 'chrome'
let ua = navigator.userAgent.toLowerCase()
if (ua.includes('firefox')) {
  browser = 'firefox'
} else if (ua.includes('chrome')) {
  browser = 'chrome'
} else if (ua.includes('safari')) {
  browser = 'safari'
}

test('no validation, no problems', (t) => {
  const err = error()
  const inputOpts = {
    validate: false,
    errorDisplay: err
  }

  document.body.appendChild(err.render())

  const $input = input('email', null, '', inputOpts)
  $input.value = 't'
  $input.dispatchEvent(new window.Event('blur'))
  t.equal(err.$errorContainer.children.length, 0, 'no errors')
  while (document.body.children.length > 0) {
    document.body.removeChild(document.body.firstElementChild)
  }
  t.end()
})

test('no explicit validation, no problems', (t) => {
  const err = error()
  const inputOpts = {
    errorDisplay: err
  }

  document.body.appendChild(err.render())

  const $input = input('email', null, '', inputOpts)
  $input.value = 't'
  $input.dispatchEvent(new window.Event('blur'))

  t.equal(err.$errorContainer.children.length, 0, 'no errors')

  while (document.body.children.length > 0) {
    document.body.removeChild(document.body.firstElementChild)
  }
  t.end()
})

test('built-in validation', (t) => {
  t.plan(9) // every time you call blur, the custom onblur runs...
  const err = error()
  const inputOpts = {
    errorDisplay: err,
    validate: true,
    onblur: () => t.pass('ran custom on blur')
  }

  document.body.appendChild(err.render())
  const $input = input('email', null, '', inputOpts)

  $input.value = 't'
  $input.dispatchEvent(new window.Event('blur'))
  t.equal(err.$errorContainer.children.length, 1, 'show built-in error')

  $input.dispatchEvent(new window.Event('blur'))
  t.equal(err.$errorContainer.children.length, 1, 'still only one error')
  t.equal(err.$errorContainer.children[0].innerText, emailErrors[browser], 'chrome error message')

  err.$el.addEventListener('transitionend', () => {
    t.equal(err.$errorContainer.children.length, 0, 'no errors')
    $input.dispatchEvent(new window.Event('blur'))
    t.equal(err.$errorContainer.children.length, 0, 'still no errors')

    while (document.body.children.length > 0) {
      document.body.removeChild(document.body.firstElementChild)
    }
  })

  $input.value = 't@t'
  $input.dispatchEvent(new window.Event('blur'))
})

test('custom validation', (t) => {
  const err = error()
  const inputOpts = {
    errorDisplay: err,
    validator: ($el) => {
      if ($el.value !== 'boop') {
        $el.setCustomValidity('You must boop!')
        return false
      }
      $el.setCustomValidity('')
      return true
    }
  }
  document.body.appendChild(err.render())
  const $input = input('email', null, '', inputOpts)

  $input.value = 't'
  $input.dispatchEvent(new window.Event('blur'))
  t.equal(err.$errorContainer.children.length, 1, 'only one error')
  t.equal(err.$errorContainer.children[0].innerText, 'You must boop!', 'custom error message')

  $input.value = 'boop'
  $input.dispatchEvent(new window.Event('blur'))

  err.$el.addEventListener('transitionend', () => {
    t.equal(err.$errorContainer.children.length, 0, 'no errors')
    while (document.body.children.length > 0) {
      document.body.removeChild(document.body.firstElementChild)
    }
    t.end()
  })
})
