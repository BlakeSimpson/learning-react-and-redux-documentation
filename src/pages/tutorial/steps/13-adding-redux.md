---
title: Starting with Redux
step: 13
---

Redux is a technology, or better thought of as an architecture, for managing
state within a JavaScript application. The architecture was originally developed
around the idea of [flux](https://facebook.github.io/flux/) but simplifies it a
little. Redux is commonly used with larger React projects in order to centralise
the management of data.

Here is the introduction to Redux given on the
[official Redux website](https://redux.js.org/):

> Redux is a predictable state container for JavaScript apps. (Not to be
> confused with a WordPress framework – Redux Framework.)

> It helps you write applications that behave consistently, run in different
> environments (client, server, and native), and are easy to test. On top of
> that, it provides a great developer experience, such as live code editing
> combined with a time traveling debugger.

Redux can seem quite complicated if you have never worked with it before but
once you start to understand the concepts, it begins to make scaling your
application simple. Although we will be learning as we go along, in order to
understand the fundamentals of Redux I would highly recommend reading the
[Redux basics](https://redux.js.org/docs/basics/) section of the documentation
to understand the terminology such as action, reducer, and store before going
forward.

## Adding Redux to a React Application

Redux is often overused for smaller applications, so always consider if you
really need it. For this simple map application we could probably live without
Redux but for the sake of learning we will convert our application to use it.

#### Installing Redux

The first step we will have to take is to add the necessary redux packager to
our dependencies. We will be adding `redux` and since we plan to us redux with
React, we will also add `react-redux` that provides us with certain helpers.

```bash
yarn add redux react-redux
```

#### Connecting the Data

Assuming that you are familiar with the Redux basics, we will first of all move
our `points` data out of the `App` component and into a points reducer. Reducers
take our data, better know an "state", and based on Redux actions they mutate
the state and return the new representation.

Although reducers are not responsible for storing the data itself (this is the
responsibility of the store), they do provide the initial state of an empty
application. Normally you would not put all of your data (our points) in the
initial state but rather an empty array and then load your data from a backend
API; We will however use the initial state to store our data since this is an
example app without a backend.

We will begin be creating a directory our reducers.

```bash
mkdir app/js/reducers
```

We will then create a reducer with the filename `points.js` inside of this
directory. We will start be creating the reducer function `points()` that
accepts the state and an action. We will make this function the default export.

```js
// app/js/reducers/points.js

const points = (state, action) => {};

export default points;
```

Reducers should then contain a `switch` statement that switches over the action
type and decided how to change the `state`. In this step we will not implement
any actions so for now we will just have the `default` switch case which in a
reducer will always return the state as-is. Update your reducer as so:

```js
// app/js/reducers/points.js

const points = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default points;
```

To finish off this reducer, we will now apply our initial state which as was
already discussed will be the `points` array that is currently in the `App`
component. Cut this array out of the `App` and move it to the reducer above the
reducer function and name it `initialState`. We then pass `initialState` as the
default state value of the reducer.

```diff
// app/js/reducers/points.js

+ const initialState = [
+   ... // This array is the points array from your <App /> component
+ ];

- const points = (state, action) => {
+ const points = (state = initialState, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  export default points;
```

## Combining Reducers

Although we can separate our data handling up in to different reducers, when you
create a redux store your can only pass one "combined reducer". This means that
we use a Redux helper that will take al of our reducers and combine them
together into one large object that the store can work with.

This is usually done in an `index.js` file within your `reducers` directory. The
index file imports all reducers, combines them, and then exports the combined
reducer. Even though we only have one reducer so far we still need to return a
combined version so we will do that now.

```js
// app/js/reducers/index.js

import { combineReducers } from 'redux';

import points from './points';

export default combineReducers({
  points
});
```

## Creating the Store

As mentioned in the last section, the Redux store needs a combined reducer in
order to be created. Now that our reducer is ready we can go ahead and create
the store which will hold all of our state (data).

We will do this in the top level `application.jsx` file as it is the root of our
application where we render the `App` component.

First we import the `createStore` helper from Redux. We then import our combined
reducers from the `reducers` directory and create a `store` constant.

```diff
// app/js/application.jsx

  import React from 'react';
  import { render } from 'react-dom';
+ import { createStore } from 'redux';

  import App from './components/App';
+ import reducers from './reducers';

+ const store = createStore(
+   reducers
+ );

  render(<App />, document.getElementById('app'));
```

In order to make React aware of the redux store we have to use a helper
component from the `react-redux` package called `<Provider />`. The `Provider`
is a higher-order component (HoC) [^1] that wraps around our application and
passes props down to our child components for us.

Basically the `Provider` makes the `store` that we pass to it available to its
children components so that they can access that store later. Update the
`application.jsx` to implement a `Provider`:

```diff
// app/js/application.jsx

  import React from 'react';
  import { render } from 'react-dom';
  import { createStore } from 'redux';
+ import { Provider } from 'react-redux';

  import App from './components/App';
  import reducers from './reducers';

  const store = createStore(
    reducers
  );

-  render(<App />, document.getElementById('app'));
+  render(
+    <Provider store={store}>
+      <App />
+    </Provider>,
+    document.getElementById('app')
+  );
```

#### Redux Developer Tools

If you have not yet installed them the
[redux developer tools](https://github.com/zalmoxisus/redux-devtools-extension)
integrate into the browser developer tools and lets you debug how your redux
actions and state is changing. I would recommend installing the extension for
your preferred browser.

In order to be able to use the Redux dev tools, they must be configured when
creating your store. This can be done like so:

```diff
// app/js/application.jsx

  const store = createStore(
    reducers,
+   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
```

## Connected Components

In order for your components to get information from the store you must
"connect" them with the redux store. There is an aptly named `connect` helper
provided by the `react-redux` package for this purpose.

Basically instead of simply exporting the component from your JSX file, you will
export a version of the component wrapped by the `connect` method.

The `connect` method allows you to pass a function called `mapStateToProps` that
will as the name suggests, takes state from the Redux store and then make it
available to your component via React props.

This is an example of how that would look:

```jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyComponent extends Component {
  render() {
    return <h1>Hello {this.props.accountName}</h1>;
  }
}

const mapStateToProps = state => {
  return {
    accountName: state.account.name
  };
};

const ConnectedMyComponent = connect(mapStateToProps)(MyComponent);

export default ConnectedMyComponent;
```

In this example we imagine that there is a reducer called "account" that has a
property called `name` inside of its state. The `mapStateToProps` function
accepts the `state` argument which is a representation of the entire Redux store
(all combined reducers), we then return the props that will be passed into the
component. In this case we only return one prop `accountName`. Whenever the
store changes (a Redux action was dispatched and the stored data has changed)
then all connected components will be triggered with an update so that the props
will be updated with the new data and the React life-cycle will trigger again,
just as if you had called `setState` - therefore the `render` method is called
again and the new account name is displayed on the screen.

#### Connecting the map

That may be a lot to take in so it is best if we learn by implementing a
connected component within our application. We will start by connecting the
`Map` component to Redux so that we can access the `points` array.

As in the previous example we will first import the `connect` method, build a
`mapStateToProps` function and create a new constant called `ConnectedMap`.

```diff
// app/js/components/Map/Map.jsx

  import React from 'react';
  import PropTypes from 'prop-types';
+ import { connect } from 'react-redux';

  import Pointer from '../Pointer';
  import styles from './Map.css';

  const Map = ({ points }) => {
    return (
      <div className={styles.map}>
        {points.map((point, index) => <Pointer {...point} key={index} />)}
      </div>
    );
  };

  Map.propTypes = {
    points: PropTypes.arrayOf(PropTypes.object)
  };

+ const mapStateToProps = state => {
+   return {
+     points: state.points
+   };
+ };

+ const ConnectedMap = connect(mapStateToProps)(Map);

- export default Map;
+ export default ConnectedMap;
```

We have now connected the `Map` with Redux. The `mapStateToProps` function will
ensure that the `Map` component always has a prop called `points`, which is the
result of the points reducer. As you hopefully remember from implementing the
reducer earlier, the reducer simply returns the `points` array that we have been
working with, which will be the value of the `points` prop.

#### Separating Presentation from Logic

We now export the connected component as the default export. At this point is
worth mentioning that it is normal to create a distinction between presentation
components and connected components in Redux applications. There is a an article
titled "Presentational and Container Components" [^2] by Dan Abramov, the
creator of Redux, where he explains the concept of splitting presentational
components (the ones that describe how things look, are styled, etc.) from the
"container" components, which are components that are connected to redux using
the `connect` method.

In this manner, it is common in Redux applications for developers to put all
connected components in a directory called "containers" and have these
components connect with the store, convert the state to props and then the
container is responsible for delegating those props down to the presentational
components.

In my experience I use a different approach which does not separate the
components as much. Instead of having "containers" and "components" directories
I instead have everything in the "components" directory as it is now and simple
export both a connected and unconnected version of each component. Some
components never need to be connected, in which case only the "presentational"
component is exported.

For example, if we look again at the earlier example where we examined how
`connect` works, the original component (the presentational component) was
called `MyComponent`. We then create a new constant called
`ConnectedMyComponent` that was wrapped by `connect`.

What I would now do is export both of these components from the file. The
connected version being the `default` and the presentational component being an
extra export.

```diff
  ...

-  class MyComponent extends Component {
+  export class MyComponent extends Component {
    render() {
      return <h1>Hello {this.props.accountName}</h1>;
    }
  }

  ...

  const ConnectedMyComponent = connect(mapStateToProps)(MyComponent);

  export default ConnectedMyComponent;
```

This means you can import either the presentation or connected version from the
same file.

```jsx
import ConnectedMyComponent from './MyComponent';
// or
import { MyComponent } from './MyComponent';
```

The advantages of this approach are that it removes the complexity of having to
consider which components are containers that only access the store and which
ones are presentational. As your application grows certain components suddenly
need to access the store and it can be a pain to differentiate them. You do not
need to move components between directories as your application grows and
changes, also.

This approach has worked well in my experience for smaller applications. Of
course it may be advantageous to use the approach Dan Abramov explains for
larger applications. Due to the harder separation of presentation components,
they can become more reusable. I try to design my components to be reusable even
if they are connected or not however, so for the example here let us explore
this slightly less orthodox approach to connected components.

#### Multiple Exports for the map

So after seeing the example of exporting connected and unconnected version of a
component, let's apply this to our `Map`. First we will export the raw `Map`
class from the `Map.jsx` file.

```diff
// app/js/components/Map/Map.jsx

- const Map = ({ points }) => {
+ export const Map = ({ points }) => {
```

We will then have to update the `index.js` file within the Map component to
export not only the `default` export from `Map.jsx` but also all other exports.
We use the `*` wildcard so that the `Map` export is automatically exported along
with any other exports we may define in the future, meaning we will no longer
need to update the `index.js` file.

```diff
// app/js/components/Map/index.js

  export { default } from './Map';
+ export * from './Map';
```

Although we will not be using the unconnected `Map` export right now, we will
set up this pattern of exporting both versions of the component. This will come
in very useful when we get to the steps concerning testing where we need to test
the connected and unconnected versions separately.

## Connecting the FavouritesList

Since the `FavouritesList` component also relays on the `points` array, we will
need to connect this to the Redux store in exactly the same way we did for the
`Map`. Let's apply those changes now.

```diff
// app/js/components/FavouritesList/FavouritesList.jsx

  import React from 'react';
  import PropTypes from 'prop-types';
+ import { connect } from 'react-redux';

  import styles from './FavouritesList.css';

- const FavouritesList = ({ points }) => {
+ export const FavouritesList = ({ points }) => {
    const favourites = points.filter(point => point.favourite);

    return (
      <div className={styles.listWrapper}>
        <h3>Favourites</h3>
        <ul className={styles.list}>
          {favourites.map((favourite, index) => (
            <li key={index}>{favourite.details.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  FavouritesList.propTypes = {
    points: PropTypes.arrayOf(PropTypes.object)
  };

+ const mapStateToProps = state => {
+   return {
+     points: state.points
+   };
+ };
+
+  const ConnectedFavouritesList = connect(mapStateToProps)(FavouritesList);

-  export default FavouritesList;
+  export default ConnectedFavouritesList;
```

We will then update the `index.js` file of the `FavouritesList` so that the
unconnected version of the list if also available.

```diff
// app/js/components/FavouritesList/index.js

  export { default } from './FavouritesList';
+ export * from './FavouritesList';
```

## Using the Connected Components

If you have been looking at the browser as you go along you will see the
application has not been working up until this point. The final step we need to
take is to implement the new connected versions of the components.

The errors are happening because we are trying to pass the no longer existing
`points` array as a prop to the `Map` and `FavouritesList` components inside of
`App`. We will update the `App` component to import the connected map and
connected favourites list instead, since they already receive the points from
Redux, which will fix the issue.

```diff
// app/js/components/App/App.js

  import React from 'react';

- import Map from '../Map';
- import FavouritesList from '../FavouritesList';
+ import ConnectedMap from '../Map';
+ import ConnectedFavouritesList from '../FavouritesList';

  // eslint-disable-next-line no-unused-vars
  import styles from './App.css';

  const App = () => {
    return (
      <section>
-       <Map points={points} />
-       <FavouritesList points={points} />
+       <ConnectedMap />
+       <ConnectedFavouritesList />
      </section>
    );
  };

  export default App;
```

Take a look at the browser again and you will see that the map and favourites
list are back to normal.

Although the changes we have applied in this step have not added any usable
feature to the application, it has demonstrated how to apply Redux to an
application. We will use this groundwork in the next steps to apply actions
which we can use to share the changes in favourite state between the map and the
list, allowing the two components to work together.

---

* <sup id="fn-1">[1]</sup>:
  https://reactjs.org/docs/higher-order-components.html
* <sup id="fn-2">[2]</sup>:
  https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
