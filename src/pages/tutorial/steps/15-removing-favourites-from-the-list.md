---
title: Removing Favourites from the List
step: 15
---

We will now add an additional feature to the favourites list that will
demonstrate some of the shortcoming of our current data structure.

We will be using the `removeFavourite` Redux action and binding it to a button
on each row of the favourites list which will cause the application to update
and the favourite state to be removed.

Let's first of all add the new styles for the remove button to our
`FavouritesList` component styles. Add the `.remove` class to the end of the
component CSS.

```css
/* app/js/components/FavouritesList/FavouritesList.css */

/* ... previous styles ... */

.remove {
  float: left;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  margin: 0 12px 0 0;
  padding: 0;
  line-height: 12px;
  cursor: pointer;
}
```

Next we will import the `removeFavourite` action and pass it to the
`FavouritesList` props via the `mapDispatchToProps` method as we did in the
previous step with the `Pointer` component.

This means we will also update our `propTypes` definition with the new `remove`
prop.

```diff
  import React from 'react';
  import PropTypes from 'prop-types';
  import { connect } from 'react-redux';

+ import { removeFavourite } from '../../actions';
  import styles from './FavouritesList.css';

-  export const FavouritesList = ({ points }) => {
+  export const FavouritesList = ({ points, remove }) => {
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
-    points: PropTypes.arrayOf(PropTypes.object)
+    points: PropTypes.arrayOf(PropTypes.object),
+    remove: PropTypes.func.isRequired
  };

  const mapStateToProps = state => {
    return {
      points: state.points
    };
  };

+ const mapDispatchToProps = dispatch => {
+   return {
+     remove: index => {
+       dispatch(removeFavourite(index));
+     }
+   };
+ };

-  const ConnectedFavouritesList = connect(mapStateToProps)(FavouritesList);
+  const ConnectedFavouritesList = connect(mapStateToProps, mapDispatchToProps)(
+    FavouritesList
+  );

  export default ConnectedFavouritesList;
```

Next we will call the `remove` function which will trigger the `removeFavourite`
action by adding a button tag that has an `onClick` handler.

```diff
  export const FavouritesList = ({ points, remove }) => {
    const favourites = points.filter(point => point.favourite);

    return (
      <div className={styles.listWrapper}>
        <h3>Favourites</h3>
        <ul className={styles.list}>
          {favourites.map((favourite, index) => (
-           <li key={index}>{favourite.details.name}</li>
+           <li key={index}>
+             <button onClick={() => remove(index)} className={styles.remove}>
+               &times;
+             </button>
+
+             <span>{favourite.details.name}</span>
+           </li>
          ))}
        </ul>
      </div>
    );
  };
```

Now if you look in the browser the favourites list has a remove button beside
each row in the list. If you click on the remove button in the first row beside
"The Wall" you will see that the row disappears and the map icon updates also.

Try pressing the remove button beside "Winterfell" though. Nothing happens. If
you add some more places as favourites then and start removing them in a random
order you will notice that the list will not update correctly.

This is because we pass an array index as the key to update the points array.
The index from the favourites list is the row number of the list which does not
always match the index of the points on the map so the reducer can't find the
correct point.

This demonstrates that using an array index is not the best approach for
managing our data. It is preferable for each data item you are working with has
a unique ID that you can use to identify it with from any point of your
application.

In the next step we will update our data to use unique IDs instead of relying on
the array index which will fix this bug.
