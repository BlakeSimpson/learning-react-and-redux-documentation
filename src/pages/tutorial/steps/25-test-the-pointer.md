---
title: Testing the Pointer
step: 25
---

The final step in our testing will be to test the `Pointer` class. This is again
similar to the component testing we have been doing in the previous steps.

We will be testing the unconnected version of the component, the connected
version, testing that clicking the controls dispatches the correct Redux
actions, and also testing that clicking the open/close control toggles the
`Pointer` components internal "open" `state`.

## Testing the Unconnected Pointer

Add the usual imports and `describe` contexts for the spec which will we will
place at `app/js/components/Pointer/__specs__/Pointer.spec.jsx`.

We will define some mock data that will be used in the unconnected snapshot test
which allows us to define `noop` functions for the prop functions that Redux
would normally create for us.

```jsx
// app/js/components/Pointer/__specs__/Pointer.spec.jsx

import React from 'react';
import { shallow } from 'enzyme';

import { Pointer } from '../';

const noop = () => {};

const pointerProps = {
  addFavourite: noop,
  removeFavourite: noop,
  id: 42,
  x: 99,
  y: 88,
  details: {
    name: 'Winterfell',
    house: 'Stark',
    words: 'Winter is Coming'
  },
  favourite: true
};

describe('Pointer component', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<Pointer {...pointerProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
```

## Testing the Connected Pointer

Next we will import the `configureStore` method, the `pointsMock`, and check
that the connected `Pointer` matches the snapshot.

We also have to stub the `x`, `y`, and `details` props that are expected by our
`propTypes` with fake data because Redux does not pass these props to the
`Pointer` component for us but instead our `Map` component does. Remember that
the `Pointer` component does not have a `mapStateToProps` function.

```diff
// app/js/components/Pointer/__specs__/Pointer.spec.jsx

  import React from 'react';
  import { shallow } from 'enzyme';
+ import configureStore from 'redux-mock-store';

+ import { pointsMock } from '../../../spec-helper';
- import { Pointer } from '../';
+ import ConnectedPointer, { Pointer } from '../';

  const noop = () => {};

  const pointerProps = {
    addFavourite: noop,
    removeFavourite: noop,
    id: 'point-42',
    x: 99,
    y: 88,
    details: {
      name: 'Winterfell',
      house: 'Stark',
      words: 'Winter is Coming'
    },
    favourite: true
  };

  describe('Pointer', () => {
    it('matches the snapshot', () => {
      const wrapper = shallow(<Pointer {...pointerProps} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

+  describe('ConnectedApp', () => {
+    const mockStore = configureStore([]);
+    const store = mockStore({ points: pointsMock });
+
+    it('maps store state to the props', () => {
+      const wrapper = shallow(
+        <ConnectedPointer store={store} x={1} y={2} details={{}} />
+      );
+
+      expect(wrapper).toMatchSnapshot();
+    });
+  });
```

## Testing the Connected Controls

We will now test that clicking on the "favourite" toggle control will dispatch
the `addFavourite` or `removeFavourite` actions for us depending on the state of
our store.

We also introduce a `beforeEach` function that will clear the mock store of any
actions that were dispatched in a previous test, otherwise the actions stay in
the store and our expectations will not match.

The one thing we need to change in the actual `Pointer` component is the `<a>`
tag that we use for the "favourite" and "open/close" controls.

In order to target them in our tests we cannot simply search for "a" because
there are two of them. Instead we will update the `href` attribute to add an
identifier after the hash `#`. Update the `Pointer` component as so:

```diff
// app/js/components/Pointer/Pointer.jsx

  <header className={styles.headline}>
    <h3>{name}</h3>
    <div className={styles.detailsControls}>
-     <a href="#" className={styles.control} onClick={this.favourite}>
+     <a href="#favourite" className={styles.control} onClick={this.favourite}>
        {favourite ? '–' : '+'}
      </a>

-     <a href="#" className={styles.control} onClick={this.toggle}>
+     <a href="#toggle" className={styles.control} onClick={this.toggle}>
        &times;
      </a>
  </header>
```

We can now go ahead and implement the changes to our test.

```diff
// app/js/components/Pointer/__specs__/Pointer.spec.jsx

  import React from 'react';
- import { shallow } from 'enzyme';
+ import { shallow, mount } from 'enzyme';
  import configureStore from 'redux-mock-store';

  import { pointsMock } from '../../../spec-helper';
+ import { addFavourite, removeFavourite } from '../../../actions';
  import ConnectedPointer, { Pointer } from '../';

  ...

  describe('ConnectedPointer component', () => {
    const mockStore = configureStore([]);
    const store = mockStore({ points: pointsMock });

+   beforeEach(() => {
+     store.clearActions();
+   });
+
    it('maps store state to the props', () => {
      const wrapper = shallow(
        <ConnectedPointer store={store} x={1} y={2} details={{}} />
      );

      expect(wrapper).toMatchSnapshot();
    });

+   describe('when the favourite button is clicked', () => {
+     it('calls the removeFavourite action if the pointer is a favourite', () => {
+       const wrapper = mount(
+         <ConnectedPointer {...pointerProps} store={store} />
+       );
+       const expectedAction = [removeFavourite(42)];
+
+       wrapper.find('a[href="#favourite"]').simulate('click');
+
+       expect(store.getActions()).toEqual(expectedAction);
+     });
+
+     it('calls the addFavourite action if the pointer is a favourite', () => {
+       const updatedFavouriteState = { favourite: false };
+       const modifiedPointerProps = Object.assign(
+         {},
+         pointerProps,
+         updatedFavouriteState
+       );
+
+       const wrapper = mount(
+         <ConnectedPointer {...modifiedPointerProps} store={store} />
+       );
+       const expectedAction = [addFavourite(42)];
+
+       wrapper.find('a[href="#favourite"]').simulate('click');
+
+       expect(store.getActions()).toEqual(expectedAction);
+     });
+   });
+ });
```

## Testing Component state Changes

The final step will be to test that the `state` property updates when the
open/close toggle control is clicked on.

Since we do not need Redux to test this, these tests will be added inside the
unconnected `Pointer` context.

These tests are similar to the action tests we did previously. We mount the
component using `mount`, find the button we want to click on the rendered DOM,
and then simulate a click on it.

In this case though we will expect that the component `state` updates instead of
a Redux action being dispatched.

We can mock the `state` of the component by calling `.state()` on the wrapper
and passing an object of the state to be set, as you see in the "changes open
state to true, if it is false" test.

We can also get the current `state` of the component by asking for one of the
state keys, for example `wrapper.state('open');`.

We use this to form our expectations in each test scenario. Add the following
tests to the "Pointer component" context.

```diff
// app/js/components/Pointer/__specs__/Pointer.spec.jsx

  describe('Pointer component', () => {
    it('matches the snapshot', () => {
      const wrapper = shallow(<Pointer {...pointerProps} />);

      expect(wrapper).toMatchSnapshot();
    });

+   describe('when the toggle button is clicked', () => {
+     it('changes the open state to true, if it is false', () => {
+       const wrapper = mount(<Pointer {...pointerProps} />);
+
+       wrapper.find('a[href="#toggle"]').simulate('click');
+
+       expect(wrapper.state('open')).toEqual(true);
+     });
+
+     it('changes the open state to false, if it is true', () => {
+       const wrapper = mount(<Pointer {...pointerProps} />);
+
+       wrapper.setState({ open: true });
+       wrapper.find('a[href="#toggle"]').simulate('click');
+
+       expect(wrapper.state('open')).toEqual(false);
+     });
+   });
  });
```

That's everything! We have now tested all of our components. If we update our
components in a breaking way in the future the tests will fail and we will have
to update them to match the new state of the code, or if they are failing
unexpectedly we will know that a bug has been introduced to our application.

Run the tests once more with `yarn test` and see that everything including our
Redux actions and reducer are covered with passing specs.
