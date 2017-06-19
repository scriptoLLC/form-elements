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
  const $err = err.render()
  const $input = input('email', null, '', inputOpts)
  $input.value = 't'
  $input.dispatchEvent(new window.Event('blur'))
  t.equal($err.children.length, 0, 'no errors')
  t.end()
})

test('no explicit validation, no problems', (t) => {
  const err = error()
  const inputOpts = {
    errorDisplay: err
  }
  const $err = err.render()
  const $input = input('email', null, '', inputOpts)
  $input.value = 't'
  $input.dispatchEvent(new window.Event('blur'))
  t.equal($err.children.length, 0, 'no errors')
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
  const $err = err.render()
  const $input = input('email', null, '', inputOpts)

  $input.value = 't'
  $input.dispatchEvent(new window.Event('blur'))
  t.equal($err.children.length, 1, 'show built-in error')

  $input.dispatchEvent(new window.Event('blur'))
  t.equal($err.children.length, 1, 'still only one error')
  t.equal($err.children[0].innerText, emailErrors[browser], 'chrome error message')

  $input.value = 't@t'
  $input.dispatchEvent(new window.Event('blur'))
  t.equal($err.children.length, 0, 'no errors')

  $input.dispatchEvent(new window.Event('blur'))
  t.equal($err.children.length, 0, 'still no errors')
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
  const $err = err.render()
  const $input = input('email', null, '', inputOpts)

  $input.value = 't'
  $input.dispatchEvent(new window.Event('blur'))
  t.equal($err.children.length, 1, 'only one error')
  t.equal($err.children[0].innerText, 'You must boop!', 'custom error message')

  $input.value = 'boop'
  $input.dispatchEvent(new window.Event('blur'))
  t.equal($err.children.length, 0, 'no errors')
  t.end()
})
