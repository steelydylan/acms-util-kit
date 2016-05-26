# ejs-electron

[![npm](https://img.shields.io/npm/v/ejs-electron.svg)](https://www.npmjs.com/package/ejs-electron)
[![npm](https://img.shields.io/npm/dt/ejs-electron.svg)](https://www.npmjs.com/package/ejs-electron)

A mega lightweight, completely flexible module that allows ejs templating in an electronJS app.

Makes use of the electronJS `protocol` module to supply a custom handler for the `file://` protocol.  This handler intercepts all file requests, compiles any requested `.ejs` files, and serves the result.

___

## Installation

Install using [npm](https://www.npmjs.com/package/ejs-electron):

```
$ npm install ejs-electron
```

___

## Usage

```javascript
var ejse = require('ejs-electron');
```

This will initialize the module and return an instance of EJSE.  This object's methods are as follows:

### Method API

(All methods return the same EJSE instance for chaining.  The EJSE instance will also be made available in the scope of your `.ejs` files via the variable `ejse`, allowing you to `setOptions()` and `stopListening()` there as well).

#### setOptions(options)

Set the options to be passed in to `ejs.render()`.

- options -- *object* -- A list of key-value pairs to be made available in all `.ejs` files.

#### listen()

Start listening to/intercepting file requests.  By default, `ejs-electron` starts listening as soon as it's loaded.  Use `listen()` to start listening again after calling `stopListening()`

#### stopListening()

Stop listening to/intercepting file requests.

___

## Examples

A simple electron app with `ejs-electron` could look like this:

##### main.js

```javascript
var electron = require('electron'),
    app = electron.app,
    ejse = require('ejs-electron');

ejse.setOptions({
    opt: 'value'
});

app.on('ready', function() {
    mainWindow = new electron.BrowserWindow();
    mainWindow.loadURL('file://' + __dirname + '/index.ejs');
});
```

You can, of course, chain `setOptions()` to the `require()` call:

```javascript
var ejse = require('ejs-electron').setOptions(opts);
```

##### index.ejs

```html
<h1>Hello, World!</h1>
<p>The value of `opt` is: <%= opt %></p>
<% ejse.stopListening(); %>
```

## Issues

Issues may be submitted at https://github.com/bowheart/ejs-electron/issues

Thanks to all who have submitted issues.  The feedback has been extremely helpful.

Also, of course, feel free to fork and pull request.  Happy coding!

## License
(The MIT License)

Copyright (c) 2016 Joshua Claunch (bowheart) <kingdomdance602@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
