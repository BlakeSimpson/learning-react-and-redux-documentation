---
title: Managing Favourites with Redux
step: 14
---

Now that we have Redux setup we will continue on the Redux topic by adding Redux
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

As was mentioned, Redux actions types have to be unique in case they override
each other. As it would be possible to have actions with the same names as your
application grows if you just use uppercase strings for the action type it is a
common practise to introduce a "constants" file that defines all shared
constants for your Redux actions (as well as for other constants you need to
share). Let's create a `constants.js` file in the `app/js/` directory that will
define our action types. All constants in this file should be exported.

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

When an action is "dispatched", Redux sends the action to all reducers that were
passed to the store after being registered via of `combineReducers`. This means
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

---

* <sup id="fn-1">[1]</sup>:
  https://egghead.io/courses/building-react-applications-with-idiomatic-redux
