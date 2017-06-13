const test = require('tape')
const els = require('../')

test('input', (t) => {
  let $inputValue = ''
  const $label = els.input('input test', 'text', handleInput, $inputValue)
  const $input = $label.querySelector('input')
  $input.value = 'test'
  $input.dispatchEvent(new window.Event('input'))

  setTimeout(() => {
    t.equal($inputValue, 'test', 'updated')
    t.equal($label.innerText.trim(), 'input test', 'label')
    t.equal($input.type, 'text', 'text input')
    t.end()
  }, 1)

  function handleInput (evt) {
    $inputValue = evt.currentTarget.value
  }
})

test('button', (t) => {
  const $button = els.button('push me', handleClick)
  $button.click()
  t.equal($button.innerText.trim(), 'push me', 'has text')

  function handleClick () {
    t.pass('clicked')
    t.end()
  }
})
