---
title: Testing the Map
step: 21
---

We will now go ahead and test the (unconnected) `Map` component. First create a
`__specs__` directory inside of `app/js/components/Map/` and add a file
`Map.spec.jsx` to it.

The first thing we need to do in a component test is import `React`, as with any
component.

We will also import the `shallow` function from enzyme which will allow us to
render the component for our test.

Next we will import the `Map` component that we want to test, along with the
mock data that we defined in the spec helper from the previous step.

```jsx
// app/js/components/Map/__specs__/Map.spec.jsx

import React from 'react';
import { shallow } from 'enzyme';

import { pointsMock } from '../../../spec-helper';
import { Map } from '../';
```

Next we will use a `describe` to set the context for the `Map` component. Inside
of this context we will have 2 additional `describe` calls that define 2
sub-contexts. One for when we have points on the map, one for where the map has
no data.

```diff
// app/js/components/Map/__specs__/Map.spec.jsx

  import React from 'react';
  import { shallow } from 'enzyme';

  import { pointsMock } from '../../../spec-helper';
  import { Map } from '../';

+ describe('Map component', () => {
+   describe('when there are no points');
+
+   describe('when there are points');
+ });
```

Inside of the first describe "when there are no points" we will define a test
expecting the mounted component to simply match the snapshot. We use the
`shallow` method and pass the `Map` component to it. We pass an empty array of
points to the `Map` so that we can test how the `Map` snapshot looks without any
data.

```diff
// app/js/components/Map/__specs__/Map.spec.jsx

  describe('Map component', () => {
-    describe('when there are no points');
+    describe('when there are no points', () => {
+     it('matches the snapshot', () => {
+       const wrapper = shallow(<Map points={[]} />);
+
+       expect(wrapper).toMatchSnapshot();
+     });
+   });

    describe('when there are points');
  });
```

Calling the Jest matcher `toMatchSnapshot` automatically generates a snapshot
and places it in a `__snapshots__` directory of your `__specs__` folder. The
first time you run the test the snapshot is generated. Every time the test is
run after that Jest matches the snapshot from the test against the one saved in
the project and the test fails if they have changed.

This means we can easily test if changes to our code have changed the way our
components render. If the changes to your component are expected though, for
example you have changed some text or added a new feature and you want to the
snapshot to reflect the new expected state you update all snapshots in your
project by running:

```bash
yarn test -- -u
```

This will run all tests again but tell Jest to update the snapshots, now your
tests will pass and the new component state will be saved for future test runs.

> _Note:_ It is important that you add your snapshot files to the git repository
> so that they are shared between all developers on the project.

Let's now add the second snapshot test for "when there are points".

```diff
// app/js/components/Map/__specs__/Map.spec.jsx

  describe('Map component', () => {
    describe('when there are no points', () => {
      it('matches the snapshot', () => {
        const wrapper = shallow(<Map points={[]} />);

        expect(wrapper).toMatchSnapshot();
      });
    });

-   describe('when there are points');
+   describe('when there are points', () => {
+     it('matches the snapshot', () => {
+       const wrapper = shallow(<Map points={pointsMock} />);
+
+       expect(wrapper).toMatchSnapshot();
+     });
+   });
  });
```

You can now run and you will see that all test pass. Additionally jest will tell
you `› 1 snapshot written.` in the output under the `Map.spec.jsx` file.

The snapshot can be viewed by opening the file
`app/js/components/Map/__specs__/__snapshots__/Map.spec.jsx.snap` which you will
see has the following contents:

```jsx
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[
  `Map component when there are no points matches the snapshot 1`
] = `<div />`;

exports[`Map component when there are points matches the snapshot 1`] = `
<div>
  <Connect(Pointer)
    details={
      Object {
        "house": "Night's Watch",
        "name": "The Wall",
        "words": "Night gathers, and now my watch begins.",
      }
    }
    favourite={true}
    id={1}
    key="1"
    x={450}
    y={110}
  />
  <Connect(Pointer)
    details={
      Object {
        "house": "Stark",
        "name": "Winterfell",
        "words": "Winter is Coming",
      }
    }
    favourite={false}
    id={2}
    key="2"
    x={375}
    y={355}
  />
</div>
`;
```

Notice that both snapshots from both test scenarios are in this file. The one
without data simply returns a `<div />` as our `Map` component is programmed to
do.

In the test where we pass our mock points data the snapshot shows us that the
`Map` component will return a connected `Pointer` component for each data item
and pass each of the data fields as a prop to the `Pointer`.

It is important that you really examine the snapshots generated by Jest so that
you can confirm your components are building the DOM that you expect.

We have now tested the unconnected version of the `Map`. In the next step we
will look at how to test connected components by mocking the Redux store.
