const test = require('tape')
const els = require('../')

test('noooooooooooooooode', (t) => {
  // this way we get a failure if we add/remove an el without making a test
  const keys = Object.keys(els)
  t.plan(keys.length)

  t.ok(els.button('test', null), 'button renders')
  t.ok(els.label('test'), 'label renders')
  t.ok(els.input('text', null, ''), 'input renders')
  t.ok(els.labeledInput('test', 'text', null, ''), 'labelled input renders')
  t.ok(els.error().render(), 'error renders')
})
