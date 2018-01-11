webpackJsonp([0x967dcf7a4bb4],{331:function(n,s){n.exports={data:{markdownRemark:{html:'<p>We will now begin to add some pointers to the map. This will involve defining\ndata about what we want to show on the map and where; then building a new React\ncomponent that will display an icon at the positions we specified on the map.</p>\n<h2>Defining the pointer data</h2>\n<p>We are going to use a predefined list of "points" to apply to the map. You can\nimagine that we could load this data from a web server at some point but for now\nwe will use a static object.</p>\n<p>This data will live inside of the Map component, since it will be responsible\nfor rendering the pointers to the map.</p>\n<p>Take the following data and copy it to the <code>Map.jx</code> file, above the <code>Map</code>\nconstant.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> points <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    x<span class="token punctuation">:</span> <span class="token number">450</span><span class="token punctuation">,</span>\n    y<span class="token punctuation">:</span> <span class="token number">110</span><span class="token punctuation">,</span>\n    details<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'The Wall\'</span><span class="token punctuation">,</span>\n      house<span class="token punctuation">:</span> <span class="token string">"Night\'s Watch"</span><span class="token punctuation">,</span>\n      words<span class="token punctuation">:</span> <span class="token string">\'Night gathers, and now my watch begins.\'</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    x<span class="token punctuation">:</span> <span class="token number">375</span><span class="token punctuation">,</span>\n    y<span class="token punctuation">:</span> <span class="token number">355</span><span class="token punctuation">,</span>\n    details<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'Winterfell\'</span><span class="token punctuation">,</span>\n      house<span class="token punctuation">:</span> <span class="token string">\'Stark\'</span><span class="token punctuation">,</span>\n      words<span class="token punctuation">:</span> <span class="token string">\'Winter is Coming\'</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    x<span class="token punctuation">:</span> <span class="token number">345</span><span class="token punctuation">,</span>\n    y<span class="token punctuation">:</span> <span class="token number">705</span><span class="token punctuation">,</span>\n    details<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'The Twins\'</span><span class="token punctuation">,</span>\n      house<span class="token punctuation">:</span> <span class="token string">\'Frey\'</span><span class="token punctuation">,</span>\n      words<span class="token punctuation">:</span> <span class="token string">\'We Stand Together\'</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    x<span class="token punctuation">:</span> <span class="token number">155</span><span class="token punctuation">,</span>\n    y<span class="token punctuation">:</span> <span class="token number">775</span><span class="token punctuation">,</span>\n    details<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'The Iron Islands\'</span><span class="token punctuation">,</span>\n      house<span class="token punctuation">:</span> <span class="token string">\'Greyjoy\'</span><span class="token punctuation">,</span>\n      words<span class="token punctuation">:</span> <span class="token string">\'We Do Not Sow\'</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    x<span class="token punctuation">:</span> <span class="token number">150</span><span class="token punctuation">,</span>\n    y<span class="token punctuation">:</span> <span class="token number">945</span><span class="token punctuation">,</span>\n    details<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'Casterly Rock\'</span><span class="token punctuation">,</span>\n      house<span class="token punctuation">:</span> <span class="token string">\'Lannister\'</span><span class="token punctuation">,</span>\n      words<span class="token punctuation">:</span> <span class="token string">\'Hear me Roar!\'</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    x<span class="token punctuation">:</span> <span class="token number">545</span><span class="token punctuation">,</span>\n    y<span class="token punctuation">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>\n    details<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      name<span class="token punctuation">:</span> <span class="token string">"King\'s Landing"</span><span class="token punctuation">,</span>\n      house<span class="token punctuation">:</span> <span class="token string">\'Baratheon\'</span><span class="token punctuation">,</span>\n      words<span class="token punctuation">:</span> <span class="token string">\'Ours is the Fury\'</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    x<span class="token punctuation">:</span> <span class="token number">250</span><span class="token punctuation">,</span>\n    y<span class="token punctuation">:</span> <span class="token number">1190</span><span class="token punctuation">,</span>\n    details<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'Highgarden\'</span><span class="token punctuation">,</span>\n      house<span class="token punctuation">:</span> <span class="token string">\'Tyrell\'</span><span class="token punctuation">,</span>\n      words<span class="token punctuation">:</span> <span class="token string">\'Growing Strong\'</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h2>Pointer component</h2>\n<p>Next we will add a <code>&#x3C;Pointer /></code> component that will show each location on the\nmap. When clicking on this pointer a popup window will show with the extra\ndetails for each location.</p>\n<p>Since this component will have to manage state, we will not be using a stateless\nfunctional component but instead a class that extends <code>React.Component</code>.</p>\n<p>We will start by adding our <code>index.js</code> file in the directory for the Pointer\ncomponent that will manage our imports and exports.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// app/js/components/Pointer/index.js</span>\n\n<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./Pointer\'</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Next we will create the <code>Pointer</code> class in the <code>Pointer.jsx</code> file. For now let\'s\nadd a simple render method that will return a <code>&#x3C;div /></code> that will control the\nstyles for our pointer. We will add a <code>style</code> prop that sets the <code>left</code> and\n<code>top</code> properties of the pointer which we read form the <code>x</code> and <code>y</code> values of our\ndata.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token comment">// app/js/components/Pointer/Pointer.jsx</span>\n\n<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Pointer</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span> x<span class="token punctuation">,</span> y <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> left<span class="token punctuation">:</span> x<span class="token punctuation">,</span> top<span class="token punctuation">:</span> y <span class="token punctuation">}</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> Pointer<span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Notice that we are using the ES6 destructuring assignment <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup> here to pull the\n<code>x</code> and <code>y</code> props into constants. This is a nice shorthand instead of having to\naccess the values manually.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// Old</span>\n<span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>x<span class="token punctuation">,</span>\n  y <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>y<span class="token punctuation">;</span>\n\n<span class="token comment">// New</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> x<span class="token punctuation">,</span> y <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h3>Adding PropTypes</h3>\n<p>At this point, ESLint should be highlighting the <code>x</code> and <code>y</code> values inside of\nyour editor on line 8 in red because there is an error here. React has a concept\nof "Prop Types" which allows you to specify for each component what data type\nyou expect for each of the incoming props. When you then supply an invalid type\n(for example, a number instead of a string), React will warn you in the console\n<sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup>.</p>\n<p><div>\n          <a\n            class="gatsby-resp-image-link"\n            title="original image"\n            href="/static/prop-types-wrong-type-c4f70d8b5654a4d3f831e6f1945c0d26-e4785.png"\n            style="display: block"\n            target="_blank"\n          >\n            <div\n              class="gatsby-resp-image-wrapper"\n              style="position: relative; z-index: -1; "\n            >\n              <div\n                class="gatsby-resp-image-background-image"\n                style="padding-bottom: 12.716763005780345%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAAjElEQVQI13WOTQuCUBBF3///WYUL8SM3GSI8e5YuUtG3aGFUp3lNEAQtLvcyh7kzZrUNFAVUlfgODqW6O0LbQtepQu57OJ+gkR3nYJ55ikZr8cKvws3jMkBdQ5pAnkMcQ5bqgUHYNKnG8ethHvQpXCXfZH4XbvBev4kiKcxgu4FEyss9b7Ysqt/8h70Aexbhz46vC+gAAAAASUVORK5CYII=\'); background-size: cover;"\n              >\n                <img\n                  class="gatsby-resp-image-image"\n                  style="width: 100%; margin: 0; vertical-align: middle; position: absolute; box-shadow: inset 0px 0px 0px 400px white;"\n                  alt="Img: Prop Types warning when wrong type is given"\n                  title=""\n                  src="/static/prop-types-wrong-type-c4f70d8b5654a4d3f831e6f1945c0d26-ba9a0.png"\n                  srcset="/static/prop-types-wrong-type-c4f70d8b5654a4d3f831e6f1945c0d26-125fe.png 163w,/static/prop-types-wrong-type-c4f70d8b5654a4d3f831e6f1945c0d26-637de.png 325w,/static/prop-types-wrong-type-c4f70d8b5654a4d3f831e6f1945c0d26-ba9a0.png 650w,/static/prop-types-wrong-type-c4f70d8b5654a4d3f831e6f1945c0d26-e4785.png 692w"\n                  sizes="(max-width: 650px) 100vw, 650px"\n                />\n              </div>\n            </div>\n          </a>\n          </div></p>\n<p>Let\'s add a Prop Types definition to this component in order to remove the\nerrors. The <code>PropTypes</code> class lives in a node module <code>prop-types</code>. Since this is\na dependency of <code>React</code> itself we already have this installed so now we can\nsimply import <code>PropTypes</code> and set the <code>propTypes</code> value of our class.</p>\n<p>We will specify that <code>Pointer</code> has <code>x</code> and <code>y</code> props that should be numbers and\nare not optional. <code>PropTypes</code> has an API for more complex data types, such as\nunions of types. Look at the documentation for more complex examples.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Pointer/Pointer.jsx\n\nimport React, { Component } from \'react\';\n<span class="token inserted">+ import PropTypes from \'prop-types\';</span>\n\nclass Pointer extends Component {\n  ...\n}\n\n<span class="token inserted">+ Pointer.propTypes = {</span>\n<span class="token inserted">+   x: PropTypes.number.isRequired,</span>\n<span class="token inserted">+   y: PropTypes.number.isRequired</span>\n<span class="token inserted">+ }</span>\n\nexport default Pointer;\n</code></pre>\n      </div>\n<h2>Styling the pointer</h2>\n<p>Next we can add a CSS module to manage the styles of the pointer itself. We will\nbe using a background image, so go ahead and copy the <code>pointer.png</code> image from\n<code>.assets</code> into our application.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code><span class="token function">cp</span> .assets/pointer.png app/img\n</code></pre>\n      </div>\n<p>Let\'s create a CSS module for the Pointer with some variables and basic styles.\nNotice that we set <code>position: absolute</code> on the pointer. Together with the <code>top</code>\nand <code>left</code> styles that are applied in the React component, this is how the\nPointer will be placed on the map.</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code><span class="token comment">/* app/js/components/Pointer/Pointer.css */</span>\n\n<span class="token selector">:root</span> <span class="token punctuation">{</span>\n  <span class="token property">--pointerColor</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span>\n  <span class="token property">--pointerSize</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>\n  <span class="token property">--detailsBackground</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.pointer</span> <span class="token punctuation">{</span>\n  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>\n  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--pointerColor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--pointerSize<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--pointerSize<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token property">border-radius</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--pointerSize<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token property">box-shadow</span><span class="token punctuation">:</span> 0 0 2px 2px <span class="token function">rgba</span><span class="token punctuation">(</span>0, 0, 0, 0.5<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url">url(\'../../../img/pointer.png\')</span> center center no-repeat<span class="token punctuation">;</span>\n  <span class="token property">background-size</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--pointerSize<span class="token punctuation">)</span> <span class="token function">var</span><span class="token punctuation">(</span>--pointerSize<span class="token punctuation">)</span><span class="token selector">;\n\n  &amp;:hover</span> <span class="token punctuation">{</span>\n    <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Finally we will import the styles into the Pointer component and apply the\n<code>.pointer</code> class name to the pointer <code>&#x3C;div /></code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Pointer/Pointer.jsx\n\nimport React, { Component } from \'react\';\nimport PropTypes from \'prop-types\';\n\n<span class="token inserted">+ import styles from \'./Pointer.css\';</span>\n\nclass Pointer extends Component {\n  render() {\n    const { x, y } = this.props;\n\n<span class="token deleted">-   return &lt;div style={{ left: x, top: y }} />;</span>\n<span class="token inserted">+   return &lt;div className={styles.pointer} style={{ left: x, top: y }} />;</span>\n  }\n}\n\n...\n</code></pre>\n      </div>\n<h2>Wiring the Pointer to the Map</h2>\n<p>Let\'s see if our <code>&#x3C;Pointer /></code> component is working by adding instances of them\nto the map. We will update the <code>&#x3C;Map /></code> component to import <code>Pointer</code> and then\nfor each item in the points data, render a <code>&#x3C;Pointer /></code> component inside of the\nmap.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/components/Map/Map.jsx\nimport React from \'react\';\n\n<span class="token inserted">+ import Pointer from \'../Pointer\';</span>\nimport styles from \'./Map.css\';\n\n...\n\nconst Map = () => {\n<span class="token deleted">- return &lt;div className={styles.map} />;</span>\n<span class="token inserted">+ return (</span>\n<span class="token inserted">+   &lt;div className={styles.map}></span>\n<span class="token inserted">+     {points.map((point, index) => &lt;Pointer {...point} key={index} />)}</span>\n<span class="token inserted">+   &lt;/div></span>\n<span class="token inserted">+ );</span>\n};\n</code></pre>\n      </div>\n<p>In this new code we are mapping over the <code>points</code> data array and for every\npoint, we return a <code>&#x3C;Pointer /></code> and we destructure the <code>point</code> object as the\nprops. This is the same as passing:</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Pointer</span> <span class="token attr-name">x</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>point<span class="token punctuation">.</span>x<span class="token punctuation">}</span></span> <span class="token attr-name">y</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>point<span class="token punctuation">.</span>y<span class="token punctuation">}</span></span> <span class="token attr-name">details</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>point<span class="token punctuation">.</span>details<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Finally we pass a <code>key</code> prop. The <code>key</code> is important when you are mapping over\ndata, this allows React to differentiate between each item in the list so that\nit can determine which ones have updated <sup id="fnref-3"><a href="#fn-3" class="footnote-ref">3</a></sup>. The key value must be unique for\neach element in the list, so we use the <code>index</code> of the array item that we are\ncurrently on. If you forget the <code>key</code> prop in a list, React will show a warning\n(and also ESLint will consider this an error and warn you too.)</p>\n<p><div>\n          <a\n            class="gatsby-resp-image-link"\n            title="original image"\n            href="/static/missing-key-prop-warning-2a382ea7a66553298a45357d328ac436-e4785.png"\n            style="display: block"\n            target="_blank"\n          >\n            <div\n              class="gatsby-resp-image-wrapper"\n              style="position: relative; z-index: -1; "\n            >\n              <div\n                class="gatsby-resp-image-background-image"\n                style="padding-bottom: 14.017341040462428%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAAoElEQVQI1yWOyQrCQBBE8/9fpZCT0RwMaJJDzL6AWUQFDTrPmvFQU0xX96O8d57DJYOi+KuqoCz/s7bFKP/qb4ocY125dbfbNJhp4ppl3DR7at/79gOkKYQhHI9w2EMUQZK4g4ddFMS61V0gq7WuQTJ9hy21di2fccRDD3EMvg/BDrYbeQDnkwPOgi06nAWbpFGwUYCXMurKQV3bQcWWhR8p799d3Y/QSwAAAABJRU5ErkJggg==\'); background-size: cover;"\n              >\n                <img\n                  class="gatsby-resp-image-image"\n                  style="width: 100%; margin: 0; vertical-align: middle; position: absolute; box-shadow: inset 0px 0px 0px 400px white;"\n                  alt="Img: Warning given if key prop is missing"\n                  title=""\n                  src="/static/missing-key-prop-warning-2a382ea7a66553298a45357d328ac436-ba9a0.png"\n                  srcset="/static/missing-key-prop-warning-2a382ea7a66553298a45357d328ac436-125fe.png 163w,/static/missing-key-prop-warning-2a382ea7a66553298a45357d328ac436-637de.png 325w,/static/missing-key-prop-warning-2a382ea7a66553298a45357d328ac436-ba9a0.png 650w,/static/missing-key-prop-warning-2a382ea7a66553298a45357d328ac436-e4785.png 692w"\n                  sizes="(max-width: 650px) 100vw, 650px"\n                />\n              </div>\n            </div>\n          </a>\n          </div></p>\n<h2>Next Steps</h2>\n<p>At this point if you look at the project in the browser, you will see yellow\nmarkers at different locations over the map.</p>\n<p><div>\n          <a\n            class="gatsby-resp-image-link"\n            title="original image"\n            href="/static/map-with-first-pointers-d5934c286ba698be76e5f4a7aad8b289-eac0c.png"\n            style="display: block"\n            target="_blank"\n          >\n            <div\n              class="gatsby-resp-image-wrapper"\n              style="position: relative; z-index: -1; "\n            >\n              <div\n                class="gatsby-resp-image-background-image"\n                style="padding-bottom: 49.097938144329895%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsSAAALEgHS3X78AAACiklEQVQoz0WS7S+bURjG+ydsNqqtqpZOW0zGLEKFDdnYlgzDvFXL0JbplGg1VX2h1KNMbMk2i0jE7MM+sNWWWWK+C//Sb+d5ZNmHk/vknOf5neu67luVm2cgR6tnyu/n7OwPF5fnXFyccynqwZd9wpEI29sf2NnZ4cfPDJnMoajfODz6So3dTpGlhM7uLsrvVKDW6VHdUGsVoEZfgFoGT/s5PT0hc3xERVU10XiM9LrE54M9vh8d8Pt4l5NfGSQpSb7JzIOmRqRUnPqGOjRCnCorR4MM1eYblQO5NjQ2UVZRhbHYhtFsoa29nbdbEh/fp9nf3WDvU4rtdzEBqcV0y0ZnRwtmi4VsTR6q6zm5isJ/S1dQSLGthKet9eQVmKipsxObnyIcGCMV9bC1PMFq3M1mcgJX/xPKK+9itpZiMBVdAWV12Rqd8J+vHOgFJE9ALTYrOoMJu/0esaCTuel+IrMDrERGWAg42Vh0K/vIrJOFoIuu9ibkfigKZagMNJhMDPa0UlZ+m6b71Tj7HuPzdDL9qpvorINocFgBr8RHkKKjpIXSpIAGfD286Gi+UngtW83/xhh4Pd5LaMZFyN9PPDTE8oKb1cQYa0kP84FBpEUPG0kv6wk36YSXpfAQj5rtlJbZFIYqSwBlstwMa4lV/DBOIiysCDWL8yMshl8KsIP1pINEZFjARX4pn/jOKx520P6sEUOhGa08JcKlSvatMxjpaGum+/lDNlcnhRIXyaib6NwQwak+lgR4U5phOT6q3L9JTSIJdSF/L8VWq5KdvG7m6lDJ81daVkIq7iW15CGxIDKRc4oN4+htITwzoEDjoWERvmjGio+1pQmxd4iHnNTWVIr51SpA2e1f5B2U1uxTS5EAAAAASUVORK5CYII=\'); background-size: cover;"\n              >\n                <img\n                  class="gatsby-resp-image-image"\n                  style="width: 100%; margin: 0; vertical-align: middle; position: absolute; box-shadow: inset 0px 0px 0px 400px white;"\n                  alt="Img: Map with the pointers"\n                  title=""\n                  src="/static/map-with-first-pointers-d5934c286ba698be76e5f4a7aad8b289-ba9a0.png"\n                  srcset="/static/map-with-first-pointers-d5934c286ba698be76e5f4a7aad8b289-125fe.png 163w,/static/map-with-first-pointers-d5934c286ba698be76e5f4a7aad8b289-637de.png 325w,/static/map-with-first-pointers-d5934c286ba698be76e5f4a7aad8b289-ba9a0.png 650w,/static/map-with-first-pointers-d5934c286ba698be76e5f4a7aad8b289-eac0c.png 776w"\n                  sizes="(max-width: 650px) 100vw, 650px"\n                />\n              </div>\n            </div>\n          </a>\n          </div></p>\n<p>The next step will be to use the internal <code>state</code> of a React component to hide\nor show the details of each pointer.</p>\n<hr>\n<ul>\n<li><sup id="fn-1">[1]</sup>:\n<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment</a></li>\n<li><sup id="fn-2">[2]</sup>:\n<a href="https://reactjs.org/docs/typechecking-with-proptypes.html">https://reactjs.org/docs/typechecking-with-proptypes.html</a></li>\n<li><sup id="fn-3">[3]</sup>: <a href="https://reactjs.org/docs/lists-and-keys.html#keys">https://reactjs.org/docs/lists-and-keys.html#keys</a></li>\n</ul>',frontmatter:{title:"Adding Points to the Map",step:9}},allMarkdownRemark:{edges:[{node:{fields:{slug:"/tutorial/getting-started/"},frontmatter:{title:"Getting Started",step:null}}},{node:{fields:{slug:"/tutorial/links/"},frontmatter:{title:"Links",step:null}}},{node:{fields:{slug:"/tutorial/steps/1-setup-package/"},frontmatter:{title:"Generate the package.json",step:1}}},{node:{fields:{slug:"/tutorial/steps/10-pointer-details/"},frontmatter:{title:"Showing the Details of each Point",step:10}}},{node:{fields:{slug:"/tutorial/steps/11-favourite-places/"},frontmatter:{title:"Favourite Places",step:11}}},{node:{fields:{slug:"/tutorial/steps/12-favourites-list/"},frontmatter:{title:"Favourites List",step:12}}},{node:{fields:{slug:"/tutorial/steps/13-adding-redux/"},frontmatter:{title:"Starting with Redux",step:13}}},{node:{fields:{slug:"/tutorial/steps/14-managing-favourites-with-redux/"},frontmatter:{title:"Managing Favourites with Redux",step:14}}},{node:{fields:{slug:"/tutorial/steps/2-webpack/"},frontmatter:{title:"Setting up Webpack",step:2}}},{node:{fields:{slug:"/tutorial/steps/3-babel/"},frontmatter:{title:"Setting up Babel",step:3}}},{node:{fields:{slug:"/tutorial/steps/4-eslint-and-prettier/"},frontmatter:{title:"ESLint and Prettier",step:4}}},{node:{fields:{slug:"/tutorial/steps/5-starting-react/"},frontmatter:{title:"Starting with React",step:5}}},{node:{fields:{slug:"/tutorial/steps/6-adding-the-map/"},frontmatter:{title:"Adding the Map",step:6}}},{node:{fields:{slug:"/tutorial/steps/7-styling-with-postcss/"},frontmatter:{title:"CSS Modules and PostCSS",step:7}}},{node:{fields:{slug:"/tutorial/steps/8-webpack-dev-server/"},frontmatter:{title:"Webpack Dev Server",step:8}}},{node:{fields:{slug:"/tutorial/steps/9-adding-points-to-the-map/"},frontmatter:{title:"Adding Points to the Map",step:9}}},{node:{fields:{slug:"/tutorial/steps/15-removing-favourites-from-the-list/"},frontmatter:{title:"Removing Favourites from the List",step:15}}},{node:{fields:{slug:"/tutorial/steps/16-ids-for-points/"},frontmatter:{title:"Adding IDs to the Points Data",step:16}}},{node:{fields:{slug:"/tutorial/steps/17-testing-with-jest/"},frontmatter:{title:"Testing with Jest",step:17}}}]}},pathContext:{slug:"/tutorial/steps/9-adding-points-to-the-map/"}}}});
//# sourceMappingURL=path---tutorial-steps-9-adding-points-to-the-map-5ef5a10430f3a66df66b.js.map