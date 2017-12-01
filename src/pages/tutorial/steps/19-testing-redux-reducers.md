---
title: Testing Redux Reducers
step: 19
---

We will be using a similar approach as the previous step to test our reducer. We
will first create a `__specs__` directory inside of the `app/js/reducers`
directory.

```bash
mkdir app/js/reducers/__specs__
```

We then create a file named `points.spec.js` inside of this that matches the
name of our reducer file that we will be testing.

In this file we will need to import the reducer we want to test along with the
actions that the reducer reacts to. We will also define the `describe` block for
our reducer.

```js
// app/js/reducers/__specs__/points.spec.js

import reducer from '../points';
import { addFavourite, removeFavourite } from '../../actions';

describe('Points Reducer', () => {});
```

Next we will define mock (fake) data that our test will use as the `state`
argument. This will be a very simple version of the `points` array.

```diff
// app/js/reducers/__specs__/points.spec.js

  describe('Points Reducer', () => {
+   let initialPoints = [
+     {
+       id: 'point-1',
+       favourite: false
+     },
+     {
+       id: 'point-2',
+       favourite: true
+     }
+   ];
  });
```

We then define our first test which tests the `default` case of the reducer. We
pass the `initialPoints` mock to the reducer as the `state` argument and and
empty object as the second `action` object. Since there is no action type the
reducers falls through to the `default` case of the `switch` statement and
simply returns the state. This means we can simple expected the given
`initialPoints` to be returned and nothing to have changed.

At this point you can start the Jest watcher in the terminal by running

```bash
yarn test:watch
```

```diff
// app/js/reducers/__specs__/points.spec.js

  describe('Points Reducer', () => {
    let initialPoints = [
      {
        id: 'point-1',
        favourite: false
      },
      {
        id: 'point-2',
        favourite: true
      }
    ];
+
+   it('returns the initial state', () => {
+     expect(reducer(initialPoints, {})).toEqual(initialPoints);
+   });
  });
```

We will now go ahead an define a new context for testing the Redux actions
passed to the reducer. In this section we will start with a test that marks
"point-1" as a favourite and our expectation will be that the `favourite: false`
turns to `favourite: true` inside of the initialPoints mock.

```diff
// app/js/reducers/__specs__/points.spec.js

  describe('Points Reducer', () => {
    let initialPoints = [
      {
        id: 'point-1',
        favourite: false
      },
      {
        id: 'point-2',
        favourite: true
      }
    ];

    it('returns the initial state', () => {
      expect(reducer(initialPoints, {})).toEqual(initialPoints);
    });

+   describe('favourites handling', () => {
+     it('can update a point to be a favourite', () => {
+       const action = addFavourite('point-1');
+       const result = reducer(initialPoints, action);
+       const expected = [
+         {
+           id: 'point-1',
+           favourite: true
+         },
+         {
+           id: 'point-2',
+           favourite: true
+         }
+       ];
+
+       expect(result).toEqual(expected);
+     });
+   });
  });
```

We can now write our final test for the "remove" action of the reducer. It is
similar to the "add" action except we will give the ID "point-2" to the action
and expect both `favourite` properties inside of `initialPoints` to be `false`.

```diff
// app/js/reducers/__specs__/points.spec.js

  describe('favourites handling', () => {
    it('can update a point to be a favourite', () => {
      const action = addFavourite('point-1');
      const result = reducer(initialPoints, action);

      let expected = [
        {
          id: 'point-1',
          favourite: true
        },
        {
          id: 'point-2',
          favourite: true
        }
      ];

      expect(result).toEqual(expected);
    });
+
+   it('can remove a point from being a favourite', () => {
+     const action = removeFavourite('point-2');
+     const result = reducer(initialPoints, action);
+     const expected = [
+       {
+         id: 'point-1',
+         favourite: false
+       },
+       {
+         id: 'point-2',
+         favourite: false
+       }
+     ];
+
+     expect(result).toEqual(expected);
+   });
  });
```

Although this test is written correctly if you look at the terminal you will see
the test is failing.

```bash
  ● Points Reducer › favourites handling › can remove a point from being a favourite

    expect(received).toEqual(expected)

    Expected value to equal:
      [{"favourite": false, "id": "point-1"}, {"favourite": false, "id": "point-2"}]
    Received:
      [{"favourite": true, "id": "point-1"}, {"favourite": false, "id": "point-2"}]

    Difference:

    - Expected
    + Received

    @@ -1,8 +1,8 @@
      Array [
        Object {
    -     "favourite": false,
    +     "favourite": true,
          "id": "point-1",
```

Although "point-2" has updated the `favourite` state to be `false`, "point-1" is
`true` even though we specified it should be `false` by default in the
`initialPoints` array at the top of the test.

This is because the tests are run in order and as the previous "can update a
point to be a favourite" test run it mutated the `initialPoints` mock.

We can fix this by adding a `beforeEach` function to our code that runs before
each individual test and allows us to set up the test scenario. In this case we
will always reset the `initialPoints` variable to be the initial mock that we
defined, so that any changes that happen throughout the test do not affect
subsequent tests.

```diff
// app/js/reducers/__specs__/points.spec.js


describe('Points Reducer', () => {
- let initialPoints = [
-   {
-     id: 'point-1',
-     favourite: false
-   },
-   {
-     id: 'point-2',
-     favourite: true
-   }
- ];

+ let initialPoints;
+
+ beforeEach(() => {
+   initialPoints = [
+     {
+       id: 'point-1',
+       favourite: false
+     },
+     {
+       id: 'point-2',
+       favourite: true
+     }
+   ];
+ });

  ...
});
```

The `let` is defined outside of the `beforeEach` or the variable would only be
available inside of the scope of the `beforeEach` function, instead of being
available to everything defined inside the `describe`.

Take a look at the terminal again and you will notice the Jest watcher has
re-run the test suite and now all tests are passing.

## Some Refactoring

Now that everything is working we can make a small refactoring to our spec. You
may notice that we repeat the mock data 3 times throughout the spec. In this
case it may be acceptable but if you image a spec with 10's or 100's of tests,
this could get out of hand, especially if you want to change the data structure
one day, you will have to refactor the code in many locations.

Now we will define a helper function inside of the spec that will build the mock
data structure for us. We will call it `buildPointsMock`. This functions accepts
2 arguments. The first is the boolean `true` or `false` state of the `favourite`
property for "point-1". The second argument is the same for "point-2".

```diff
// app/js/reducers/__specs__/points.spec.js

  import reducer from '../points';
  import { addFavourite, removeFavourite } from '../../actions';

+ const buildPointsMock = (firstFavouriteState, secondFavouriteState) => [
+   { id: 'point-1', favourite: firstFavouriteState },
+   { id: 'point-2', favourite: secondFavouriteState }
+ ];

  ...
```

We can then call this function to build our data structure instead of having
literal mock objects and expectations.

```diff
// app/js/reducers/__specs__/points.spec.js

  describe('Points Reducer', () => {
    let initialPoints;

    beforeEach(() => {
-     initialPoints = [
-       {
-         id: 'point-1',
-         favourite: false
-       },
-       {
-         id: 'point-2',
-         favourite: true
-       }
-     ];
+     initialPoints = buildPointsMock(false, true);
    });

    it('returns the initial state', () => {
      expect(reducer(initialPoints, {})).toEqual(initialPoints);
    });

    describe('favourites handling', () => {
      it('can update a point to be a favourite', () => {
        const action = addFavourite('point-1');
        const result = reducer(initialPoints, action);
-       const expected = [
-         {
-           id: 'point-1',
-           favourite: true
-         },
-         {
-           id: 'point-2',
-           favourite: true
-         }
-       ];
+       const expected = buildPointsMock(true, true);

        expect(result).toEqual(expected);
      });

      it('can remove a point from being a favourite', () => {
        const action = removeFavourite('point-2');
        const result = reducer(initialPoints, action);
-       const expected = [
-         {
-           id: 'point-1',
-           favourite: false
-         },
-         {
-           id: 'point-2',
-           favourite: false
-         }
-       ];
+       const expected = buildPointsMock(false, false);

        expect(result).toEqual(expected);
      });
    });
  });
```

This small refactoring has removed many lines from the file length and also
means that if we update our mock data structure we only have to do the update in
one place.

Check once more in the terminal that the watcher has run again and you will see
that the tests are still passing.

We can also run the Jest coverage task now to see what impact our action and
reducer tests have had. Stop the watcher with `cmd + c` or `ctrl + c` and run.

```bash
yarn test:coverage
```

An output similar to this will be shown:

```bash
$ jest --coverage
 PASS  app/js/reducers/__specs__/points.spec.js
 PASS  app/js/actions/__specs__/points.spec.js

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.769s
Ran all test suites.
---------------|----------|----------|----------|----------|----------------|
File           |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
---------------|----------|----------|----------|----------|----------------|
All files      |      100 |       75 |      100 |      100 |                |
 js            |      100 |      100 |      100 |      100 |                |
  constants.js |      100 |      100 |      100 |      100 |                |
 js/actions    |      100 |      100 |      100 |      100 |                |
  index.js     |      100 |      100 |      100 |      100 |                |
  points.js    |      100 |      100 |      100 |      100 |                |
 js/reducers   |      100 |       75 |      100 |      100 |                |
  points.js    |      100 |       75 |      100 |      100 |             87 |
---------------|----------|----------|----------|----------|----------------|
✨  Done in 2.60s.
```

You can see that we have very high code coverage across our actions and
reducers. This means that if we change them it is highly likely that a test will
fail and we know something has changed. It is them important to make sure the
tests stay up to date as your application grows.

You may notice that only the actions, constants, and reducer files are mentioned
here. This is because there are no tests regarding the components so Jest does
not even know they exist yet.

The final step to our testing will be to test our components. We will start
working on this in our next step.
