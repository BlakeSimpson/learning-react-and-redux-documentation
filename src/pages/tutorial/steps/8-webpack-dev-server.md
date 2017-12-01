---
title: Webpack Dev Server
step: 8
---

The [webpack-dev-server](https://github.com/webpack/webpack-dev-server) is as
the name suggests, a development server that will run your Webpack build for
you. Basically this library will run `yarn dev` for you every time you save a
file in the project and automatically reload the changes in the browser.

The server is very easy to set up. All you have to do is install the package and
then alter the `package.json` script for `dev` and run the server instead of
Webpack directly.

```bash
yarn add --dev webpack-dev-server
```

```diff
// package.json

"scripts": {
-  "dev": "webpack -d",
+  "dev": "webpack-dev-server",
  "build": "webpack -p",
  "lint:all": "eslint app/js/*",
  "lint:fix": "eslint app/js/* --fix"
},
```

That's it!

Now run `yarn dev` (usually in it's own terminal tab, as the server process does
not end while active) and you will see an output similar too:

```bash
yarn run v1.3.2
$ webpack-dev-server
Project is running at http://localhost:8080/
webpack output is served from /dist/
webpack: wait until bundle finished: /dist/bundle.js
Hash: 056534b7d130126ce90b
Version: webpack 3.8.1
Time: 2497ms
              Asset     Size  Chunks                    Chunk Names
assets/westeros.jpg  3.37 MB          [emitted]  [big]
          bundle.js  1.07 MB       0  [emitted]  [big]  main
   [2] ./node_modules/react/index.js 190 bytes {0} [built]
  [18] multi (webpack)-dev-server/client?http://localhost:8080 ./app/js/application.js 40 bytes {0} [built]
  [19] (webpack)-dev-server/client?http://localhost:8080 7.95 kB {0} [built]
  [20] ./node_modules/url/url.js 23.3 kB {0} [built]
  [27] ./node_modules/strip-ansi/index.js 161 bytes {0} [built]
  [29] ./node_modules/loglevel/lib/loglevel.js 7.86 kB {0} [built]
  [30] (webpack)-dev-server/client/socket.js 1.05 kB {0} [built]
  [32] (webpack)-dev-server/client/overlay.js 3.73 kB {0} [built]
  [37] (webpack)/hot nonrecursive ^\.\/log$ 170 bytes {0} [built]
  [38] (webpack)/hot/log.js 1 kB {0} [optional] [built]
  [39] (webpack)/hot/emitter.js 75 bytes {0} [built]
  [41] ./app/js/application.js 420 bytes {0} [built]
  [45] ./node_modules/react-dom/index.js 1.36 kB {0} [built]
  [46] ./node_modules/react-dom/cjs/react-dom.production.min.js 92.7 kB {0} [built]
  [54] ./app/js/components/App/index.js 352 bytes {0} [built]
    + 49 hidden modules
webpack: Compiled successfully.
```

Now all you have to do is open http://localhost:8000/ in your browser and you
will see the map. You can now play around with making changes. Try changing the
background color from dark to light. Add some texts or other content to the page
and see watch how the changes are live reloaded.

When you are done, revert the changes you tested with (to the CSS for example)
and move on to step 9. It will be assumed from now on that the
`webpack-dev-server` is running at all times.
