const test = require('tape')

const error = require('../error-el.js')

test('display errors', (t) => {
  const errA = error()
  const $elA = errA.render().children[0]
  const errB = error()
  const $elB = errB.render().children[0]

  t.equal($elA.children.length, 0, 'elA has no kids')
  t.equal($elB.children.length, 0, 'elB has no kids')

  errA.displayError('bar', 'beep')

  t.equal($elA.children.length, 1, 'elA has a kid')
  t.equal($elB.children.length, 0, 'elB has no kids')
  t.equal($elA.children[0].innerText, 'beep', 'beeping')

  errA.displayError('bar', 'moog')

  t.equal($elA.children.length, 1, 'elA has a kid')
  t.equal($elA.children[0].innerText, 'moog', 'mooging')
  t.end()
})

test('display errors', (t) => {
  t.plan(12)
  const errAOpts = {
    animate: true,
    hiddenState: {
      opacity: 0,
      transition: 'opacity 0.1s'
    },
    visibleState: {
      opacity: 1
    }
  }

  const errA = error(errAOpts)
  const $elAWrapper = errA.render()
  const errB = error()
  const $elBWrapper = errB.render()

  document.body.appendChild($elAWrapper)
  document.body.appendChild($elBWrapper)
  const $elA = $elAWrapper.children[0]
  const $elB = $elBWrapper.children[0]

  t.equal($elA.children.length, 0, 'elA has no kids')
  t.equal($elB.children.length, 0, 'elB has no kids')

  t.equal($elAWrapper.style.opacity, '0', 'transparent')
  t.equal($elAWrapper.style.transition, 'opacity 0.1s', 'transition')

  errA.displayError('bar', 'beep')
  const errAMsg = $elA.children[0]

  t.equal($elA.children.length, 1, 'elA has a kid')
  t.equal($elB.children.length, 0, 'elB has no kids')
  t.equal($elA.children[0].innerText, 'beep', 'beeping')
  t.equal($elAWrapper.style.opacity, '1', 'is opaque')

  errA.displayError('bar', 'moog')

  t.equal($elA.children.length, 1, 'elA has a kid')
  t.equal($elA.children[0].innerText, 'moog', 'mooging')

  errAMsg.addEventListener('transitionend', () => {
    // this event listener is added before the one that removes it
    // so we need to setTimeout here to get that second to fire
    // before we can test it
    setTimeout(() => {
      t.equal($elA.children.length, 0, 'elA has no kids')
      t.equal($elB.children.length, 0, 'elB has no kids')
      while (document.body.children.length > 0) {
        document.body.removeChild(document.body.firstElementChild)
      }
    }, 5)
  })

  setTimeout(() => {
    errA.removeError('bar')
  }, 500)
})

test('clear errors', (t) => {
  const errA = error()
  const $elAWrapper = errA.render()
  let _count = 0

  document.body.appendChild($elAWrapper)
  const $elA = $elAWrapper.children[0]

  errA.displayError('foo', 'boop')
  errA.displayError('baz', 'shoop')

  t.equal($elA.children.length, 2, 'elA has 2 kids')
  t.equal($elA.children[0].innerText, 'boop', 'first we boop')
  t.equal($elA.children[1].innerText, 'shoop', 'then we shoop')

  errA.clear()

  $elA.addEventListener('transitionend', () => {
    ++_count
    if (_count === 2) {
      t.equal($elA.children.length, 0, 'elA has no kids')
      while (document.body.children.length > 0) {
        document.body.removeChild(document.body.firstElementChild)
      }
      t.end()
    }
  })
})
