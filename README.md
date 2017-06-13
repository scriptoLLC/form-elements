# form-elements
[![CircleCI](https://circleci.com/gh/scriptoLLC/form-elements.svg?style=svg&circle-token=eb06e1385fe4eb07f3e0da106a4dd9f856aa403b)](https://circleci.com/gh/scriptoLLC/form-elements)

A collection of form elements.

## Elements

#### `input(label:string, type:string, inputHandler:function(evt:HTMLInputEvent, value:(string|number):HTMLLabelElement`
Create a form input wrapped in a label tag:

```html
<label>[label text]
  <input type=[type] value=[value] oninput=[inputHandler]>
</label>
```

#### `button(text:string, clickHandler:function(evt:HTMLClickEvent):HTMLButtonElement`
Create a button with a click handler:

```html
<button onclick=[clickHandler]>[text]</button>
```

## License
Copyright © 2017 Scripto, LLC. All rights reserved
