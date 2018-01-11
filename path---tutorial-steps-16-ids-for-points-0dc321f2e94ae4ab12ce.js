webpackJsonp([0x6b92a4649449],{322:function(e,n){e.exports={data:{markdownRemark:{html:'<p>As we saw in the last step, using an array index to manage our points data is\nnot the best approach as it quickly leads to bugs. We will now update our\n<code>points</code> array stored in the <code>points</code> reducer so that each item in the list has\nan <code>id</code> property.</p>\n<p>Add an <code>id</code> property to each item in the array starting with the format\n<code>point-[name]</code> separated by hyphens. Of course the ID could also be a number, a\nUUID, or any other unique value.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/reducers/points.js\n\n  const initialState = [\n    {\n<span class="token inserted">+     id: \'point-the-wall\',</span>\n      x: 450,\n      y: 110,\n      details: {\n        name: \'The Wall\',\n        house: "Night\'s Watch",\n        words: \'Night gathers, and now my watch begins.\'\n      },\n      favourite: true\n    },\n    {\n<span class="token inserted">+     id: \'point-winterfell\',</span>\n      x: 375,\n      y: 355,\n      details: {\n        name: \'Winterfell\',\n        house: \'Stark\',\n        words: \'Winter is Coming\'\n      },\n      favourite: true\n    },\n    {\n<span class="token inserted">+     id: \'point-the-twins\',</span>\n      x: 345,\n      y: 705,\n      details: {\n        name: \'The Twins\',\n        house: \'Frey\',\n        words: \'We Stand Together\'\n      }\n    },\n    {\n<span class="token inserted">+     id: \'point-iron-islands\',</span>\n      x: 155,\n      y: 775,\n      details: {\n        name: \'The Iron Islands\',\n        house: \'Greyjoy\',\n        words: \'We Do Not Sow\'\n      }\n    },\n    {\n<span class="token inserted">+     id: \'point-casterly-rock\',</span>\n      x: 150,\n      y: 945,\n      details: {\n        name: \'Casterly Rock\',\n        house: \'Lannister\',\n        words: \'Hear me Roar!\'\n      }\n    },\n    {\n<span class="token inserted">+     id: \'point-kings-landing\',</span>\n      x: 545,\n      y: 1000,\n      details: {\n        name: "King\'s Landing",\n        house: \'Baratheon\',\n        words: \'Ours is the Fury\'\n      }\n    },\n    {\n<span class="token inserted">+     id: \'point-highgarden\',</span>\n      x: 250,\n      y: 1190,\n      details: {\n        name: \'Highgarden\',\n        house: \'Tyrell\',\n        words: \'Growing Strong\'\n      }\n    }\n  ];\n</code></pre>\n      </div>\n<p>The actual reducer and the <code>updateFavouriteState</code> function also have to be\nupdated to update the array by searching for the given ID instead of looking up\nan array index.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/reducers/points.js\n\n\n<span class="token deleted">- const updateFavouriteState = (index, newValue, points) => {</span>\n<span class="token deleted">-   const updatedPoint = points[index];</span>\n<span class="token inserted">+ const updateFavouriteState = (id, newValue, points) => {</span>\n<span class="token inserted">+   const updatedPoint = points.filter(point => point.id === id)[0];</span>\n<span class="token inserted">+   const index = points.indexOf(updatedPoint);</span>\n<span class="token inserted">+</span>\n    updatedPoint.favourite = newValue;\n\n    return [...points.slice(0, index), updatedPoint, ...points.slice(index + 1)];\n  };\n\n  const points = (state = initialState, action) => {\n<span class="token deleted">- let index;</span>\n<span class="token inserted">+ let id;</span>\n\n  switch (action.type) {\n    case FAVOURITE_ADDED:\n<span class="token deleted">-     index = action.payload.index;</span>\n<span class="token deleted">-     return updateFavouriteState(index, true, state);</span>\n<span class="token inserted">+     id = action.payload.id;</span>\n<span class="token inserted">+     return updateFavouriteState(id, true, state);</span>\n\n    case FAVOURITE_REMOVED:\n<span class="token deleted">-     index = action.payload.index;</span>\n<span class="token deleted">-     return updateFavouriteState(index, false, state);</span>\n<span class="token inserted">+     id = action.payload.id;</span>\n<span class="token inserted">+     return updateFavouriteState(id, false, state);</span>\n\n    default:\n      return state;\n    }\n  };\n</code></pre>\n      </div>\n<p>Next we will update our two Redux actions to accept the <code>id</code> instead of the\n<code>index</code> and also set this inside of the <code>payload</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/actions/points.js\n\n<span class="token deleted">-  export const addFavourite = index => {</span>\n<span class="token inserted">+  export const addFavourite = id => {</span>\n    return {\n      type: FAVOURITE_ADDED,\n      payload: {\n<span class="token deleted">-       index: index</span>\n<span class="token inserted">+       id: id</span>\n      }\n    };\n  };\n\n<span class="token deleted">- export const removeFavourite = index => {</span>\n<span class="token inserted">+ export const removeFavourite = id => {</span>\n    return {\n      type: FAVOURITE_REMOVED,\n      payload: {\n<span class="token deleted">-       index: index</span>\n<span class="token inserted">+       id: id</span>\n      }\n    };\n  };\n</code></pre>\n      </div>\n<p>Next the <code>Map</code> component no longer needs to pass the <code>index</code> prop to the\n<code>Pointer</code> since the <code>id</code> is already inside of the <code>...point</code> that is spread as\nprops when the <code>Map</code> creates the <code>Pointer</code>.</p>\n<p>We will additionally update the <code>key</code> prop to be the ID since it is guaranteed\nto be unique and it is actually an anti-pattern <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup> to use array indexes for\nthe <code>key</code> property because as items are added or removed, the indexes are reused\nand React can get confused, meaning renders become buggy.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Map/Map.jsx\n\n  export const Map = ({ points }) => {\n    return (\n      &lt;div className={styles.map}>\n<span class="token deleted">-       {points.map((point, index) => (</span>\n<span class="token deleted">-         &lt;Pointer {...point} index={index} key={index} /></span>\n<span class="token deleted">-       ))}</span>\n<span class="token inserted">+      {points.map(point => &lt;Pointer {...point} key={point.id} />)}</span>\n      &lt;/div>\n    );\n  };\n</code></pre>\n      </div>\n<p>The <code>FavouritesList</code> now needs to stop passing the <code>index</code> of it\'s list row to\nthe <code>removeFavourite</code> action (which is causing the list bug) and instead pass\nthe ID.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/FavouritesList/FavouritesList.jsx\n\n  export const FavouritesList = ({ points, remove }) => {\n    const favourites = points.filter(point => point.favourite);\n\n    return (\n      &lt;div className={styles.listWrapper}>\n        &lt;h3>Favourites&lt;/h3>\n        &lt;ul className={styles.list}>\n<span class="token deleted">-         {favourites.map((favourite, index) => (</span>\n<span class="token inserted">+         {favourites.map(favourite => (</span>\n<span class="token deleted">-           &lt;li key={index}></span>\n<span class="token inserted">+           &lt;li key={favourite.id}></span>\n<span class="token deleted">-             &lt;button onClick={() => remove(index)} className={styles.remove}></span>\n<span class="token inserted">+             &lt;button</span>\n<span class="token inserted">+               onClick={() => remove(favourite.id)}</span>\n<span class="token inserted">+               className={styles.remove}</span>\n              >\n                &amp;times;\n              &lt;/button>\n\n              &lt;span>{favourite.details.name}&lt;/span>\n            &lt;/li>\n          ))}\n        &lt;/ul>\n      &lt;/div>\n    );\n  };\n  ...\n\n  const mapDispatchToProps = dispatch => {\n    return {\n<span class="token deleted">-     remove: index => {</span>\n<span class="token deleted">-       dispatch(removeFavourite(index));</span>\n<span class="token inserted">+     remove: id => {</span>\n<span class="token inserted">+       dispatch(removeFavourite(id));</span>\n      }\n    };\n  };\n\n  ...\n</code></pre>\n      </div>\n<p>Finally we will also update the <code>Pointer</code> component to pass the ID instead of\nthe index. Notice that the when updating the <code>propTypes</code> not only does "index"\nchange to "id" but the type changes from <code>number</code> to <code>string</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Pointer/Pointer.jsx\n\n  class Pointer extends Component {\n\n    ...\n\n    favourite () {\n<span class="token deleted">-     const { index, favourite, removeFavourite, addFavourite } = this.props;</span>\n<span class="token inserted">+     const { id, favourite, removeFavourite, addFavourite } = this.props;</span>\n\n      if (favourite) {\n<span class="token deleted">-       removeFavourite(index);</span>\n<span class="token inserted">+       removeFavourite(id);</span>\n      } else {\n<span class="token deleted">-       addFavourite(index);</span>\n<span class="token inserted">+       addFavourite(id);</span>\n      }\n    }\n\n    ...\n\n  }\n\n  ...\n\n  Pointer.propTypes = {\n    addFavourite: PropTypes.func,\n    removeFavourite: PropTypes.func,\n<span class="token deleted">-   index: PropTypes.number,</span>\n<span class="token inserted">+   id: PropTypes.string,</span>\n    details: PropTypes.object.isRequired,\n    x: PropTypes.number.isRequired,\n    y: PropTypes.number.isRequired,\n    favourite: PropTypes.bool\n  };\n\n  const mapDispatchToProps = dispatch => {\n    return {\n<span class="token deleted">-     addFavourite: index => {</span>\n<span class="token deleted">-       dispatch(addFavourite(index));</span>\n<span class="token inserted">+     addFavourite: id => {</span>\n<span class="token inserted">+       dispatch(addFavourite(id));</span>\n      },\n\n<span class="token deleted">-     removeFavourite: index => {</span>\n<span class="token deleted">-       dispatch(removeFavourite(index));</span>\n<span class="token inserted">+     removeFavourite: id => {</span>\n<span class="token inserted">+       dispatch(removeFavourite(id));</span>\n      }\n    };\n  };\n\n  ...\n</code></pre>\n      </div>\n<p>Take a look in the browser and again have a play around with adding favourites\non the map as well as removing them from the list and the map. You will see that\ndue to the unique IDs the map and list are now updating as expected.</p>\n<hr>\n<ul>\n<li><sup id="fn-1">[1]</sup>:\n<a href="https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318">https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318</a></li>\n</ul>',frontmatter:{title:"Adding IDs to the Points Data",step:16}},allMarkdownRemark:{edges:[{node:{fields:{slug:"/tutorial/getting-started/"},frontmatter:{title:"Getting Started",step:null}}},{node:{fields:{slug:"/tutorial/links/"},frontmatter:{title:"Links",step:null}}},{node:{fields:{slug:"/tutorial/steps/1-setup-package/"},frontmatter:{title:"Generate the package.json",step:1}}},{node:{fields:{slug:"/tutorial/steps/10-pointer-details/"},frontmatter:{title:"Showing the Details of each Point",step:10}}},{node:{fields:{slug:"/tutorial/steps/11-favourite-places/"},frontmatter:{title:"Favourite Places",step:11}}},{node:{fields:{slug:"/tutorial/steps/12-favourites-list/"},frontmatter:{title:"Favourites List",step:12}}},{node:{fields:{slug:"/tutorial/steps/13-adding-redux/"},frontmatter:{title:"Starting with Redux",step:13}}},{node:{fields:{slug:"/tutorial/steps/14-managing-favourites-with-redux/"},frontmatter:{title:"Managing Favourites with Redux",step:14}}},{node:{fields:{slug:"/tutorial/steps/2-webpack/"},frontmatter:{title:"Setting up Webpack",step:2}}},{node:{fields:{slug:"/tutorial/steps/3-babel/"},frontmatter:{title:"Setting up Babel",step:3}}},{node:{fields:{slug:"/tutorial/steps/4-eslint-and-prettier/"},frontmatter:{title:"ESLint and Prettier",step:4}}},{node:{fields:{slug:"/tutorial/steps/5-starting-react/"},frontmatter:{title:"Starting with React",step:5}}},{node:{fields:{slug:"/tutorial/steps/6-adding-the-map/"},frontmatter:{title:"Adding the Map",step:6}}},{node:{fields:{slug:"/tutorial/steps/7-styling-with-postcss/"},frontmatter:{title:"CSS Modules and PostCSS",step:7}}},{node:{fields:{slug:"/tutorial/steps/8-webpack-dev-server/"},frontmatter:{title:"Webpack Dev Server",step:8}}},{node:{fields:{slug:"/tutorial/steps/9-adding-points-to-the-map/"},frontmatter:{title:"Adding Points to the Map",step:9}}},{node:{fields:{slug:"/tutorial/steps/15-removing-favourites-from-the-list/"},frontmatter:{title:"Removing Favourites from the List",step:15}}},{node:{fields:{slug:"/tutorial/steps/16-ids-for-points/"},frontmatter:{title:"Adding IDs to the Points Data",step:16}}},{node:{fields:{slug:"/tutorial/steps/17-testing-with-jest/"},frontmatter:{title:"Testing with Jest",step:17}}}]}},pathContext:{slug:"/tutorial/steps/16-ids-for-points/"}}}});
//# sourceMappingURL=path---tutorial-steps-16-ids-for-points-0dc321f2e94ae4ab12ce.js.map