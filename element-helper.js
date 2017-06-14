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

function applyOpts (el, opts) {
  Object.keys(opts)
    .filter((key) => key !== 'classes' || key !== 'style')
    .forEach((key) => {
      el[key] = opts[key]
    })

  return el
}
