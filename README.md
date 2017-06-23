# form-elements

[![Greenkeeper badge](https://badges.greenkeeper.io/scriptoLLC/form-elements.svg?token=32f7c3eae55949fb5be85d675d35261d721a31f4e4d4f343cc2b665f8ce5f885&ts=1498057801104)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/scriptoLLC/form-elements.svg?style=svg&circle-token=eb06e1385fe4eb07f3e0da106a4dd9f856aa403b)](https://circleci.com/gh/scriptoLLC/form-elements)

A collection of form elements.

## Usage
```js
const els = require('@scriptoll/form-elements')
const html = require('bel')

function form (state, emit) {
  const err = els.error()

  return html`<form onsubmit=${submit}>
    ${err.render()}
    ${els.labeledInput('Email', 'email', update, state.email, {validate: true, errorDisplay: err})}
    ${els.button('submit!', submit)}
  </form>`

  function input (evt) {
    state.email = evt.currentTarget.value
  }

  function submit (evt) {
    evt.preventDefault() // so the browser doesn't submit this thing
    emit('form:submit')
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

## API

#### `error(opts:elementOptions):ErrorDisplay`
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
Copyright © 2017 Scripto, LLC. Licensed under Apache-2.0
