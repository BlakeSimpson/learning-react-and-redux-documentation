---
title: Testing the Favourites List
step: 24
---

We will now test the `FavouritesList` component. We will start with the
unconnected version before continuing to test the connected Redux state. Finally
we will discover how to test user interactions by simulating a click on the
remove button.

## Testing the Unconnected FavouritesList

The testing of the unconnected component should be coming familiar to you now.
We will follow the same pattern as we have done with the previous components,
this spec is especially similar to the `Map` spec.

First we import `React`, `shallow` from enzyme, the unconnected component we
want to test, and the mocked data.

We then defined our `describe` contexts with the tests defined with `it` inside
of them. We mount the components using `shallow` and use `expect` from Jest
along with the `toMatchSnapshot` matcher.

The only difference we have here is that the `FavouritesList` expects a prop
called `remove`, which if you remember, is the `removeFavourite` action being
passed to the component by Redux via the `mapDispatchToProps` function inside of
the component. Since we are not testing the Redux functionality here we can
simply pass an empty function that does nothing, since the `remove` prop will
not be called form this test. We call this function `noop` which is a convention
for a function that does nothing. It is short for "no operation".

```jsx
// app/js/components/FavouritesList/__specs__/FavouritesList.spec.jsx

import React from 'react';
import { shallow } from 'enzyme';

import { pointsMock } from '../../../spec-helper';
import { FavouritesList } from '../';

const noop = () => {};

describe('FavouritesList component', () => {
  describe('when there are no points', () => {
    it('matches the snapshot', () => {
      const wrapper = shallow(<FavouritesList points={[]} remove={noop} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When there are points', () => {
    it('matches the snapshot', () => {
      const wrapper = shallow(
        <FavouritesList points={pointsMock} remove={noop} />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
```

If you run the tests this new spec should be passing. You can take a look at the
snapshot to ensure the generated DOM is what you expect.

## Testing the Connected FavouritesList

We will continue as we did with the `Map` component by importing
`configureStore` as well as the connected version of the component.

We then define a new `describe` context at the bottom of the file that contains
the test which will build our mock store, pass the mock data as the store state,
mount the connected component using `shallow`, and finally expected that the
mounted component matches the snapshot.

```diff
// app/js/components/FavouritesList/__specs__/FavouritesList.spec.jsx

  import React from 'react';
  import { shallow } from 'enzyme';
+ import configureStore from 'redux-mock-store';


  import { pointsMock } from '../../../spec-helper';
- import { FavouritesList } from '../';
+ import ConnectedFavouritesList, { FavouritesList } from '../';

  const noop = () => {};

  describe('FavouritesList component', () => {
    describe('when there are no points', () => {
      it('matches the snapshot', () => {
        const wrapper = shallow(<FavouritesList points={[]} remove={noop} />);

        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('When there are points', () => {
      it('matches the snapshot', () => {
        const wrapper = shallow(
          <FavouritesList points={pointsMock} remove={noop} />
        );

        expect(wrapper).toMatchSnapshot();
      });
    });
  });
+
+ describe('ConnectedFavouritesList component', () => {
+   const mockStore = configureStore([]);
+   const store = mockStore({ points: pointsMock });
+
+   it('maps store state to the props', () => {
+     const wrapper = shallow(<ConnectedFavouritesList store={store} />);
+
+     expect(wrapper).toMatchSnapshot();
+   });
+ });
```

Run the tests again to ensure the connected spec is working as expected and your
snapshot file is re-written.

## Simulating User Interactions

The final step of testing the `FavouritesList` component is testing that when
the remove button is clicked, the `removeFavourite` redux action is dispatched.

We do this by first of all importing the `removeFavourite` action that we will
expect to be dispatched.

```diff
// app/js/components/FavouritesList/__specs__/FavouritesList.spec.jsx

  import { pointsMock } from '../../../spec-helper';
+ import { removeFavourite } from '../../../actions';
  import ConnectedFavouritesList, { FavouritesList } from '../';
```

Next we import the `mount` function from enzyme that will do a full mount of our
component, allowing us to trigger simulated events such as the button click.

```diff
// app/js/components/FavouritesList/__specs__/FavouritesList.spec.jsx

- import { shallow } from 'enzyme';
+ import { shallow, mount } from 'enzyme';
```

Finally we will add a new context and test inside of the
"ConnectedFavouritesList component" `describe` that will mount the connected
component using the `mount` function instead of `shallow`. We then use enzyme to
to search inside the mounted component (`wrapper`) for the first `<button>` tag
and simulate a click on it. It will find the first button in the list which is
associated with `point-1`.

We define in `expectedAction` that we expect the `removeFavourite` to be called
with the ID of our point. Finally we use Jest to `expect` that the actions that
been dispatched to the store match the ones we expected.

By doing this we don't only test that the `remove` prop has been called but that
the Redux action has actually been dispatched and will reach the reducers.

```diff
// app/js/components/FavouritesList/__specs__/FavouritesList.spec.jsx

  describe('ConnectedFavouritesList component', () => {
    const mockStore = configureStore([]);
    const store = mockStore({ points: pointsMock });

    it('maps store state to the props', () => {
      const wrapper = shallow(<ConnectedFavouritesList store={store} />);

      expect(wrapper).toMatchSnapshot();
    });
+
+    describe('when the delete button is clicked', () => {
+      it('calls the removeFavourite action', () => {
+        const wrapper = mount(<ConnectedFavouritesList store={store} />);
+        const expectedAction = [removeFavourite('point-1')];
+
+        wrapper.find('button').simulate('click');
+
+        expect(store.getActions()).toEqual(expectedAction);
+      });
+    });
  });
```

Run the tests again and you should see everything is passing. We are nearly
done! The final step is to test the `Pointer` component.
