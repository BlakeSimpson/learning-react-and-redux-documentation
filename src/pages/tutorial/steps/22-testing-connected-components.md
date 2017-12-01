---
title: Testing Connected Components
step: 22
---

Testing components that are connected with Redux is a little tricker as you
cannot simply mount the component with enzyme until you have mocked the store,
otherwise errors will occur. In order to make this process simple we can use an
open source packages called `redux-mock-store`.

Let's get started by installing this to our development dependencies.

```bash
yarn add --dev redux-mock-store
```

No configuration is necessary so we can jump right back into the `Map` spec and
begin creating a mock store.

We will add a new top-level `describe` context to the spec which will concern
the connected version of the `Map`. This means we will also have to import the
`ConnectedMap` component.

```diff
// app/js/components/Map/__specs__/Map.spec.jsx

  import React from 'react';
  import { shallow } from 'enzyme';

  import { pointsMock } from '../../../spec-helper';
- import { Map } from '../';
+ import ConnectedMap, { Map } from '../';

  describe('Map component', () => {
    describe('when there are no points', () => {
      it('matches the snapshot', () => {
        const wrapper = shallow(<Map points={[]} />);

        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when there are points', () => {
      it('matches the snapshot', () => {
        const wrapper = shallow(<Map points={pointsMock} />);

        expect(wrapper).toMatchSnapshot();
      });
    });
  });
+
+ describe('ConnectedMap component', () => {});
```

We can now import the `configureStore` function from `redux-mock-store`. We call
this function and pass it Redux a list of middleware libraries that our
application uses. Since we do not have any custom middleware in this application
we will pass an empty array to `configureStore`. This function returns a new
function which we will name `mockStore` that allows us to build a mocked Redux
store. We can pass any data we want to the `mockStore` function and it will be
used as the store state. The returned value from `mockStore` is the Redux store
object which we must give to the connected component we want to test as a prop.

We will pass the `pointsMock` mock data as our store value. We must however pass
an object `{ points: pointsMock }` because we are telling the mock store that
the `pointsMock` array is the state of the `points` reducer. Basically, the keys
of the object you pass must match the reducer names that were defined in your
`combineReducers` call inside of `app/js/reducers/index.js`.

The final step, as with the unconnected components, is to mount the component
using `shallow` and tell Jest to expect the mounted component matches the
snapshot.

```diff
// app/js/components/Map/__specs__/Map.spec.jsx

  import React from 'react';
  import { shallow } from 'enzyme';
+ import configureStore from 'redux-mock-store';

  describe('ConnectedMap component', () => {
+   const mockStore = configureStore([]);
+   const store = mockStore({ points: pointsMock });
+
+   it('maps store state to the props', () => {
+     const wrapper = shallow(<ConnectedMap store={store} />);
+
+     expect(wrapper).toMatchSnapshot();
+   });
  });
```

If you run the tests with `yarn test` in your terminal you should see all tests
passing and a new snapshot for the connected component has been written.

Take a look at the
`app/js/components/Map/__specs__/__snapshots__/Map.spec.jsx.snap` file and you
will see the following snapshot has been written.

```jsx
exports[`ConnectedMap component maps store state to the props 1`] = `
<Map
  dispatch={[Function]}
  points={
    Array [
      Object {
        "details": Object {
          "house": "Night's Watch",
          "name": "The Wall",
          "words": "Night gathers, and now my watch begins.",
        },
        "favourite": true,
        "id": 1,
        "x": 450,
        "y": 110,
      },
      Object {
        "details": Object {
          "house": "Stark",
          "name": "Winterfell",
          "words": "Winter is Coming",
        },
        "favourite": false,
        "id": 2,
        "x": 375,
        "y": 355,
      },
    ]
  }
  store={
    Object {
      "clearActions": [Function],
      "dispatch": [Function],
      "getActions": [Function],
      "getState": [Function],
      "replaceReducer": [Function],
      "subscribe": [Function],
    }
  }
  storeSubscription={
    Subscription {
      "listeners": Object {
        "clear": [Function],
        "get": [Function],
        "notify": [Function],
        "subscribe": [Function],
      },
      "onStateChange": [Function],
      "parentSub": undefined,
      "store": Object {
        "clearActions": [Function],
        "dispatch": [Function],
        "getActions": [Function],
        "getState": [Function],
        "replaceReducer": [Function],
        "subscribe": [Function],
      },
      "unsubscribe": [Function],
    }
  }
/>
`;
```

Although we don't see the actual `Pointer` instances that the `Map` would
generate with this data as we can see in the unconnected snapshots, we do see
what information Redux is passing to the `Map`. The `store`,
`storeSubscription`, and `dispatch` props can be ignored as they are internals
of `react-redux` but we do see the `points` prop that Redux will automatically
pass into the `Map` component is the mock data that we expected from the store.
This tells us the `mapStateToProps` function from the `Map` is working
correctly.

We now know how to test connected and unconnected components. We will continue
in the next steps to cover the rest of our components, starting with the `App`.
