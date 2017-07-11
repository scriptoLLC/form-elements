module.exports = {
  style: applyStyle,
  classes: applyClasses,
  opts: applyOpts
}

function applyStyle (style, opts) {
  if (typeof opts.style === 'string') {
    style += opts.style
  }

  return style
}

function applyClasses (classes, opts) {
  if (Array.isArray(opts.classes)) {
    classes.push.apply(classes, opts.classes)
  }

  return classes
}

// We don't want to set any of these keys directly on the DOM object that we create
const optsIgnore = ['classes', 'style', 'validator', 'errDisplay', 'validate',
  'animate', 'hiddenState', 'visibleState']

function applyOpts (el, opts) {
  Object.keys(opts)
    .filter((key) => !optsIgnore.includes(key))
    .forEach((key) => {
      el[key] = opts[key]
    })

  return el
}
