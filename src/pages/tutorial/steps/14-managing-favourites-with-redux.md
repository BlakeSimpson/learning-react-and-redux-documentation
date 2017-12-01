---
title: Managing Favourites with Redux
step: 14
---

Now that we have Redux setup we will continue with this topic by adding Redux
actions that will be responsible for adding and removing favourites from our
state in the Redux store. This means that when we add a favourite on the map the
favourites list will automatically update.

## Adding out first Action

Let's begin by creating a directory in the application where all of our actions
will be stored.

```bash
mkdir app/js/actions
```

Next we will create an `index.js` file in this directory that will be
responsible for exporting all our actions from our various actions files.

Create the `index.js` file and export everything from the `points.js` file
(which we will create in a moment) using the `*` wildcard.

```js
// app/js/actions/index.js

export * from './points';
```

Next we will create the `points.js` file that will contain our actions related
to points. Let's start by creating an action called `addFavourite` which will
signal to our application that the user set a point on the map as a favourite,
allowing the application to update accordingly.

Redux actions are simply functions that return an object. The object must have a
key called `type` with a unique value identifying the action. It is standard to
name the type in uppercase.

The action object can also contain other information. For example in this case
we will store an entry called `index` in the action which will be the array
index of the point that should be marked as a favourite.

It is also a common standard to put additional information in a sub-object
called `payload` to differentiate it from the `type`.

Go ahead and add the `points.js` file with the `addFavourite` action.

```js
// app/js/actions/points.js

export const addFavourite = index => {
  return {
    type: 'FAVOURITE_ADDED',
    payload: {
      index: index
    }
  };
};
```

We are also going to need an action to tell the application that a favourite was
removed. Let's add a `removeFavourite` action. It will look similar to our "add"
action as it also needs the array index of the point to update.

```diff
// app/js/actions/points.js

  export const addFavourite = index => {
    return {
      type: 'FAVOURITE_ADDED',
      payload: {
        index: index
      }
    };
  };

+ export const removeFavourite = index => {
+   return {
+     type: 'FAVOURITE_REMOVED',
+     payload: {
+       index: index
+     }
+   };
+ };
```

#### Using Constants for Action Types

As was mentioned earlier, Redux action types have to be unique in case they
override each other. As it would be possible to have actions with duplicate
types as your application grows if you just use uppercase strings for the action
type, it is a common practise to introduce a "constants" file that defines all
shared constants for your Redux actions (as well as for other constants you need
to share). Let's create a `constants.js` file in the `app/js/` directory that
will define our action types. All constants in this file should be exported.

```js
// app/js/constants.js

export const FAVOURITE_ADDED = 'FAVOURITE_ADDED';
export const FAVOURITE_REMOVED = 'FAVOURITE_REMOVED';
```

We now need to import these constants as the action types into our points
actions.

```diff
// app/js/actions/points.js

+ import { FAVOURITE_ADDED, FAVOURITE_REMOVED } from '../constants';

  export const addFavourite = index => {
    return {
-     type: 'FAVOURITE_ADDED',
+     type: FAVOURITE_ADDED,
      payload: {
        index: index
      }
    };
  };

  export const removeFavourite = index => {
    return {
-     type: 'FAVOURITE_REMOVED',
+     type: FAVOURITE_REMOVED,
      payload: {
        index: index
      }
    };
  };
```

## Dispatching Actions

When an action is "dispatched" Redux sends the action to all reducers that were
passed to the store after being registered via `combineReducers`. This means
that multiple reducers can listen to one action and update the state.

For this reason it is good to design your actions and reducers in an idiomatic
manner [^1]. This means that you should design your actions to describe exactly
what the user is doing and allow your reducers to represent your data correctly
instead of simply mapping your actions to reducers. For example an application
may dispatch a `LOGOUT` action and multiple reducers will listen to this and
update the state. The "account" reducer could remove the logged in user ID, the
"basket" reducer would clear all items from the cart, a "navigation" reducer
would update the links shown on the navigation bar to the user.

This is preferable than having to dispatch 3 action `REMOVE_LOGGED_IN_USER_ID`,
`CLEAR_CART` and `UPDATE_NAVIGATION_LINKS` when the user clicks the logout
button.

#### Updating points

Now that our points actions are defined we need to wire them up to our connected
components. We will update the `Pointer` component so that instead of simply
updating it's internal `state` with the information weather a pointer is a
favourite or not it will dispatch one of our Redux actions, triggering the
points reducer to update the application state.

We dispatch an action by calling the `dispatch` method provided by Redux and
passing the returned object from our action to it. We cannot however simply
import the `dispatch` method from the Redux package and use it directly. Only
the Redux store has the `dispatch` method available and in a React application
we do not have direct access to the store. Instead we are given the `dispatch`
method as a prop to all connected components.

We could call `dispatch` directly from the props, for example:

```js
// Import the action to our component
import { myAction } from './actions';

// Inside of a connected component, `dispatch` is available as a prop.
this.props.dispatch(myAction());
```

However instead of using `dispatch` directly via the props we can map the
dispatch to actions when we connect the component. In the last step we saw that
you can pass a `mapStateToProps` function as the first argument to the `connect`
method. The second argument that `connect` accepts is a function called
`mapDispatchToProps`.

The `mapDispatchToProps` method gives us access to the `dispatch` method and
allows us to pass functions into our component as props that will automatically
dispatch our actions for us. Here is an example:

```jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { myAction } from './actions';

class MyComponent extends Component {
  render() {
    return <button onClick={() => this.props.triggerAction('foobar')}>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    triggerAction: text => dispatch(myAction(text))
  };
};

const ConnectedMyComponent = connect(null, mapDispatchToProps)(MyComponent);

export default ConnectedMyComponent;
```

In this example we import an action called `myAction` which we imagine accepts a
text string. We build a `mapDispatchToProps` function that returns a prop called
`triggerAction` which can take a `text` argument and will dispatch the
`myAction` action for us with the given text string. In the `connect` call we
first pass `null` since we don't have to map any state to props. If we did
though, we would pass the `mapStateToProps` function here instead. Inside the
component there is a `<button>` tag that when clicked calls the `triggerAction`
prop with a static text "foobar" which will cause the action to be triggered -
meaning all reducers will receive the `myAction` action.

Let's try it out by applying this to our `Pointer` component.

First we will import our add and remove favourite actions.

```diff
// app/js/components/Pointer/Pointer.jsx

  import React, { Component } from 'react';
  import PropTypes from 'prop-types';
  import classNames from 'classnames';

+ import { addFavourite, removeFavourite } from '../../actions';
  import styles from './Pointer.css';
```

We then have to connect the `Pointer` component with Redux.

```diff
// app/js/components/Pointer/Pointer.jsx

  import React, { Component } from 'react';
  import PropTypes from 'prop-types';
  import classNames from 'classnames';
+ import { connect } from 'react-redux';

+ import { addFavourite, removeFavourite } from '../../actions';
  import styles from './Pointer.css';

- class Pointer extends Component {
+ export class Pointer extends Component {
    ...
  }

+  const ConnectedPointer = connect()(Pointer);

-  export default Pointer;
+  export default ConnectedPointer;
```

We then update our `index.js` file of the `Pointer` component to manage the new
exports.

```diff
// app/js/components/Pointer/index.js

  export { default } from './Pointer';
+ export * from './Pointer';
```

Next we create our `mapDispatchToProps` function that creates props to add and
remove a favourite and pass it to `connect`.

```diff
// app/js/components/Pointer/Pointer.jsx

+ const mapDispatchToProps = dispatch => {
+   return {
+     addFavourite: index => {
+       dispatch(addFavourite(index));
+     },
+
+     removeFavourite: index => {
+       dispatch(removeFavourite(index));
+     }
+   };
+ };

- const ConnectedPointer = connect()(Pointer);
+ const ConnectedPointer = connect(null, mapDispatchToProps)(Pointer);
```

Due to the new props our `propTypes` definition will have to be updated. The
`index` prop will be the array index we want to update; this prop does not yet
exist but we will be passing this to the `Pointer` from the `Map` in a moment.

```diff
// app/js/components/Pointer/Pointer.jsx

  Pointer.propTypes = {
+   addFavourite: PropTypes.func,
+   removeFavourite: PropTypes.func,
+   index: PropTypes.number,
    details: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    favourite: PropTypes.bool
  };
```

We now must remove the internal `state` that managed wether the pointer should
be displayed as a favourite or not and replace this logic by calling our Redux
actions instead. Most of the changes are happening inside of the `favourite`
method that now will take the array `index` and based on wether the `favourite`
prop is currently true or false, call the `addFavourite` or `removeFavourite`
prop (which dispatched the matching action) and passes the `index` to it.

```diff
// app/js/components/Pointer/Pointer.jsx

class Pointer extends Component {
  constructor (props) {
    super(props);

    this.state = {
-     open: false,
-     favourite: props.favourite
+     open: false
    };

    this.toggle = this.toggle.bind(this);
    this.favourite = this.favourite.bind(this);
  }

  toggle (event) {
    event.preventDefault();

    if (event.target === event.currentTarget) {
      this.setState({ open: !this.state.open });
    }
  }

  favourite () {
-   this.setState({ favourite: !this.state.favourite });
+   const { index, favourite, removeFavourite, addFavourite } = this.props;
+
+   if (favourite) {
+     removeFavourite(index);
+   } else {
+     addFavourite(index);
+   }
  }

  render () {
-   const { x, y, details } = this.props;
+   const { x, y, details, favourite } = this.props;
    const { name, house, words } = details;

    const pointerClasses = classNames(styles.pointer, {
-     [styles.favourite]: this.state.favourite
+     [styles.favourite]: favourite
    });

    const detailsClasses = classNames(styles.details, {
      [styles.hidden]: !this.state.open
    });

    return (
      <div
        className={pointerClasses}
        style={{ left: x, top: y }}
        onClick={this.toggle}
      >
        <div className={detailsClasses}>
          <header className={styles.headline}>
            <h3>{name}</h3>
            <div className={styles.detailsControls}>
              <a href="#" className={styles.control} onClick={this.favourite}>
-               {this.state.favourite ? '–' : '+'}
+               {favourite ? '–' : '+'}
              </a>

              <a href="#" className={styles.control} onClick={this.toggle}>
                &times;
              </a>
            </div>
          </header>

          <p>House: {house}</p>
          <p>Words: {words}</p>
        </div>
      </div>
    );
  }
}
```

Finally we have to update the `Map` component to pass the array `index` that our
Redux actions rely on to our `Pointer` component as a prop.

```diff
// app/js/components/Map/Map.jsx

  export const Map = ({ points }) => {
    return (
      <div className={styles.map}>
-       {points.map((point, index) => <Pointer {...point} key={index} />)}
+       {points.map((point, index) => (
+         <Pointer {...point} index={index} key={index} />
+       ))}
      </div>
    );
  };
```

## Reacting to a Dispatched Action

The final task of this step is for our reducer to listen to the dispatched
actions and respond to them by changing the application state. This will have
the the effect of the whole application updating.

Currently our `points` reducer does not do anything when it receives and action.
The `switch` statement simply falls to the default case and returns the current
state. We will now update the reducer to have additional cases inside of the
`switch` statement that listen for the action types we dispatch.

Since our action types are defined in the `constants.js` file we will import
these and use them as the values we look for in the `switch`.

```diff
// app/js/reducers/points.js

+ import { FAVOURITE_ADDED, FAVOURITE_REMOVED } from '../constants';

  const initialState = [
    ...
  ];

  const points = (state = initialState, action) => {
    switch (action.type) {
+     case FAVOURITE_ADDED:
+     case FAVOURITE_REMOVED:
      default:
        return state;
    }
  };

  export default points;
```

Now when the `addFavourite` action is dispatched the `FAVOURITE_ADDED` case will
pick it up, just as the `removeFavourite` action will map to the
`FAVOURITE_REMOVED` case.

We now need to update the state being passed into the reducer based on our
action. We will use the `index` passed inside of the `payload` section of the
action to identify the item inside of the state we want to update and then
either set the `favourite` property of that item to either `true` or `false`,
depending on whether we want to add or remove the favourite.

It is important to know that reducers never simply update the `state`, they must
create a new `state` each time the data changes or the update will not be
applied. This concept is called "immutability" and it is how Redux knows wether
the state has actually changed or not.

> [A reducer] should be "pure", which means the reducer does not mutate its
> arguments. If the reducer updates state, it should not modify the existing
> state object in-place. Instead, it should generate a new object containing the
> necessary changes. The same approach should be used for any sub-objects within
> state that the reducer updates. [^2]

Therefore we cannot simply access the array index from the `state` argument and
change the `favourite` property but instead copy the item to update, modify it,
then create a new array of all of the original items including the updated one.

In order to simplify this we will add a function called `updateFavouriteState`
that will allow us to share this logic between the "add" and "remove" cases.

```diff
// app/js/reducers/points.js

+ const updateFavouriteState = (index, newValue, points) => {
+   const updatedPoint = points[index];
+   updatedPoint.favourite = newValue;
+
+   return [...points.slice(0, index), updatedPoint, ...points.slice(index + 1)];
+ };
+
  const points = (state = initialState, action) => {
+   let index;
+
    switch (action.type) {
     case FAVOURITE_ADDED:
+     index = action.payload.index;
+     return updateFavouriteState(index, true, state);
+
     case FAVOURITE_REMOVED:
+     index = action.payload.index;
+     return updateFavouriteState(index, false, state);
+
      default:
        return state;
    }
  };
```

The `updateFavouriteState` function accepts the array `index` to update, the new
value for the `favourite` property (`true` or `false`) and the `points` array,
which is the `state` passed to our reducer.

We then return a new array that has all of the points from before the index, the
updated item, and finally all of the items after the index. We use the ES7 `...`
spread operator that "spreads" multiple array items into an array and flattens
them. The final result is not an array of 3 arrays but a single array of all
items.

The Redux documentation contains many more of these
[immutable update patterns](https://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html)
and also contains patterns for other data types such as objects [^3].

That's it! If you now look at the browser and play with the map you will see
adding or removing a favourite place on the map will not only still update the
map marker colour but will also automatically add or remove the items from the
list underneath the map because all connected components are now reacting to our
dispatched actions and reading the new store state. If you are using the Redux
developer tools you will see the actions being dispatched every time you chang a
favourite state.

![Img: Viewing the Redux actions from the map with the redux-dev-tools](img/map-view-redux-actions.png)

In the next step we will give the favourites list with the ability to remove
favourites via Redux.

---

* <sup id="fn-1">[1]</sup>:
  https://egghead.io/courses/building-react-applications-with-idiomatic-redux
* <sup id="fn-2">[2]</sup>:
  https://redux.js.org/docs/recipes/reducers/PrerequisiteConcepts.html
* <sup id="fn-3">[3]</sup>:
  https://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html
