---
title: Setting up Webpack
step: 2
---

Now that we have yarn setup, we can add [Webpack](https://webpack.github.io/) to
our dependencies and configure it to bundle all of our JavaScript files
together.

We start by installing Webpack via yarn:

```bash
yarn add webpack
```

Now that Webpack is installed as a node module, we can begin to configure it to
bundle all JavaScript files that we will place in the `app/js/` directory and
build them to a directory called `dist/`. So let's go ahead and create a test
file in our `app/js/` directory.

```js
// app/js/application.js

console.log(`it's working!`);
```

## Webpack Configuration

Next we will setup our webpack configuration. We start by creating a file called
`webpack.config.js` in the root directory of our project. This file is written
in JavaScript and will specify the input files and output directory/filename for
our application files.

```js
// webpack.config.js

const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'app');
const JS_DIR = path.resolve(APP_DIR, 'js');

const config = {
  entry: JS_DIR + '/application.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;
```

This configuration is setting up the paths where we want to build to (`dist/`),
where to find our source files `app/js/` and our final filename `bundle.js`.

Next we will test our configuration is working by running the Webpack build.

## Running Webpack

We will now add our first 2 "scripts" to the `package.json` that will allow us
to run the Webpack build via yarn. Since Webpack is not installed globally,
running it via yarn allows us to skip settings the path to the webpack
executable every time we call Webpack. i.e. we can simply run `yarn build`
instead of `./node_modules/.bin/webpack -p`.

Let's set this up by adding the the `"scripts"` key to our `package.json` with
the following value:

```js
  ...

  "scripts": {
    "dev": "webpack -d",
    "build": "webpack -p"
  },

  ...
```

## Testing it out

Now that Webpack is ready to run, let's test our configuration by running

```bash
yarn dev
```

If everything has gone to plan, you should see the following output from your
terminal:

```bash
$ yarn dev

yarn run v1.3.2
$ webpack -d
Hash: c344ba9d2d49de2bffd7
Version: webpack 3.8.1
Time: 59ms
    Asset     Size  Chunks             Chunk Names
bundle.js  3.18 kB       0  [emitted]  main
   [0] ./app/js/application.js 30 bytes {0} [built]
✨  Done in 0.69s.
```

Now have a look at the newly created `dist/` directory, you will see a
`bundle.js` file inside.

Let's add an `index.html` file that will serve as the entry point to our
application by including the bundled JavaScript.

```html
// index.html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>A Map of Thrones</title>
  </head>
  <body>
    <div id="app" />
    <script src="dist/bundle.js" type="text/javascript"></script>
  </body>
</html>
```

Now open this file in your browser (`open index.html`) and open the developer
console (`⌘ + ⌥ + I` in Chrome on OS X). In the console you should see the "it's
working" log from our `application.js` file.

## Production build

We can now also test the production build by running

```bash
yarn build
```

Uh, oh. That didn't work. You will see the following output:

```bash
$ yarn build

yarn run v1.3.2
$ webpack -p
Hash: 3ac14d4cf932ecbadcb5
Version: webpack 3.8.1
Time: 71ms
    Asset    Size  Chunks             Chunk Names
bundle.js  2.5 kB       0  [emitted]  main
   [0] ./app/js/application.js 30 bytes {0} [built]

ERROR in bundle.js from UglifyJs
Unexpected character '`' [bundle.js:70,12]
error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

This is because in our `applicaton.js`, for the console.log, we are using a
[template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
to build the string. Since this is an ES6 feature and Webpack only supports ES5
and lower, the build will not work.

In the next step we will learn how to add support for Babel, which can transform
our ES6/7 code down to ES5.
