const test = require('tape')
const mergeFuncs = require('../merge-function')

test('funky merge', (t) => {
  t.plan(8)

  function foo (...args) {
    t.equal(args.length, 2, '2 args')
    t.equal(args[0], 'beep', 'beepin')
    t.equal(args[1], 'boop', 'boopin')
    t.pass('foo called')
  }

  function bar (...args) {
    t.equal(args.length, 2, '2 args')
    t.equal(args[0], 'beep', 'beepin')
    t.equal(args[1], 'boop', 'boopin')
    t.pass('bar called')
  }

  const merged = mergeFuncs(foo, bar)
  merged('beep', 'boop')
})
