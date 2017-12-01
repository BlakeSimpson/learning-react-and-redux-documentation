---
title: Adding IDs to the Points Data
step: 16
---

As we saw in the last step, using an array index to manage our points data is
not the best approach as it quickly leads to bugs. We will now update our
`points` array stored in the `points` reducer so that each item in the list has
an `id` property.

Add an `id` property to each item in the array starting with the format
`point-[name]` separated by hyphens. Of course the ID could also be a number, a
UUID, or any other unique value.

```diff
// app/js/reducers/points.js

  const initialState = [
    {
+     id: 'point-the-wall',
      x: 450,
      y: 110,
      details: {
        name: 'The Wall',
        house: "Night's Watch",
        words: 'Night gathers, and now my watch begins.'
      },
      favourite: true
    },
    {
+     id: 'point-winterfell',
      x: 375,
      y: 355,
      details: {
        name: 'Winterfell',
        house: 'Stark',
        words: 'Winter is Coming'
      },
      favourite: true
    },
    {
+     id: 'point-the-twins',
      x: 345,
      y: 705,
      details: {
        name: 'The Twins',
        house: 'Frey',
        words: 'We Stand Together'
      }
    },
    {
+     id: 'point-iron-islands',
      x: 155,
      y: 775,
      details: {
        name: 'The Iron Islands',
        house: 'Greyjoy',
        words: 'We Do Not Sow'
      }
    },
    {
+     id: 'point-casterly-rock',
      x: 150,
      y: 945,
      details: {
        name: 'Casterly Rock',
        house: 'Lannister',
        words: 'Hear me Roar!'
      }
    },
    {
+     id: 'point-kings-landing',
      x: 545,
      y: 1000,
      details: {
        name: "King's Landing",
        house: 'Baratheon',
        words: 'Ours is the Fury'
      }
    },
    {
+     id: 'point-highgarden',
      x: 250,
      y: 1190,
      details: {
        name: 'Highgarden',
        house: 'Tyrell',
        words: 'Growing Strong'
      }
    }
  ];
```

The actual reducer and the `updateFavouriteState` function also have to be
updated to update the array by searching for the given ID instead of looking up
an array index.

```diff
// app/js/reducers/points.js


- const updateFavouriteState = (index, newValue, points) => {
-   const updatedPoint = points[index];
+ const updateFavouriteState = (id, newValue, points) => {
+   const updatedPoint = points.filter(point => point.id === id)[0];
+   const index = points.indexOf(updatedPoint);
+
    updatedPoint.favourite = newValue;

    return [...points.slice(0, index), updatedPoint, ...points.slice(index + 1)];
  };

  const points = (state = initialState, action) => {
- let index;
+ let id;

  switch (action.type) {
    case FAVOURITE_ADDED:
-     index = action.payload.index;
-     return updateFavouriteState(index, true, state);
+     id = action.payload.id;
+     return updateFavouriteState(id, true, state);

    case FAVOURITE_REMOVED:
-     index = action.payload.index;
-     return updateFavouriteState(index, false, state);
+     id = action.payload.id;
+     return updateFavouriteState(id, false, state);

    default:
      return state;
    }
  };
```

Next we will update our two Redux actions to accept the `id` instead of the
`index` and also set this inside of the `payload`.

```diff
// app/js/actions/points.js

-  export const addFavourite = index => {
+  export const addFavourite = id => {
    return {
      type: FAVOURITE_ADDED,
      payload: {
-       index: index
+       id: id
      }
    };
  };

- export const removeFavourite = index => {
+ export const removeFavourite = id => {
    return {
      type: FAVOURITE_REMOVED,
      payload: {
-       index: index
+       id: id
      }
    };
  };
```

Next the `Map` component no longer needs to pass the `index` prop to the
`Pointer` since the `id` is already inside of the `...point` that is spread as
props when the `Map` creates the `Pointer`.

We will additionally update the `key` prop to be the ID since it is guaranteed
to be unique and it is actually an anti-pattern to use array indexes for the
`key` property [^1] because as items are added or removed, the indexes are
reused and React can get confused, meaning renders become buggy.

```diff
// app/js/components/Map/Map.jsx

  export const Map = ({ points }) => {
    return (
      <div className={styles.map}>
-       {points.map((point, index) => (
-         <Pointer {...point} index={index} key={index} />
-       ))}
+      {points.map(point => <Pointer {...point} key={point.id} />)}
      </div>
    );
  };
```

The `FavouritesList` now needs to stop passing the `index` of it's list row to
the `removeFavourite` action (which is causing the list bug) and instead pass
the ID.

```diff
// app/js/components/FavouritesList/FavouritesList.jsx

  export const FavouritesList = ({ points, remove }) => {
    const favourites = points.filter(point => point.favourite);

    return (
      <div className={styles.listWrapper}>
        <h3>Favourites</h3>
        <ul className={styles.list}>
-         {favourites.map((favourite, index) => (
+         {favourites.map(favourite => (
-           <li key={index}>
+           <li key={favourite.id}>
-             <button onClick={() => remove(index)} className={styles.remove}>
+             <button
+               onClick={() => remove(favourite.id)}
+               className={styles.remove}
              >
                &times;
              </button>

              <span>{favourite.details.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  ...

  const mapDispatchToProps = dispatch => {
    return {
-     remove: index => {
-       dispatch(removeFavourite(index));
+     remove: id => {
+       dispatch(removeFavourite(id));
      }
    };
  };

  ...
```

Finally we will also update the `Pointer` component to pass the ID instead of
the index. Notice that the when updating the `propTypes` not only does "index"
change to "id" but the type changes from `number` to `string`.

```diff
// app/js/components/Pointer/Pointer.jsx

  class Pointer extends Component {

    ...

    favourite () {
-     const { index, favourite, removeFavourite, addFavourite } = this.props;
+     const { id, favourite, removeFavourite, addFavourite } = this.props;

      if (favourite) {
-       removeFavourite(index);
+       removeFavourite(id);
      } else {
-       addFavourite(index);
+       addFavourite(id);
      }
    }

    ...

  }

  ...

  Pointer.propTypes = {
    addFavourite: PropTypes.func,
    removeFavourite: PropTypes.func,
-   index: PropTypes.number,
+   id: PropTypes.string,
    details: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    favourite: PropTypes.bool
  };

  const mapDispatchToProps = dispatch => {
    return {
-     addFavourite: index => {
-       dispatch(addFavourite(index));
+     addFavourite: id => {
+       dispatch(addFavourite(id));
      },

-     removeFavourite: index => {
-       dispatch(removeFavourite(index));
+     removeFavourite: id => {
+       dispatch(removeFavourite(id));
      }
    };
  };

  ...
```

Take a look in the browser and again have a play around with adding favourites
on the map as well as removing them from the list and the map. You will see that
due to the unique IDs the map and list are now updating as expected.

---

* <sup id="fn-1">[1]</sup>:
  https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
