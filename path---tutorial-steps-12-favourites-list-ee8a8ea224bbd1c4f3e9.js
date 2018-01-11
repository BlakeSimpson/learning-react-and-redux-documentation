webpackJsonp([17971265750924],{315:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Our next task will be to create a component that displays a list of the places\non the map that we marked as our favourites. This will be a list that we render\nunder the map.</p>\n<p>We will begin by creating a directory in the application for this new component\nthat we will call <code>FavouritesList</code>. That means as before we will first create an\n<code>index.js</code> file that is responsible for exporting the actual component.</p>\n<h2>FavouriteList Component</h2>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// app/js/components/FavouritesList/index.jsx</span>\n\n<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./FavouritesList\'</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Next we will go ahead and define some CSS styles that will be used for the list.\nRemember that since the <code>--mapWidth</code> and <code>--text</code>variables are defined in\n<code>App.css</code>, they are available to this CSS module also.</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code><span class="token comment">/* app/js/components/FavouritesList/FavouritesList.css */</span>\n\n<span class="token selector">.listWrapper</span> <span class="token punctuation">{</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--mapWidth<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token property">margin</span><span class="token punctuation">:</span> 10px auto 0<span class="token punctuation">;</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--text<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.list</span> <span class="token punctuation">{</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n  <span class="token property">list-style-type</span><span class="token punctuation">:</span> none<span class="token selector">;\n\n  li</span> <span class="token punctuation">{</span>\n    <span class="token property">padding</span><span class="token punctuation">:</span> 10px 0<span class="token punctuation">;</span>\n    <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid #333<span class="token selector">;\n\n    &amp;:last-child</span> <span class="token punctuation">{</span>\n      <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>To complete this new component, we will now add the <code>FavouritesList.jsx</code> file\nthat contains our markup and logic. We will build a stateless functional\ncomponent that accepts a prop called <code>points</code> (the list of points we specified\nin <code>Map.jsx</code>), filters them for points marked as favourites and then renders\nthese into a list.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token comment">// app/js/components/FavouritesList/FavouritesList.jsx</span>\n\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> PropTypes <span class="token keyword">from</span> <span class="token string">\'prop-types\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">\'./FavouritesList.css\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">FavouritesList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> points <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> favourites <span class="token operator">=</span> points<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>point <span class="token operator">=></span> point<span class="token punctuation">.</span>favourite<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>listWrapper<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>Favourites<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>list<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n        <span class="token punctuation">{</span>favourites<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>favourite<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>index<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>favourite<span class="token punctuation">.</span>details<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n        <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\nFavouritesList<span class="token punctuation">.</span>propTypes <span class="token operator">=</span> <span class="token punctuation">{</span>\n  points<span class="token punctuation">:</span> PropTypes<span class="token punctuation">.</span><span class="token function">arrayOf</span><span class="token punctuation">(</span>PropTypes<span class="token punctuation">.</span>object<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> FavouritesList<span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h2>Rendering the Favourites List</h2>\n<p>We now want to show our new list on the web page underneath the Map. First of\nall though we will need to refactor how our data is handled a little.</p>\n<p>Since the <code>points</code> data is specified inside of the <code>Map</code> component, the\nfavourites list does not know about it. Instead of copying all of the data into\nboth components we instead will move the data into the <code>App</code> component so that\nit can pass the <code>points</code> array down to both the <code>Map</code> and <code>FavouritesList</code> as a\nprop.</p>\n<p>You may have noticed that we already specified that the <code>FavouritesList</code> class\naccepts a <code>points</code> prop:</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token keyword">const</span> <span class="token function-variable function">FavouritesList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> points <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n</code></pre>\n      </div>\n<p>We will now do the same to the <code>Map</code> component.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Map/Map.jsx\n\n<span class="token deleted">- const Map = () => {</span>\n<span class="token inserted">+ const Map = ({ points }) => {</span>\n    return (\n      &lt;div className={styles.map}>\n        {points.map((point, index) => &lt;Pointer {...point} key={index} />)}\n      &lt;/div>\n    );\n  };\n</code></pre>\n      </div>\n<p>Now that this component accepts props, we will also have to add a prop types\ndefinition.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Map/Map.jsx\n\n  import React from \'react\';\n<span class="token inserted">+ import PropTypes from \'prop-types\';</span>\n\n...\n\n<span class="token inserted">+ Map.propTypes = {</span>\n<span class="token inserted">+   points: PropTypes.arrayOf(PropTypes.object)</span>\n<span class="token inserted">+ };</span>\n\n  export default Map;\n</code></pre>\n      </div>\n<p>Finally we will cut the large <code>points</code> array out of the <code>Map.jsx</code> file and move\nit to the <code>App.jsx</code> component instead. We can then pass the <code>points</code> array as a\nprop to the <code>Map</code> and our newly added <code>FavouritesList</code>. We will also make the\nsecond entry in the posts array a favourite by default in order to show multiple\nitems in the list.</p>\n<p>Apply the following changes to the <code>App</code> component:</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/App/App.jsx\n\n  import React from \'react\';\n\n  import Map from \'../Map\';\n<span class="token inserted">+ import FavouritesList from \'../FavouritesList\';</span>\n\n  // eslint-disable-next-line no-unused-vars\n  import styles from \'./App.css\';\n\n<span class="token inserted">+ const points = [</span>\n<span class="token inserted">+   {</span>\n<span class="token inserted">+     x: 450,</span>\n<span class="token inserted">+     y: 110,</span>\n<span class="token inserted">+     details: {</span>\n<span class="token inserted">+       name: \'The Wall\',</span>\n<span class="token inserted">+       house: "Night\'s Watch",</span>\n<span class="token inserted">+       words: \'Night gathers, and now my watch begins.\'</span>\n<span class="token inserted">+     },</span>\n<span class="token inserted">+     favourite: true</span>\n<span class="token inserted">+   },</span>\n<span class="token inserted">+   {</span>\n<span class="token inserted">+     x: 375,</span>\n<span class="token inserted">+     y: 355,</span>\n<span class="token inserted">+     details: {</span>\n<span class="token inserted">+       name: \'Winterfell\',</span>\n<span class="token inserted">+       house: \'Stark\',</span>\n<span class="token inserted">+       words: \'Winter is Coming\'</span>\n<span class="token inserted">+     },</span>\n<span class="token inserted">+     favourite: true</span>\n<span class="token inserted">+   },</span>\n<span class="token inserted">+   {</span>\n<span class="token inserted">+     x: 345,</span>\n<span class="token inserted">+     y: 705,</span>\n<span class="token inserted">+     details: {</span>\n<span class="token inserted">+       name: \'The Twins\',</span>\n<span class="token inserted">+       house: \'Frey\',</span>\n<span class="token inserted">+       words: \'We Stand Together\'</span>\n<span class="token inserted">+     }</span>\n<span class="token inserted">+   },</span>\n<span class="token inserted">+   {</span>\n<span class="token inserted">+     x: 155,</span>\n<span class="token inserted">+     y: 775,</span>\n<span class="token inserted">+     details: {</span>\n<span class="token inserted">+       name: \'The Iron Islands\',</span>\n<span class="token inserted">+       house: \'Greyjoy\',</span>\n<span class="token inserted">+       words: \'We Do Not Sow\'</span>\n<span class="token inserted">+     }</span>\n<span class="token inserted">+   },</span>\n<span class="token inserted">+   {</span>\n<span class="token inserted">+     x: 150,</span>\n<span class="token inserted">+     y: 945,</span>\n<span class="token inserted">+     details: {</span>\n<span class="token inserted">+       name: \'Casterly Rock\',</span>\n<span class="token inserted">+       house: \'Lannister\',</span>\n<span class="token inserted">+       words: \'Hear me Roar!\'</span>\n<span class="token inserted">+     }</span>\n<span class="token inserted">+   },</span>\n<span class="token inserted">+   {</span>\n<span class="token inserted">+     x: 545,</span>\n<span class="token inserted">+     y: 1000,</span>\n<span class="token inserted">+     details: {</span>\n<span class="token inserted">+       name: "King\'s Landing",</span>\n<span class="token inserted">+       house: \'Baratheon\',</span>\n<span class="token inserted">+       words: \'Ours is the Fury\'</span>\n<span class="token inserted">+     }</span>\n<span class="token inserted">+   },</span>\n<span class="token inserted">+   {</span>\n<span class="token inserted">+     x: 250,</span>\n<span class="token inserted">+     y: 1190,</span>\n<span class="token inserted">+     details: {</span>\n<span class="token inserted">+       name: \'Highgarden\',</span>\n<span class="token inserted">+       house: \'Tyrell\',</span>\n<span class="token inserted">+       words: \'Growing Strong\'</span>\n<span class="token inserted">+     }</span>\n<span class="token inserted">+   }</span>\n<span class="token inserted">+ ];</span>\n\n  const App = () => {\n    return (\n      &lt;section>\n<span class="token inserted">+      &lt;Map points={points} /></span>\n<span class="token inserted">+      &lt;FavouritesList points={points} /></span>\n<span class="token deleted">-      &lt;Map /></span>\n      &lt;/section>\n    );\n  };\n\n  export default App;\n</code></pre>\n      </div>\n<p>Take a look again in your browser at the changes we have added and if you scroll\nto the bottom of the map you will see the locations "The Wall" and "Winterfell"\nare in our favourites list, since both of these locations have the <code>favourite: true</code> property set in the <code>points</code> array.</p>\n<p><div>\n          <a\n            class="gatsby-resp-image-link"\n            title="original image"\n            href="/static/initial-favourites-list-cf9abe703ec48112de6f7e4897f524da-d518d.png"\n            style="display: block"\n            target="_blank"\n          >\n            <div\n              class="gatsby-resp-image-wrapper"\n              style="position: relative; z-index: -1; "\n            >\n              <div\n                class="gatsby-resp-image-background-image"\n                style="padding-bottom: 32.62764632627647%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsSAAALEgHS3X78AAABUUlEQVQoz61Qy07CUBTsL4jQdyl919KWh4kmKgsXikYwhigu0ERloQghMWoCJGrQsFCEXx7PLcEf0MUk58yZmXvO5QQlC9Ww4YcRwjjEoN/EdauGk/ouJoMLTAcNfA2b+ByeY/7awvStje/xLeYf95i9dzCbdNG5rsN0HMhZA1xaUJCRVBxVt2C6PmzPh+MHONzfxvjxFA/tKkbdGvo3Bxj1jtGoV3B3VcNT7wwvz5eo7lVg2A5EVYek5cClMiJWCKZtQdZN6JaHnO3Dcl2UyxHiQh5xHGAt8BCG9CDx+Yi4YoRiuZCEMV9G1pLFOC1nEelBN10IchasV2h1XmKCLHjiVkUNaVFFimfXsHrRpwU18ci0GS+xXgFnuwH9XQl+EEEgMQNPYpGEDIK84JKazcjI5gxL/a+PwDkUGBXWYdCpy5C/gAujEjY2d6Boxr8E/gBodNL+HBMTfgAAAABJRU5ErkJggg==\'); background-size: cover;"\n              >\n                <img\n                  class="gatsby-resp-image-image"\n                  style="width: 100%; margin: 0; vertical-align: middle; position: absolute; box-shadow: inset 0px 0px 0px 400px white;"\n                  alt="Img: Initial favourites list rendered below the map"\n                  title=""\n                  src="/static/initial-favourites-list-cf9abe703ec48112de6f7e4897f524da-ba9a0.png"\n                  srcset="/static/initial-favourites-list-cf9abe703ec48112de6f7e4897f524da-125fe.png 163w,/static/initial-favourites-list-cf9abe703ec48112de6f7e4897f524da-637de.png 325w,/static/initial-favourites-list-cf9abe703ec48112de6f7e4897f524da-ba9a0.png 650w,/static/initial-favourites-list-cf9abe703ec48112de6f7e4897f524da-d518d.png 803w"\n                  sizes="(max-width: 650px) 100vw, 650px"\n                />\n              </div>\n            </div>\n          </a>\n          </div></p>\n<h2>Dodgy Data</h2>\n<p>How about trying to add new places to the list, though? Try toggling a location\nsuch as "King\'s Landing" to be a favourite on the map. Although the marker turns\nred to indicate a favourite the list does not update with the new entry. In the\nsame manner if you toggle "Winterfell" to no longer be a favourite the map\nupdates correctly but the list stays the same.</p>\n<p>This is because our data is stored inside the <code>App</code> component and is being\npassed down into the map and the list separately. Essentially we copy the data\nto each component and then the <code>Map</code>, <code>Pointer</code>, and <code>FavouritesList</code> components\nuse internal state / logic to decide what to render based on their initial\nprops.</p>\n<p>Adding the favourites list was not a critical feature but has allowed us to\ndemonstrate the problem, if even in a simple example, of how it can quickly\nbecome difficult to manage data and state throughout a React application. In the\nnext steps we will look at using "Redux" which will provide us with a method of\nstoring all of our data in a central location and then have every component\nrespond when that data is changed.</p>',frontmatter:{title:"Favourites List",step:12}},allMarkdownRemark:{edges:[{node:{fields:{slug:"/tutorial/links/"},frontmatter:{title:"Links",step:null}}},{node:{fields:{slug:"/tutorial/getting-started/"},frontmatter:{title:"Getting Started",step:null}}},{node:{fields:{slug:"/tutorial/steps/1-setup-package/"},frontmatter:{title:"Generate the package.json",step:1}}},{node:{fields:{slug:"/tutorial/steps/10-pointer-details/"},frontmatter:{title:"Showing the Details of each Point",step:10}}},{node:{fields:{slug:"/tutorial/steps/11-favourite-places/"},frontmatter:{title:"Favourite Places",step:11}}},{node:{fields:{slug:"/tutorial/steps/12-favourites-list/"},frontmatter:{title:"Favourites List",step:12}}},{node:{fields:{slug:"/tutorial/steps/13-adding-redux/"},frontmatter:{title:"Starting with Redux",step:13}}},{node:{fields:{slug:"/tutorial/steps/2-webpack/"},frontmatter:{title:"Setting up Webpack",step:2}}},{node:{fields:{slug:"/tutorial/steps/3-babel/"},frontmatter:{title:"Setting up Babel",step:3}}},{node:{fields:{slug:"/tutorial/steps/14-managing-favourites-with-redux/"},frontmatter:{title:"Managing Favourites with Redux",step:14}}},{node:{fields:{slug:"/tutorial/steps/4-eslint-and-prettier/"},frontmatter:{title:"ESLint and Prettier",step:4}}},{node:{fields:{slug:"/tutorial/steps/7-styling-with-postcss/"},frontmatter:{title:"CSS Modules and PostCSS",step:7}}},{node:{fields:{slug:"/tutorial/steps/6-adding-the-map/"},frontmatter:{title:"Adding the Map",step:6}}},{node:{fields:{slug:"/tutorial/steps/5-starting-react/"},frontmatter:{title:"Starting with React",step:5}}},{node:{fields:{slug:"/tutorial/steps/8-webpack-dev-server/"},frontmatter:{title:"Webpack Dev Server",step:8}}},{node:{fields:{slug:"/tutorial/steps/9-adding-points-to-the-map/"},frontmatter:{title:"Adding Points to the Map",step:9}}}]}},pathContext:{slug:"/tutorial/steps/12-favourites-list/"}}}});
//# sourceMappingURL=path---tutorial-steps-12-favourites-list-ee8a8ea224bbd1c4f3e9.js.map