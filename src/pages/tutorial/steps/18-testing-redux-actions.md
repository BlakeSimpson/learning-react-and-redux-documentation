---
title: Testing Redux Actions
step: 18
---

The first item of our project we will be testing are the Redux actions.

As mentioned in the previous step all of our spec files will live in a
`__specs__` directory beside the files we are testing.

First of all let's create this directory.

```bash
mkdir app/js/actions/__specs__
```

In this directory we will create a file called `points.spec.js`. It is important
that spec files always end with `.spec.js` so that Jest can find them.

In this file we are going to import the two actions `addFavourite` and
`removeFavourite` from the actions implementation file so that we can test what
they return. We also import the two `ADD_FAVOURITE` and `REMOVE_FAVOURITE`
constants that define the action types.

```js
// app/js/actions/__specs__/points.spec.js

import { FAVOURITE_ADDED, FAVOURITE_REMOVED } from '../../constants';
import { addFavourite, removeFavourite } from '../';
```

Now we will begin by describing what we are testing. If you have used testing
libraries in the past this should look familiar to you. If not, the `describe`
is what we wrap around our tests to describe the context that we are testing in.
For example here we have a top level `describe` stating that we are testing the
points actions. We then have one context for each action, in this case "add" and
"remove". The purpose of this is that a correct message is built in the terminal
output while running your test that can easily be read. You will see this when
we run the test.

You will notice that the `describe` (and also `it` that we will use in a moment)
takes the description as the first argument and an arrow function as the second
which will be where all of our test code is defined.

```js
// app/js/actions/__specs__/points.spec.js

import { FAVOURITE_ADDED, FAVOURITE_REMOVED } from '../../constants';
import { addFavourite, removeFavourite } from '../';

describe('Points Actions', () => {
  describe('adding a favourite');
  describe('removing a favourite');
});
```

Now that we have our structure let's add the our test to for the "add" action.
We define this using the `it` function. We could also use the `test` keyword
since `it` is just an alias but the "it" allows you as a developer to read the
spec as a sentence.

> [the] Points Action adding a favourite, it builds the add action with the
> given ID in the payload.

Inside of the test we build a constant called `expected` which is the output we
expect to receive when we actually run the `addFavourite` action.

```diff
// app/js/actions/__specs__/points.spec.js

  describe('Points Actions', () => {
-    describe('adding a favourite');
+     it('builds the add action with the given ID in the payload', () => {
+       const expected = {
+         type: FAVOURITE_ADDED,
+         payload: {
+           id: 42
+         }
+       };
+     });
+
    describe('removing a favourite');
  });
```

Now we will run the `addFavourite` action, store the returned action object into
a constant called `result`, then check that this result matches our `expected`
value.

```diff
// app/js/actions/__specs__/points.spec.js

  describe('Points Actions', () => {
    describe('adding a favourite', () => {
      it('builds the add action with the given ID in the payload', () => {
        const expected = {
          type: FAVOURITE_ADDED,
          payload: {
            id: 42
          }
        };
+       const result = addFavourite(42);
+
+       expect(result).toEqual(expected);
      });
    });

    describe('removing a favourite');
  });
```

We use the Jest `expect` function to given our expectation we can then chain on
a "matcher" such as `toEqual` to complete the expectation. There are also
[other Jest matchers](https://facebook.github.io/jest/docs/en/expect.html) [^1]
such as `toContain` for arrays, `toHaveBeenCalled` for functions, and many more
that you should look over in order to test in different ways.

We can now run the tests in our terminal by running `yarn test`. You will see an
output similar to:

```bash
$ jest
 FAIL  app/js/actions/__specs__/points.spec.js
  Points Actions
    ✕ encountered a declaration exception (4ms)
    adding a favourite
      ✓ builds the action with the given ID in the payload (4ms)

  ● Points Actions › encountered a declaration exception

    TypeError: Cannot read property 'length' of undefined

      16 |     });
      17 |   });
    > 18 |   describe('removing a favourite');
      19 | });
      20 |

      at Env.describe (node_modules/jest-jasmine2/build/jasmine/Env.js:301:27)
      at Suite.<anonymous> (app/js/actions/__specs__/points.spec.js:18:3)
      at Object.<anonymous> (app/js/actions/__specs__/points.spec.js:4:1)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        0.758s, estimated 1s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

Although our test "builds the add action with the given ID in the payload"
passed it is complaining that we have a `describe` without a callback function.

In Jest you can always append the character "x" before a `describe`, `it`, or
`test` to mark it as pending, meaning Jest will ignore trying to run that code.
Add an "x" to the second describe.

```diff
// app/js/actions/__specs__/points.spec.js

   });

-   describe('removing a favourite');
+   xdescribe('removing a favourite');
  });
```

Run `yarn test` again and you will see the that our tests now succeed because
one is passing and the other is pending (waiting for implementation).

```bash
$ jest
 PASS  app/js/actions/__specs__/points.spec.js
  Points Actions
    adding a favourite
      ✓ builds the action with the given ID in the payload (4ms)
    removing a favourite
      ○ skipped 1 test

Test Suites: 1 passed, 1 total
Tests:       1 skipped, 1 passed, 2 total
Snapshots:   0 total
Time:        1.045s
Ran all test suites.
✨  Done in 1.64s.
```

Finally let's add the test for `removeFavourite`. We will remove the "x" from
the `xdescribe`, add a callback to the `describe`, add an `it` with an
appropriate description and define our test with an expectation and result.

```diff
// app/js/actions/__specs__/points.spec.js

- xdescribe('removing a favourite');
+ describe('removing a favourite', () => {
+   it('builds the remove action with the given ID in the payload', () => {
+     const expected = {
+       type: FAVOURITE_REMOVED,
+       payload: {
+         id: 42
+       }
+     };
+     const result = removeFavourite(42);
+
+     expect(result).toEqual(expected);
+   });
+ });
```

Run `yarn test` in your terminal once more and see that now we have 2 passing
tests.

```bash
$ jest
 PASS  app/js/actions/__specs__/points.spec.js
  Points Actions
    adding a favourite
      ✓ builds the add action with the given ID in the payload (7ms)
    removing a favourite
      ✓ builds the remove action with the given ID in the payload

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.515s
Ran all test suites.
✨  Done in 2.19s.
```

Now that the Redux actions are tested it makes sense to go onto the next step
and test our Redux reducer which the actions are associated with.
