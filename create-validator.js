module.exports = function createValidator (errDisplay, validator) {
  const key = `error-${(new Date() % 9e6).toString(36)}`

  return function checkValidity (evt) {
    const $el = evt.currentTarget
    if (typeof validator !== 'function') {
      validator = $el.checkValidity.bind($el)
    }

    if (!validator($el)) {
      $el.dataset.valid = false
      return errDisplay.displayError(key, $el.validationMessage)
    }

    $el.dataset.valid = true
    errDisplay.removeError(key)
  }
}
