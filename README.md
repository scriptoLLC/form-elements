# form-elements

[![CircleCI](https://circleci.com/gh/scriptoLLC/form-elements.svg?style=svg&circle-token=eb06e1385fe4eb07f3e0da106a4dd9f856aa403b)](https://circleci.com/gh/scriptoLLC/form-elements)

A collection of form elements.

## Usage
```js
const els = require('form-elements')
const html = require('nanohtml')

const scratch = {
  test: '',
  test2: '',
  pushed: 0
}

const errOpts = {
  classes: ['error-note'],
  animate: true,
  hiddenState: {
    height: function () {
      let height = this.$errorContainer.clientHeight
      if (this.$errorContainer.children.length === 0) {
        height = '0'
      }
      return `${height}px`
    },
    overflow: 'hidden',
    transition: 'height 0.8s'
  },
  visibleState: {
    height: function () {
      let height = this.$errorContainer.clientHeight
      if (this.$errorContainer.children.length === 0) {
        height = '0'
      }
      return `${height}px`
    }
  }
}

function main (state, emit) {
  const formErrors = els.error(errOpts)

  const inputOpts = {
    classes: [],
    validate: true,
    errorDisplay: formErrors
  }

  const input2Opts = {
    classes: [],
    required: true,
    validate: true,
    errorDisplay: formErrors
  }

  const $input = els.labeledInput('test email', 'email', oninput, scratch.test, inputOpts)
  const $input2 = els.labeledInput('test required', 'text', oninput2, scratch.test2, input2Opts)

  return html`<div class="">
    <div class="">
      ${formErrors.render()}<br>
      <b>Button pushed:</b> ${scratch.pushed}<br>
      <b>Input value:</b> ${scratch.test}<br>
      ${$input}<br>
      ${$input2}<br>
      ${els.button('i am a button', (evt) => ++scratch.pushed && emit('render'))}
    </div>
  </div>`

  function oninput (evt) {
    scratch.test = evt.currentTarget.value
  }

  function oninput2 (evt) {
    scratch.test2 = evt.currentTarget.value
  }
}
```

Results in:

```html
<form>
  <div></div>
  <label>Email<br><input type="email" value=""></label>
  <button>submit!</button>
</form>
```

In this example, the `<input type='email'>` field will be validated using the
built-in browser's validation framework for email addresses. When the user
`blur`s from the field, it'll attempt to validate the data inside, and if
it isn't valid, it'll display the error in the `<div>` located at the top
of the form.


## Options

#### `elementOptions:object(key:string,value:any)`
All the elements accept an `elementOptions` hash as the final argument which controls any additional element attributes you may wish to set, in addition to the following:

* `classes:array(string)` - an array of class names to apply, in addition to the default ones.
* `style:string` - a string containing inline style information

If you wish to override all the classes attached to the input, you can do so by providing the `class` key on this options list.

Event handlers should be provided using the `on[event]` key, e.g. `oninput` or `onblur`.

Each element type will have specific attributes that can be set in addition to the [default attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes) provided by the DOM spec.

#### `errorOptions:object(key:string,value:any)`
This is a superset of `elementOptions` containing the following extra values:

* `animate:boolean`: whether or not it should attach style information for CSS animations to show/hide the error element
* `visibleState:object(key:string,value:string|function)`: what styles to apply to the object when it's visible
* `hiddenState:object(key:string,value:string|function)`: what styles to apply to the object when it's visible

The valid keys for `visibleState` and `hiddenState` are all valid HTML Style rules. You can either set them to a string or a function which returns a sting and runs in the context of the Error element.

```js
{
  animate: true,
  hiddenState: {
    opacity: 0,
    transition: 'opacity 0.8s ease-in'
  },
  visibleState: {
    opacity: 1,
    height: function () {
      const height = this.$el.clientHeight + 15
      return `${height}px`
    }
  }
}
```

The initial state of the object is `hiddenState` -- these rules will supercede any styles or classes on the object. When errors are presented to the user, it will apply the styles found in `visibleState`.  These will be applyed everytime a new error is presented, allowing you to grow/shrink or otherwise alter the box. When all of the errors are gone, it will apply
the `hiddenState` styles again.

## API

#### `error(opts:errorOptions):ErrorDisplay`
Create a new error display object

`ErrorDisplay`:
* `#render():HTMLDivElement` - return a `<div>` element, using the `opts` provided by the constructor
* `#displayError(key:string, text:string):undefined` - Add a new error to the display
* `#removeError(key:string):undefined` - Remove an error from the display
* `#clear():undefined` - Remove all errors

## Elements

#### `input(label:string, type:string, inputHandler:function(evt:HTMLInputEvent, value:(string|number), opts:elementOptions):HTMLInputElement`
Create a form input with various options. `opts` accepts any of the [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) attributes, the usual default attributes, in addition to several custom fields:

* `validate:boolean` - should validation be attempted when the `blur` event has been fired
* `validator:function($el:HTMLInputElement):boolean` - a custom validation method that returns true/false. If you need to set a custom error message, you should use `$el.setCustomValidity`, but don't forget to set to an empty string when the error has been resolved!
* `errorDisplay:ErrorElement` - the error element that validation errors should be placed into. Must match the API provided by the included `error` object


```html
<input type=[type] value=[value] oninput=[inputHandler]>
```
---

#### `button(text:string, clickHandler:function(evt:HTMLClickEvent), opts:elementOptions):HTMLButtonElement`
Create a button with a click handler.

```html
<button onclick=[clickHandler]>[text]</button>
```
---

#### `label(text:string, opts:elementOptions):HTMLLabellement`
Create a label

```html
<label>[text]</label>
```
---

#### `labeledInput(label:string, type:string, inputHandler:function(evt:HTMLInputEvent, value:(string|number), labelOpts:elementOptions, inputOpts:elementOptions)`
Create a form input element wrapped by a label

```html
<label>[text]<br><input type=[type] value=[value] oninput=[inputHandler]></label>
```

## License
Copyright © 2018 Scripto, LLC. Licensed under Apache-2.0
