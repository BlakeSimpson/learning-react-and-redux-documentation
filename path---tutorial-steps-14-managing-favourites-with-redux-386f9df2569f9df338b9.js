webpackJsonp([0xf0aae823ad],{318:function(e,n){e.exports={data:{markdownRemark:{html:'<p>Now that we have Redux setup we will continue on the Redux topic by adding Redux\nactions that will be responsible for adding and removing favourites from our\nstate in the Redux store. This means that when we add a favourite on the map the\nfavourites list will automatically update.</p>\n<h2>Adding out first Action</h2>\n<p>Let\'s begin by creating a directory in the application where all of our actions\nwill be stored.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code><span class="token function">mkdir</span> app/js/actions\n</code></pre>\n      </div>\n<p>Next we will create an <code>index.js</code> file in this directory that will be\nresponsible for exporting all our actions from our various actions files.</p>\n<p>Create the <code>index.js</code> file and export everything from the <code>points.js</code> file\n(which we will create in a moment) using the <code>*</code> wildcard.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// app/js/actions/index.js</span>\n\n<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">\'./points\'</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Next we will create the <code>points.js</code> file that will contain our actions related\nto points. Let\'s start by creating an action called <code>addFavourite</code> which will\nsignal to our application that the user set a point on the map as a favourite,\nallowing the application to update accordingly.</p>\n<p>Redux actions are simply functions that return an object. The object must have a\nkey called <code>type</code> with a unique value identifying the action. It is standard to\nname the type in uppercase.</p>\n<p>The action object can also contain other information. For example in this case\nwe will store an entry called <code>index</code> in the action which will be the array\nindex of the point that should be marked as a favourite.</p>\n<p>It is also a common standard to put additional information in a sub-object\ncalled <code>payload</code> to differentiate it from the <code>type</code>.</p>\n<p>Go ahead and add the <code>points.js</code> file with the <code>addFavourite</code> action.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// app/js/actions/points.js</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">addFavourite</span> <span class="token operator">=</span> index <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    type<span class="token punctuation">:</span> <span class="token string">\'FAVOURITE_ADDED\'</span><span class="token punctuation">,</span>\n    payload<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      index<span class="token punctuation">:</span> index\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>We are also going to need an action to tell the application that a favourite was\nremoved. Let\'s add a <code>removeFavourite</code> action. It will look similar to our "add"\naction as it also needs the array index of the point to update.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/actions/points.js\n\n  export const addFavourite = index => {\n    return {\n      type: \'FAVOURITE_ADDED\',\n      payload: {\n        index: index\n      }\n    };\n  };\n\n<span class="token inserted">+ export const removeFavourite = index => {</span>\n<span class="token inserted">+   return {</span>\n<span class="token inserted">+     type: \'FAVOURITE_REMOVED\',</span>\n<span class="token inserted">+     payload: {</span>\n<span class="token inserted">+       index: index</span>\n<span class="token inserted">+     }</span>\n<span class="token inserted">+   };</span>\n<span class="token inserted">+ };</span>\n</code></pre>\n      </div>\n<h4>Using Constants for Action Types</h4>\n<p>As was mentioned, Redux actions types have to be unique in case they override\neach other. As it would be possible to have actions with the same names as your\napplication grows if you just use uppercase strings for the action type it is a\ncommon practise to introduce a "constants" file that defines all shared\nconstants for your Redux actions (as well as for other constants you need to\nshare). Let\'s create a <code>constants.js</code> file in the <code>app/js/</code> directory that will\ndefine our action types. All constants in this file should be exported.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// app/js/constants.js</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> FAVOURITE_ADDED <span class="token operator">=</span> <span class="token string">\'FAVOURITE_ADDED\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> FAVOURITE_REMOVED <span class="token operator">=</span> <span class="token string">\'FAVOURITE_REMOVED\'</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>We now need to import these constants as the action types into our points\nactions.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/actions/points.js\n\n<span class="token inserted">+ import { FAVOURITE_ADDED, FAVOURITE_REMOVED } from \'../constants\';</span>\n\n  export const addFavourite = index => {\n    return {\n<span class="token deleted">-     type: \'FAVOURITE_ADDED\',</span>\n<span class="token inserted">+     type: FAVOURITE_ADDED,</span>\n      payload: {\n        index: index\n      }\n    };\n  };\n\n  export const removeFavourite = index => {\n    return {\n<span class="token deleted">-     type: \'FAVOURITE_REMOVED\',</span>\n<span class="token inserted">+     type: FAVOURITE_REMOVED,</span>\n      payload: {\n        index: index\n      }\n    };\n  };\n</code></pre>\n      </div>\n<h2>Dispatching Actions</h2>\n<p>When an action is "dispatched", Redux sends the action to all reducers that were\npassed to the store after being registered via of <code>combineReducers</code>. This means\nthat multiple reducers can listen to one action and update the state.</p>\n<p>For this reason it is good to design your actions and reducers in an idiomatic\nmanner <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>. This means that you should design your actions to describe exactly\nwhat the user is doing and allow your reducers to represent your data correctly\ninstead of simply mapping your actions to reducers. For example an application\nmay dispatch a <code>LOGOUT</code> action and multiple reducers will listen to this and\nupdate the state. The "account" reducer could remove the logged in user ID, the\n"basket" reducer would clear all items from the cart, a "navigation" reducer\nwould update the links shown on the navigation bar to the user.</p>\n<p>This is preferable than having to dispatch 3 action <code>REMOVE_LOGGED_IN_USER_ID</code>,\n<code>CLEAR_CART</code> and <code>UPDATE_NAVIGATION_LINKS</code> when the user clicks the logout\nbutton.</p>\n<h4>Updating points</h4>\n<p>Now that our points actions are defined we need to wire them up to our connected\ncomponents. We will update the <code>Pointer</code> component so that instead of simply\nupdating it\'s internal <code>state</code> with the information weather a pointer is a\nfavourite or not it will dispatch one of our Redux actions, triggering the\npoints reducer to update the application state.</p>\n<p>We dispatch an action by calling the <code>dispatch</code> method provided by Redux and\npassing the returned object from our action to it. We cannot however simply\nimport the <code>dispatch</code> method from the Redux package and use it directly. Only\nthe Redux store has the <code>dispatch</code> method available and in a React application\nwe do not have direct access to the store. Instead we are given the <code>dispatch</code>\nmethod as a prop to all connected components.</p>\n<p>We could call <code>dispatch</code> directly from the props, for example:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// Import the action to our component</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> myAction <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./actions\'</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Inside of a connected component, `dispatch` is available as a prop.</span>\n<span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">myAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>However instead of using <code>dispatch</code> directly via the props we can map the\ndispatch to actions when we connect the component. In the last step we saw that\nyou can pass a <code>mapStateToProps</code> function as the first argument to the <code>connect</code>\nmethod. The second argument that <code>connect</code> accepts is a function called\n<code>mapDispatchToProps</code>.</p>\n<p>The <code>mapDispatchToProps</code> method gives us access to the <code>dispatch</code> method and\nallows us to pass functions into our component as props that will automatically\ndispatch our actions for us. Here is an example:</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> connect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-redux\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> myAction <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./actions\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">triggerAction</span><span class="token punctuation">(</span><span class="token string">\'foobar\'</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">mapDispatchToProps</span> <span class="token operator">=</span> dispatch <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    triggerAction<span class="token punctuation">:</span> text <span class="token operator">=></span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">myAction</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> ConnectedMyComponent <span class="token operator">=</span> <span class="token function">connect</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> mapDispatchToProps<span class="token punctuation">)</span><span class="token punctuation">(</span>MyComponent<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> ConnectedMyComponent<span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>In this example we import an action called <code>myAction</code> which we imagine accepts a\ntext string. We build a <code>mapDispatchToProps</code> function that returns a prop called\n<code>triggerAction</code> which can take a <code>text</code> argument and will dispatch the\n<code>myAction</code> action for us with the given text string. In the <code>connect</code> call we\nfirst pass <code>null</code> since we don\'t have to map any state to props. If we did\nthough, we would pass the <code>mapStateToProps</code> function here instead. Inside the\ncomponent there is a <code>&#x3C;button></code> tag that when clicked calls the <code>triggerAction</code>\nprop with a static text "foobar" which will cause the action to be triggered -\nmeaning all reducers will receive the <code>myAction</code> action.</p>\n<p>Let\'s try it out by applying this to our <code>Pointer</code> component.</p>\n<p>First we will import our add and remove favourite actions.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Pointer/Pointer.jsx\n\n  import React, { Component } from \'react\';\n  import PropTypes from \'prop-types\';\n  import classNames from \'classnames\';\n\n<span class="token inserted">+ import { addFavourite, removeFavourite } from \'../../actions\';</span>\n  import styles from \'./Pointer.css\';\n</code></pre>\n      </div>\n<p>We then have to connect the <code>Pointer</code> component with Redux.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Pointer/Pointer.jsx\n\n  import React, { Component } from \'react\';\n  import PropTypes from \'prop-types\';\n  import classNames from \'classnames\';\n<span class="token inserted">+ import { connect } from \'react-redux\';</span>\n\n<span class="token inserted">+ import { addFavourite, removeFavourite } from \'../../actions\';</span>\n  import styles from \'./Pointer.css\';\n\n<span class="token deleted">- class Pointer extends Component {</span>\n<span class="token inserted">+ export class Pointer extends Component {</span>\n    ...\n  }\n\n<span class="token inserted">+  const ConnectedPointer = connect()(Pointer);</span>\n\n<span class="token deleted">-  export default Pointer;</span>\n<span class="token inserted">+  export default ConnectedPointer;</span>\n</code></pre>\n      </div>\n<p>We then update our <code>index.js</code> file of the <code>Pointer</code> component to manage the new\nexports.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Pointer/index.js\n\n  export { default } from \'./Pointer\';\n<span class="token inserted">+ export * from \'./Pointer\';</span>\n</code></pre>\n      </div>\n<p>Next we create our <code>mapDispatchToProps</code> function that creates props to add and\nremove a favourite and pass it to <code>connect</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Pointer/Pointer.jsx\n\n<span class="token inserted">+ const mapDispatchToProps = dispatch => {</span>\n<span class="token inserted">+   return {</span>\n<span class="token inserted">+     addFavourite: index => {</span>\n<span class="token inserted">+       dispatch(addFavourite(index));</span>\n<span class="token inserted">+     },</span>\n<span class="token inserted">+</span>\n<span class="token inserted">+     removeFavourite: index => {</span>\n<span class="token inserted">+       dispatch(removeFavourite(index));</span>\n<span class="token inserted">+     }</span>\n<span class="token inserted">+   };</span>\n<span class="token inserted">+ };</span>\n\n<span class="token deleted">- const ConnectedPointer = connect()(Pointer);</span>\n<span class="token inserted">+ const ConnectedPointer = connect(null, mapDispatchToProps)(Pointer);</span>\n</code></pre>\n      </div>\n<p>Due to the new props our <code>propTypes</code> definition will have to be updated. The\n<code>index</code> prop will be the array index we want to update; this prop does not yet\nexist but we will be passing this to the <code>Pointer</code> from the <code>Map</code> in a moment.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Pointer/Pointer.jsx\n\n  Pointer.propTypes = {\n<span class="token inserted">+   addFavourite: PropTypes.func,</span>\n<span class="token inserted">+   removeFavourite: PropTypes.func,</span>\n<span class="token inserted">+   index: PropTypes.number,</span>\n    details: PropTypes.object.isRequired,\n    x: PropTypes.number.isRequired,\n    y: PropTypes.number.isRequired,\n    favourite: PropTypes.bool\n  };\n</code></pre>\n      </div>\n<p>We now must remove the internal <code>state</code> that managed wether the pointer should\nbe displayed as a favourite or not and replace this logic by calling our Redux\nactions instead. Most of the changes are happening inside of the <code>favourite</code>\nmethod that now will take the array <code>index</code> and based on wether the <code>favourite</code>\nprop is currently true or false, call the <code>addFavourite</code> or <code>removeFavourite</code>\nprop (which dispatched the matching action) and passes the <code>index</code> to it.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Pointer/Pointer.jsx\n\nclass Pointer extends Component {\n  constructor (props) {\n    super(props);\n\n    this.state = {\n<span class="token deleted">-     open: false,</span>\n<span class="token deleted">-     favourite: props.favourite</span>\n<span class="token inserted">+     open: false</span>\n    };\n\n    this.toggle = this.toggle.bind(this);\n    this.favourite = this.favourite.bind(this);\n  }\n\n  toggle (event) {\n    event.preventDefault();\n\n    if (event.target === event.currentTarget) {\n      this.setState({ open: !this.state.open });\n    }\n  }\n\n  favourite () {\n<span class="token deleted">-   this.setState({ favourite: !this.state.favourite });</span>\n<span class="token inserted">+   const { index, favourite, removeFavourite, addFavourite } = this.props;</span>\n<span class="token inserted">+</span>\n<span class="token inserted">+   if (favourite) {</span>\n<span class="token inserted">+     removeFavourite(index);</span>\n<span class="token inserted">+   } else {</span>\n<span class="token inserted">+     addFavourite(index);</span>\n<span class="token inserted">+   }</span>\n  }\n\n  render () {\n<span class="token deleted">-   const { x, y, details } = this.props;</span>\n<span class="token inserted">+   const { x, y, details, favourite } = this.props;</span>\n    const { name, house, words } = details;\n\n    const pointerClasses = classNames(styles.pointer, {\n<span class="token deleted">-     [styles.favourite]: this.state.favourite</span>\n<span class="token inserted">+     [styles.favourite]: favourite</span>\n    });\n\n    const detailsClasses = classNames(styles.details, {\n      [styles.hidden]: !this.state.open\n    });\n\n    return (\n      &lt;div\n        className={pointerClasses}\n        style={{ left: x, top: y }}\n        onClick={this.toggle}\n      >\n        &lt;div className={detailsClasses}>\n          &lt;header className={styles.headline}>\n            &lt;h3>{name}&lt;/h3>\n            &lt;div className={styles.detailsControls}>\n              &lt;a href="#" className={styles.control} onClick={this.favourite}>\n<span class="token deleted">-               {this.state.favourite ? \'–\' : \'+\'}</span>\n<span class="token inserted">+               {favourite ? \'–\' : \'+\'}</span>\n              &lt;/a>\n\n              &lt;a href="#" className={styles.control} onClick={this.toggle}>\n                &amp;times;\n              &lt;/a>\n            &lt;/div>\n          &lt;/header>\n\n          &lt;p>House: {house}&lt;/p>\n          &lt;p>Words: {words}&lt;/p>\n        &lt;/div>\n      &lt;/div>\n    );\n  }\n}\n</code></pre>\n      </div>\n<p>Finally we have to update the <code>Map</code> component to pass the array <code>index</code> that our\nRedux actions rely on to our <code>Pointer</code> component as a prop.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Map/Map.jsx\n\n  export const Map = ({ points }) => {\n    return (\n      &lt;div className={styles.map}>\n<span class="token deleted">-       {points.map((point, index) => &lt;Pointer {...point} key={index} />)}</span>\n<span class="token inserted">+       {points.map((point, index) => (</span>\n<span class="token inserted">+         &lt;Pointer {...point} index={index} key={index} /></span>\n<span class="token inserted">+       ))}</span>\n      &lt;/div>\n    );\n  };\n</code></pre>\n      </div>\n<h2>Reacting to a Dispatched Action</h2>\n<p>The final step is for our reducer to listen to the dispatched actions and\nrespond to them by changing the application state, therefore having the effect\nof the whole application updating.</p>\n<p>Currently our <code>points</code> reducer does not do anything when it receives and action.\nThe <code>switch</code> statement simply falls to the default case and returns the current\nstate. We will now update the reducer to have additional cases inside of the\n<code>switch</code> statement that listen for the action types we dispatch.</p>\n<p>Since our action types are defined in the <code>constants.js</code> file, we will import\nthese and use them as the values we look for in the <code>switch</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/reducers/points.js\n\n<span class="token inserted">+ import { FAVOURITE_ADDED, FAVOURITE_REMOVED } from \'../constants\';</span>\n\n  const initialState = [\n    ...\n  ];\n\n  const points = (state = initialState, action) => {\n    switch (action.type) {\n<span class="token inserted">+     case FAVOURITE_ADDED:</span>\n<span class="token inserted">+     case FAVOURITE_REMOVED:</span>\n      default:\n        return state;\n    }\n  };\n\n  export default points;\n</code></pre>\n      </div>\n<p>Now when the <code>addFavourite</code> action is dispatched the <code>FAVOURITE_ADDED</code> case will\npick it up, as the <code>removeFavourite</code> action will map to the <code>FAVOURITE_REMOVED</code>\ncase.</p>\n<p>We now need to update the state being passed into the reducer based on our\naction. We will use the <code>index</code> passed inside of the <code>payload</code> section of the\naction to identify the item inside of the state we want to update and then\neither set the <code>favourite</code> property of that item to either <code>true</code> or <code>false</code>,\ndepending on wether we want to add or remove the favourite.</p>\n<p>It is important to know that reducers never simply update the <code>state</code>, they must\ncreate a new <code>state</code> each time the data changes or the update will not be\napplied. This concept is called "immutability" and it is how Redux knows wether\nthe state has actually changed or not.</p>\n<blockquote>\n<p>[A reducer] should be "pure", which means the reducer does not mutate its\narguments. If the reducer updates state, it should not modify the existing\nstate object in-place. Instead, it should generate a new object containing the\nnecessary changes. The same approach should be used for any sub-objects within\nstate that the reducer updates. <sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup></p>\n</blockquote>\n<p>Therefore we cannot simply access the array index from the <code>state</code> argument and\nchange the <code>favourite</code> property but instead copy the item to update, modify it,\nthen create a new array of all of the original items including the updated one.</p>\n<p>In order to simplify this we will add a function called <code>updateFavouriteState</code>\nthat will allow us to share this logic between the "add" and "remove" cases.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/reducers/points.js\n\n<span class="token inserted">+ const updateFavouriteState = (index, newValue, points) => {</span>\n<span class="token inserted">+   const updatedPoint = points[index];</span>\n<span class="token inserted">+   updatedPoint.favourite = newValue;</span>\n<span class="token inserted">+</span>\n<span class="token inserted">+   return [...points.slice(0, index), updatedPoint, ...points.slice(index + 1)];</span>\n<span class="token inserted">+ };</span>\n<span class="token inserted">+</span>\n  const points = (state = initialState, action) => {\n<span class="token inserted">+   let index;</span>\n<span class="token inserted">+</span>\n    switch (action.type) {\n     case FAVOURITE_ADDED:\n<span class="token inserted">+     index = action.payload.index;</span>\n<span class="token inserted">+     return updateFavouriteState(index, true, state);</span>\n<span class="token inserted">+</span>\n     case FAVOURITE_REMOVED:\n<span class="token inserted">+     index = action.payload.index;</span>\n<span class="token inserted">+     return updateFavouriteState(index, false, state);</span>\n<span class="token inserted">+</span>\n      default:\n        return state;\n    }\n  };\n</code></pre>\n      </div>\n<p>The <code>updateFavouriteState</code> function accepts the array <code>index</code> to update, the new\nvalue for the <code>favourite</code> property (<code>true</code> or <code>false</code>) and the <code>points</code> array,\nwhich is the <code>state</code> passed to our reducer.</p>\n<p>We then return a new array that has all of the points from before the index, the\nupdated item, and finally all of the items after the index. We use the ES7 <code>...</code>\nspread operator that "spreads" multiple array items into an array.</p>\n<p>The Redux documentation contains many more of these\n<a href="https://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html">immutable update patterns</a>,\nalso for other data types such as objects <sup id="fnref-3"><a href="#fn-3" class="footnote-ref">3</a></sup>.</p>\n<p>That\'s it! If you now look at the browser and play with the map you will see\nadding or removing a favourite place on the map will not only still update the\nmap marker colour but will also automatically add or remove the items from the\nlist underneath the map because all connected components are now reacting to our\ndispatched actions. If you are using the Redux developer tools you will see the\nactions being dispatched every time you chang a favourite state.</p>\n<p><div>\n          <a\n            class="gatsby-resp-image-link"\n            title="original image"\n            href="/static/map-view-redux-actions-7594e5c2c43dcb32a381e4ce9f9da6f4-1f026.png"\n            style="display: block"\n            target="_blank"\n          >\n            <div\n              class="gatsby-resp-image-wrapper"\n              style="position: relative; z-index: -1; "\n            >\n              <div\n                class="gatsby-resp-image-background-image"\n                style="padding-bottom: 59.73229224762967%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACFElEQVQoz5XT61MSURjHcf6GSjRQJBRZWOSyKsZlBdoFEcULl8bRQnTVKMiCGSPTLs6YUzM5TW/6d78dzuSkL2rixW/2zM5zPvvseXZtdscYXsXPxJSPQj5NtVIik9aJP4yRMxYIRULY748SisZ4vG2x+WSfrfohO1aLxkGbXZFnra64HrHffI1t2OnCF1ApFJYwDANN01heMrHqa9Q28vhVVYJeZRo9u0x4ZoFkusCCUSKbW5XJmCWZ/to2MjrOlF/hqFml096ie7TJ84MKx682qQhw0ueX4KQvSNZcFZ2miKfyxBI5geuEtRTBSFJmOprE1i+enYtycWpx+d7i6/khF2d7NPfWmI5EcHm8EpyYUtEzRUICiCVMZuazqOE4aihO4EZsQ6K4WEjz/XOLq8sX/PjS5udVh/MTi/JaDvekT4LuCUV2pIYTopOUhK+R/r3r2IZGnGizGh9PGpy9teh1nvKuu8OH3h618iLK7zN0eXy3Oum/4k3oDyiKdX2e016dRr1GtVzEfKRTWjHJ53T5BfTBcY9ya+Nfwf6Ua2WTbxdNcW5lmo11NkomRjYlpp1BCQwKOlwkk3O8PKzyprXBp26V43aN3e0VVopZAsHAYKDdISbo9cppFox5zMwsmZTG0qJOIjGHXTxwINDjVXC6HohNY9wbGZW5O+zkjt0h1k6JDQQGwxrOMTfD4hf8V/4X/AWfxZAxxF8AwgAAAABJRU5ErkJggg==\'); background-size: cover;"\n              >\n                <img\n                  class="gatsby-resp-image-image"\n                  style="width: 100%; margin: 0; vertical-align: middle; position: absolute; box-shadow: inset 0px 0px 0px 400px white;"\n                  alt="Img: Viewing the Redux actions from the map with the redux-dev-tools"\n                  title=""\n                  src="/static/map-view-redux-actions-7594e5c2c43dcb32a381e4ce9f9da6f4-ba9a0.png"\n                  srcset="/static/map-view-redux-actions-7594e5c2c43dcb32a381e4ce9f9da6f4-125fe.png 163w,/static/map-view-redux-actions-7594e5c2c43dcb32a381e4ce9f9da6f4-637de.png 325w,/static/map-view-redux-actions-7594e5c2c43dcb32a381e4ce9f9da6f4-ba9a0.png 650w,/static/map-view-redux-actions-7594e5c2c43dcb32a381e4ce9f9da6f4-31247.png 975w,/static/map-view-redux-actions-7594e5c2c43dcb32a381e4ce9f9da6f4-38f66.png 1300w,/static/map-view-redux-actions-7594e5c2c43dcb32a381e4ce9f9da6f4-82702.png 1950w,/static/map-view-redux-actions-7594e5c2c43dcb32a381e4ce9f9da6f4-1f026.png 3586w"\n                  sizes="(max-width: 650px) 100vw, 650px"\n                />\n              </div>\n            </div>\n          </a>\n          </div></p>\n<p>In the next step we will give the favourites list with the ability to remove\nfavourites via Redux.</p>\n<hr>\n<ul>\n<li>\n<p><sup id="fn-1">[1]</sup>:\n<a href="https://egghead.io/courses/building-react-applications-with-idiomatic-redux">https://egghead.io/courses/building-react-applications-with-idiomatic-redux</a></p>\n</li>\n<li>\n<p><sup id="fn-2">[2]</sup>:\n<a href="https://redux.js.org/docs/recipes/reducers/PrerequisiteConcepts.html">https://redux.js.org/docs/recipes/reducers/PrerequisiteConcepts.html</a></p>\n</li>\n<li>\n<p><sup id="fn-3">[3]</sup>:\n<a href="https://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html">https://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html</a></p>\n</li>\n</ul>',
frontmatter:{title:"Managing Favourites with Redux",step:14}},allMarkdownRemark:{edges:[{node:{fields:{slug:"/tutorial/getting-started/"},frontmatter:{title:"Getting Started",step:null}}},{node:{fields:{slug:"/tutorial/links/"},frontmatter:{title:"Links",step:null}}},{node:{fields:{slug:"/tutorial/steps/1-setup-package/"},frontmatter:{title:"Generate the package.json",step:1}}},{node:{fields:{slug:"/tutorial/steps/10-pointer-details/"},frontmatter:{title:"Showing the Details of each Point",step:10}}},{node:{fields:{slug:"/tutorial/steps/11-favourite-places/"},frontmatter:{title:"Favourite Places",step:11}}},{node:{fields:{slug:"/tutorial/steps/12-favourites-list/"},frontmatter:{title:"Favourites List",step:12}}},{node:{fields:{slug:"/tutorial/steps/13-adding-redux/"},frontmatter:{title:"Starting with Redux",step:13}}},{node:{fields:{slug:"/tutorial/steps/14-managing-favourites-with-redux/"},frontmatter:{title:"Managing Favourites with Redux",step:14}}},{node:{fields:{slug:"/tutorial/steps/2-webpack/"},frontmatter:{title:"Setting up Webpack",step:2}}},{node:{fields:{slug:"/tutorial/steps/3-babel/"},frontmatter:{title:"Setting up Babel",step:3}}},{node:{fields:{slug:"/tutorial/steps/4-eslint-and-prettier/"},frontmatter:{title:"ESLint and Prettier",step:4}}},{node:{fields:{slug:"/tutorial/steps/5-starting-react/"},frontmatter:{title:"Starting with React",step:5}}},{node:{fields:{slug:"/tutorial/steps/6-adding-the-map/"},frontmatter:{title:"Adding the Map",step:6}}},{node:{fields:{slug:"/tutorial/steps/7-styling-with-postcss/"},frontmatter:{title:"CSS Modules and PostCSS",step:7}}},{node:{fields:{slug:"/tutorial/steps/8-webpack-dev-server/"},frontmatter:{title:"Webpack Dev Server",step:8}}},{node:{fields:{slug:"/tutorial/steps/9-adding-points-to-the-map/"},frontmatter:{title:"Adding Points to the Map",step:9}}},{node:{fields:{slug:"/tutorial/steps/15-removing-favourites-from-the-list/"},frontmatter:{title:"Removing Favourites from the List",step:15}}}]}},pathContext:{slug:"/tutorial/steps/14-managing-favourites-with-redux/"}}}});
//# sourceMappingURL=path---tutorial-steps-14-managing-favourites-with-redux-386f9df2569f9df338b9.js.map