---
title: Testing with Jest
step: 17
---

Our _Map of Thrones_ application now has all of the features that we are going
to build. However we are not cowboys [^1] so we are going to make sure our
application is fully tested.

In the past testing was far less common for frontend software than for backend
software. Or at least if the frontend was tested, it was not fully covered. This
is usually due to the complexity of testing frontend code due to various
browsers, working with the DOM, network requests etc.

Luckily for us when we are working with React and Redux there are great open
source tools our there that will make the job of testing our application a lot
easier.

We will be using the [Jest](https://facebook.github.io/jest/) testing library
[^2] which will enable us to write tests for all of the aspects of our
application. Jest was written and maintained by Facebook, similar to React.

Although Jest can be used with other JavaScript frameworks and projects it goes
especially well with React due to it's "snapshot testing" which allows us to
record our expected component structure and watch if it changes unexpectedly.

Here is what the Jest website has to say about Jest:

> _Easy Setup_
>
> Complete and easy to set-up JavaScript testing solution. Works out of the box
> for any React project.
>
> _Instant Feedback_
>
> Fast interactive watch mode runs only test files related to changed files and
> is optimized to give signal quickly.
>
> _Snapshot Testing_
>
> Capture snapshots of React trees or other serializable values to simplify
> testing and to analyze how state changes over time.
>
> _Zero configuration testing platform_
>
> Jest is used by Facebook to test all JavaScript code including React
> applications. One of Jest's philosophies is to provide an integrated
> "zero-configuration" experience. We observed that when engineers are provided
> with ready-to-use tools, they end up writing more tests, which in turn results
> in more stable and healthy code bases.

## Installing Jest

Since Jest is designed to be "zero configuration" it means it is easy to setup.
We basically just have to install it, no large configurations are needed like
for Webpack or ESLint.

Let's go ahead and add `jest` to our development dependencies.

```bash
yarn add --dev jest
```

That's it. Jest is now installed and ready to use.

## Preparing our Application

Although we do not need to configure Jest itself we will add a few configuration
changes to the application that will make working with Jest easier.

#### ESLint environment for Jest

Since Jest has a few global variables such as `test`, `it`, `describe`, etc. we
do not want ESLint to complain that these variables are undefined. We can fix
this by telling ESLint that our environment now contains Jest. Update the
`.eslintrc.js` file with to add an `env` key.

```diff
// .eslintrc.js

  module.exports = {
    extends: ['standard', 'plugin:react/recommended'],
    plugins: ['react', 'import'],
    rules: {
      semi: ['error', 'always']
    },
+   env: {
+     jest: true
+   }
  };
```

#### Yarn Scripts

We will also add a few new scripts to the `"scripts"` section of the
`package.json` that will allow us to run Yarn in different modes. Update the
`package.json` with the follow 3 new scripts.

```diff
// package.json

  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack -p",
    "lint:all": "eslint app/js/*",
-    "lint:fix": "eslint app/js/* --fix"
+    "lint:fix": "eslint app/js/* --fix",
+    "test": "jest",
+    "test:watch": "jest --watch",
+    "test:coverage": "jest --coverage"
  },
```

You can already test this by running, for example, `yarn test:coverage` in the
terminal and you will see an output telling you that no tests were found.

```bash
yarn run v1.3.2
$ jest
No tests found
  21 files checked.
  testMatch: **/__tests__/**/*.js?(x),**/?(*.)(spec|test).js?(x) - 0 matches
  testPathIgnorePatterns: /node_modules/ - 21 matches
Pattern:  - 0 matches
error Command failed with exit code 1.
```

You may notice that Jest also has a "watch" mode which means Jest will stay
running in the terminal and re-run the tests relevant to any project files that
are saved. For example, imagine we had written a test for the `Pointer`
component and also a test for the points actions. If we then updated the
`addFavourite` action in the `app/js/actions/points.js` file Jest would
automatically run the actions tests as well as `Pointer` component tests since
the component uses that action - but Jest would not run any other tests that
were irrelevant.

## Jest Test Structure for React Applications

Unlike testing libraries you may be familiar with we will not be putting all of
our specs into a global `specs/` or `tests/` directory.

> _Note:_ "spec" is short for "specification" because spec files specify how our
> software should act - our tests are defined in the spec files.

Instead each directory of the application that contains code we want to test
will have its own specs directory named `__specs__`. The underscores before and
after "specs" are a common software development pattern to signal that this is
not regular application code, since the tests are inside of the `app/`
directory. Jest inherited this pattern from the Python programming language and
also uses it as a standard.

The idea of keeping your tests inside of your application can seem a little
strange at first but makes a lot of sense for component based applications. For
example our `Map` component has the following structure

```bash
- app/js/component/Map
  |
  -- index.js
  -- Map.jsx
  -- Map.css
```

We will then add the `__specs__` directory inside of this component.

```bash
- app/js/component/Map
  |
  -- index.js
  -- Map.jsx
  -- Map.css
     |
     __specs__
       |
       - Map.spec.jsx
```

The advantage of this is that if you extract the `Map` component from the
application and into another one, or you publish it as a standalone node module,
the tests are already bundled with the component instead of being bound to your
project.

In JavaScript having the specs close to the implementation files also has the
advantage that importing the source objects is easier as the relevant import
files are not so far away in the directory structure. e.g. `import foo from
'../foo';` as opposed to `import foo from '../../../../app/actions';`.

Now that we are ready to start testing. In the next step we will being writing
specs, starting with our Redux actions.

---

* <sup id="fn-1">[1]</sup>: https://en.wikipedia.org/wiki/Cowboy_coding
* <sup id="fn-2">[2]</sup>: https://facebook.github.io/jest/
