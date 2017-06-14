const test = require('tape')
const els = require('../')

test('input, no options', (t) => {
  t.plan(2)
  let $inputValue = ''
  const $input = els.input('text', handleInput, $inputValue)
  $input.value = 'test'
  $input.dispatchEvent(new window.Event('input'))
  t.equal($inputValue, 'test', 'updated')
  t.equal($input.type, 'text', 'text input')

  function handleInput (evt) {
    $inputValue = evt.currentTarget.value
  }
})

test('input, options', (t) => {
  t.plan(3)

  const opts = {
    classes: ['foo'],
    style: 'display: inline-block;',
    onblur: (evt) => t.pass('blurrrrrrrr')
  }

  const $input = els.input('text', null, '', opts)
  t.ok($input.classList.contains('foo'), 'has foo class')
  t.equal($input.getAttribute('style'), opts.style, 'has style')
  $input.dispatchEvent(new window.Event('blur'))
})

test('label, no options', (t) => {
  t.plan(1)
  const $label = els.label('yo')
  t.ok($label.innerText.trim(), 'yo', 'labeled')
})

test('label, options', (t) => {
  t.plan(3)
  const opts = {
    classes: ['foo'],
    style: 'border: 1px;',
    for: 'boop'
  }
  const $label = els.label('yo', opts)
  t.ok($label.classList.contains('foo'), 'has foo')
  t.ok($label.getAttribute('style').includes(opts.style), 'has style')
  t.equal($label.for, opts.for, 'for booping')
})

test('labeled input', (t) => {
  t.plan(3)
  const $labeledInput = els.labeledInput('test', 'text', null, '')
  const $input = $labeledInput.querySelectorAll('input')
  t.equal($labeledInput.nodeName, 'LABEL', 'label is outer')
  t.equal($input.length, 1, 'has an input')
  t.equal($input[0].type, 'text', 'is a text input')
})

test('button, no options', (t) => {
  t.plan(2)
  const $button = els.button('push me', handleClick)
  $button.click()
  t.equal($button.innerText.trim(), 'push me', 'has text')

  function handleClick () {
    t.pass('clicked')
  }
})

test('button, options', (t) => {
  t.plan(3)
  const opts = {
    classes: ['baz'],
    style: 'border: 1px;',
    disabled: 'disabled'
  }
  const $button = els.button('push me', null, opts)
  t.ok($button.classList.contains('baz'), 'has baz')
  t.ok($button.getAttribute('style').includes(opts.style), 'has style')
  t.ok($button.disabled, 'disabled')
})
