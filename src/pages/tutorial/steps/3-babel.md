---
title: Setting up Babel
step: 3
---

As we saw in step 2 we can now bundle our scripts together using Webpack but if
we have any ES6 syntax in our source files the production build will fail.

We will now tell Webpack to run all of our files through
[Babel](https://babeljs.io/) which will transform the syntax from the ES6 we
write in our editor down to ES5 that Webpack and the browser can understand.

## Webpack Loaders

Webpack loaders are like tasks in other build systems. As Webpack is compiling
your bundled application loaders can transform certain files. For example, you
may have a loader to Base64 inline images into CSS files.

There are many Webpack loaders available, for a list of some of the main loaders
available, see the
[Webpack loaders list](https://webpack.github.io/docs/list-of-loaders.html).

## Babel Loader

We will be using the Babel loader to transform ES6 to ES5. Installing the Babel
Webpack loader is not enough to get everything transformed. We also need to
install `babel-core`, the package that provides Babel itself as well as "Babel
presets" which are a group of plugins that tell Babel how to transform your
JavaScript. We will use 2 presets `babel-preset-es2015` (which transforms ES6
syntax to ES5) and `babel-preset-react` which allows Babel to handle the JSX
syntax that React uses.

We will start by adding these dependencies via yarn:

```bash
yarn add babel-core babel-preset-es2015 babel-preset-react babel-loader
```

Next we have to configure Babel by telling it which presets to use. This is done
in a file called `.babelrc`. Let's create that file and add the following
configuration:

```js
// .babelrc

{
  "presets" : ["es2015", "react"]
}
```

Babel is now ready to run, we now need to configure Webpack to use the
`babel-loader`. This is done by adding the `module` key to our Webpack config.
We then define an array of `loaders`. This array means many loaders can be added
but for now we will start with just one. Add the following code to the bottom of
the `config` object in your `webpack.config.js`:

```diff
// webpack.config.js

  const config = {
    entry: JS_DIR + '/application.js',
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
    },
+   resolve: {
+     extensions: ['.js', '.jsx']
+   },
+   module: {
+     loaders: [
+       {
+         test: /\.jsx?/,
+         include: JS_DIR,
+         loader: 'babel-loader'
+       }
+     ],
+   }
  };
```

This code is telling Webpack to look for all files inside our JavaScript
directory ending with `.js` or `.jsx`. As mentioned earlier, React uses a
special JSX syntax that basically combines JavaScript and HTML. We will look
further into this in the next steps.

We then specify which loader should be applied to the files that match the
`test` so we specify `loader: 'babel-loader'`.

After adding this configuration, we can now run the production build and now it
will succeed. Test it by running:

```bash
yarn build
```

You will see an output similar to:

```bash
yarn run v1.3.2
$ webpack -p
Hash: f851c2f7d8b874af6a9e
Version: webpack 3.8.1
Time: 615ms
    Asset       Size  Chunks             Chunk Names
bundle.js  522 bytes       0  [emitted]  main
   [0] ./app/js/application.js 44 bytes {0} [built]
✨  Done in 1.33s.
```

You will notice that the file `dist/bundle.js` is now minified and optimised for
a production environment.

In the next step we will add ESLint and Prettier to the project so that we have
linting available as we continue and we will no longer have to worry about code
formatting.
