---
title: Preparing Component testing with Jest
step: 20
---

Before we actually begin to write component test we will add some extra
configuration for Jest to make this easier for us. As mentioned earlier, Jest is
a zero-configuration library so these steps are not strictly necessary. Jest can
automatically create and match snapshots of our components but with these
improvements the snapshots that are generated will be much easier for us as a
developer to read and compare.

We are also going to include an open source library called `enzyme` that will
help us to mount our components in isolation and provide us with the ability to
interact with them, clicking on controls and testing the expected results,
instead of simply generating a snapshot of the returned JSX.

A configuration will also be added to tell Jest that we are using CSS modules so
that it can parse our components without encountering an error.

Finally we will create a spec helper file that is available to all tests so that
some configuration and mock data can be shared.

## Enzyme

The [enzyme](https://github.com/airbnb/enzyme) package allows us to work with
components inside of tests by either creating a "shallow" version of it (only
the tested component will be rendered) or "mount" the full DOM (the component
and all of it's children are rendered. Additionally you can interact with the
component by simulating events such as a "click").

We will first install this as a development dependency. Since we are using React
version 16 we also need to install the `enzyme-adapter-react-16` package.

```bash
yarn add --dev enzyme enzyme-adapter-react-16
```

Normally enyzme would not need any configuration but as mentioned we need the
`enzyme-adapter-react-16` adapter for enzyme due to our React.js package
version. This means that in every test file where we use enzyme we would have to
import the adapter and instruct enzyme to use it. Instead of copying this to
every file we can inform Jest that we have a "spec helper" file. This file will
automatically be loaded into every test file in the project making it the ideal
place to place shared configuration.

Let's create a `spec-helper.js` file in the `app/js/` directory. Here we will
import the React 16 enzyme adapter, the `configure` method from enzyme and apply
the configuration.

Additionally we need to import a polyfill [^2] for the `requestAnimationFrame`
method. This package already comes ad a dependency from enzyme so we do not need
to install anything additionally. This polyfill is required to handle warnings
given by React 16 when mounting our components.

```js
// app/js/spec-helper.js

import 'raf/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

The final step is to inform Jest about our spec helper location. We do this by
creating a `jest` section in our `package.json` and passing the location of the
file to the `setupTestFrameworkScriptFile` key.

```diff
// package.json
  ...
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack -p",
    "lint:all": "eslint app/js/*",
    "lint:fix": "eslint app/js/* --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
+ "jest": {
+   "setupTestFrameworkScriptFile": "./app/js/spec-helper.js"
+ },
  ...
```

## Changing the Snapshot Serializer

By default when you "snapshot" a component you creates a representation of the
JSX returned by the component and writes it to a snapshot file. The default
snapshots from Jest can be quite verbose and hard to read. They can also cause
problems across different systems just as Mac OS X and Linux as they are
generated slightly differently.

We can create simpler snapshots that are constant across systems by adding the
package `enzyme-to-json`. This plugin takes the components that we will be
mounting with `enzyme` and overrides the default snapshot that Jest would have
made.

We will install it as a development dependency with Yarn.

```bash
yarn add --dev enzyme-to-json
```

We then simply have to update the `"jest"` section of our `package.json` again
with a new configuration key `snapshotSerializers` which accepts an array of
serializers to be used.

```diff
// package.json

  "jest": {
-    "setupTestFrameworkScriptFile": "./app/js/spec-helper.js"
+    "setupTestFrameworkScriptFile": "./app/js/spec-helper.js",
+    "snapshotSerializers": ["enzyme-to-json/serializer"]
  },
```

## CSS Modules and Jest

So that Jest can understand that we are using CSS modules we must install the
`jest-css-modules` package.

```bash
yarn add --dev jest-css-modules
```

Again we update the `"jest"` section of the `package.json` to tell Jest to run
all test files through the `jest-css-modules` parser, which will prevent any
errors from occurring while running tests.

```diff
  "jest": {
    "setupTestFrameworkScriptFile": "./app/js/spec-helper.js",
-   "snapshotSerializers": ["enzyme-to-json/serializer"]
+   "snapshotSerializers": ["enzyme-to-json/serializer"],
+   "transform": {
+     ".*": "./node_modules/jest-css-modules"
+   }
  },
```

## Shared Mock Data

Finally we will will add some mock data for the `points` array to the spec
helper so that it can be shared across all specs, instead of defining mock data
in every file. This prevents us from having to go through all tests are update
the mock data structure if our data changes.

Add the following mock data to `spec-helper.js`.

```diff
// app/js/spec-helper.js

  import 'raf/polyfill';
  import { configure } from 'enzyme';
  import Adapter from 'enzyme-adapter-react-16';

  configure({ adapter: new Adapter() });

+ export const pointsMock = [
+   {
+     id: 'point-1',
+     x: 450,
+     y: 110,
+     details: {
+       name: 'The Wall',
+       house: "Night's Watch",
+       words: 'Night gathers, and now my watch begins.'
+     },
+     favourite: true
+   },
+   {
+     id: 'point-2',
+     x: 375,
+     y: 355,
+     details: {
+       name: 'Winterfell',
+       house: 'Stark',
+       words: 'Winter is Coming'
+     },
+     favourite: false
+   }
+ ];
```

Now we everything we need to complete our testing is ready. We'll continue in
the next step by testing the `Map` component.

---

* <sup id="fn-1">[1]</sup>:
  https://facebook.github.io/jest/docs/en/snapshot-testing.html
* <sup id="fn-2">[2]</sup>: https://en.wikipedia.org/wiki/Polyfill_(programming)
