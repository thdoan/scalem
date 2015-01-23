# Scalem JS

Scalem, short for __scale elements__ or slang for __scale 'em__, is a light-weight responsive text jQuery plugin inspired by [FlowType](http://simplefocus.com/flowtype/). Use it to "liquify" elements on your website so that they scale relative to the width of their parent element or, optionally, any element you specify (see Options below). Scalem is not just limited to text size&mdash;it can be used to scale any CSS style that takes a numeric unit such as px, em, or %.

### [See a demo &raquo;](http://thdoan.github.io/scalem/demo.html)

## Options

Options can be passed via data attributes or JavaScript (see Usage below). For data attributes, append the option name after "data-scale-", for example `data-scale-ratio="1"`.

Name        | Type   | Default | Description
----------- | ------ | ------- | -----------
`ratio`     | number | 0.5     | Scale ratio, where 1 scales the element to 100% the width of the reference element.
`reference` | string | parent  | Selector to the reference element (text will scale relative to this element's width).
`styles`    | string | ''      | Space-separated list of CSS properties to scale in addition to font-size.


## Usage

```html
<body>
<h1>Scalable Heading</h1>
<p id="txt" data-scale-ratio=".25">
  Scalable Text
<p>
<p>
  <button class="btn">Scalable Button</button>
</p>
...
<script>
$(document).ready(function() {
  // Scale heading using default options
  $('h1').scalem();
  // Scale text to 25% of the document's width using data attribute
  $('#txt').scalem();
  // Scale button to 100% the width of the <h1>, while also keeping its
  // border ratio and width proportionate, by passing object properties
  $('.btn').scalem({
    ratio: 1,
    reference: 'h1',
    styles: 'border-radius border-width'
  });
}
</script>
</body>
```

## Installation

Choose one of the following methods:

- `git clone https://github.com/thdoan/scalem.git`
- `bower install scalem`
- `npm install scalem`
- [Download ZIP](https://github.com/thdoan/scalem/archive/master.zip)