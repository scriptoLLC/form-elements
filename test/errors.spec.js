const test = require('tape')

const error = require('../error-el.js')

test('errors', (t) => {
  const errA = error()
  const $elA = errA.render()
  const errB = error()
  const $elB = errB.render()

  t.equal($elA.children.length, 0, 'elA has no kids')
  t.equal($elB.children.length, 0, 'elB has no kids')

  errA.displayError('bar', 'beep')

  t.equal($elA.children.length, 1, 'elA has a kid')
  t.equal($elB.children.length, 0, 'elB has no kids')
  t.equal($elA.children[0].innerText, 'beep', 'beeping')

  errA.displayError('bar', 'moog')

  t.equal($elA.children.length, 1, 'elA has a kid')
  t.equal($elA.children[0].innerText, 'moog', 'mooging')

  errA.removeError('bar')

  t.equal($elA.children.length, 0, 'elA has no kids')
  t.equal($elB.children.length, 0, 'elB has no kids')

  errA.displayError('foo', 'boop')
  errA.displayError('baz', 'shoop')

  t.equal($elA.children.length, 2, 'elA has 2 kids')
  t.equal($elA.children[0].innerText, 'boop', 'first we boop')
  t.equal($elA.children[1].innerText, 'shoop', 'then we shoop')

  errA.clear()

  t.equal($elA.children.length, 0, 'elA has no kids')
  t.end()
})
