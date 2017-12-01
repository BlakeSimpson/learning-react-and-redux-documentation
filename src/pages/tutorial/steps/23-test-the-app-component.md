---
title: Testing the App Component
step: 23
---

We will now test the `App` component of our application. As this is not a
connected component the spec for the `App` will simply a single snapshot test.

Create the `__specs__` directory inside of `app/js/components/App/` and add the
file `App.spec.jsx`.

We will then simply import `shallow`, the `App` component, and write a test
expecting the mounted component to match the Jest snapshot.

```jsx
// app/js/components/App/__specs__/App.spec.jsx

import React from 'react';
import { shallow } from 'enzyme';

import App from '../';

describe('App', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
```

That's all we have to do. Make sure to run the tests and ensure they are passing
and that the snapshot is written before continuing to the next step.
