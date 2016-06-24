# Marky Markdown Editor

A simple Markdown editor build around the awsome [CodeMirror](http://codemirror.net/) Editor.

[Example](https://janstuemmel.github.io/marky-editor/)

## Install

```sh
npm install janstuemmel/marky-editor
npm install && npm test

# run automatic tests in chrome
TEST_BROWSERS=Chrome gulp test-auto
```

## Usage

```js
// codemirror.css and main.css required for now
var Marky = require('Marky');
var marky = new Marky(document.body, '# Hello world');
```

or look into the [example](example.html)

### API

```js
var eventBus = marky.get('eventBus');
eventBus.on('marky.editor.change', function() {
  console.log('content changed');
});
```

## Todo
* tests, tests, tests
* seperate Editor / Viewer
* resize split view
* highlight code inside preview
* make a proper config module
* extend api
* file import/export
* printing
* register on npm
* able to register plugins in the editor
* mathjax support
* install eslint
