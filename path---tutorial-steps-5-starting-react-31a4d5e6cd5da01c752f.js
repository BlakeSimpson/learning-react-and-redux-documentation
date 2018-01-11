webpackJsonp([97838741517688],{327:function(n,a){n.exports={data:{markdownRemark:{html:'<h2>What is React?</h2>\n<p><a href="https://reactjs.org/">React</a> is a view rendering library developed and actively\nmaintained by a team of engineers at Facebook. I feel that first of all it is\nhelpful to clear up a common misconception about what React isn\'t, rather than\nwhat it is.</p>\n<p>React is not a framework but rather a library for developing user interfaces.\nThe React library does not come with routing, "models" or data management,\nnetwork request helpers, or even a test suite.</p>\n<p>Since React has a large community around it there are however many libraries\nthat you can plug into your application that provide these features to you as a\ndeveloper in a "React way". For example,\n<a href="https://github.com/ReactTraining/react-router">React Router</a> for navigation or\n<a href="https://redux.js.org/">Redux</a> for managing data. To make a network request you\ndon\'t add something like jQuery, you just use the browsers native <code>fetch</code>\nfunction.</p>\n<h4>So, what exactly is React then?</h4>\n<p>The best explanation would come directly from Facebook: <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup></p>\n<blockquote>\n<p><strong>Declarative</strong></p>\n<p>React makes it painless to create interactive UIs. Design simple views for\neach state in your application, and React will efficiently update and render\njust the right components when your data changes. Declarative views make your\ncode more predictable and easier to debug.</p>\n<p><strong>Component-Based</strong></p>\n<p>Build encapsulated components that manage their own state, then compose them\nto make complex UIs. Since component logic is written in JavaScript instead of\ntemplates, you can easily pass rich data through your app and keep state out\nof the DOM.</p>\n<p><strong>Learn Once, Write Anywhere</strong></p>\n<p>We don’t make assumptions about the rest of your technology stack, so you can\ndevelop new features in React without rewriting existing code. React can also\nrender on the server using Node and power mobile apps using React Native.</p>\n</blockquote>\n<h4>Live updates / renders</h4>\n<p>Each React component has a <code>render</code> method that defines which DOM will be\nreturned when the component is rendered to the screen. As the Facebook\nexplanation states, React only updates the parts of your DOM that have changes\nattached. It does this by using a virtual DOM to diff the current DOM in the\nbrowser, calculating what needs to change, and only changing those parts.</p>\n<p>React understands what will change by looking at <code>state</code> and <code>props</code>. React\ncomponents can have internal <code>state</code>, which when changed, causes a re-render of\nthis component. <code>props</code> are basically HTML attributes, such as <code>href</code> for an\n<code>&#x3C;a></code> tag. State can be passed down to child components via props, and when\nthese change a re-render is also triggered.</p>\n<p>This means that React component can update to live changes, for an example see\nthe <a href="https://reactjs.org/#a-component-using-external-plugins">Markdown example</a>\non the React.js homepage.</p>\n<h2>What is JSX?</h2>\n<p>As mentioned in previous steps of this tutorial, React has a special syntax\ncalled JSX. JSX is an "XML-Like Syntax for JavaScript". <sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup></p>\n<p>Although it is possible to write React components without JSX, using vanilla\nJavaScript, it is most common to use the JSX syntax. JSX can look very strange\nif you have never worked with it before however it starts to feel very natural\nafter a little experience.</p>\n<p>Let\'s take an example of a JSX React component and see what it would compile\ndown to. All JSX scripts should have a <code>.jsx</code> extension in order to\ndifferentiate from standard JavaScript.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token comment">// HelloMessage.jsx</span>\n\n<span class="token keyword">class</span> <span class="token class-name">HelloMessage</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Hello <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>HelloMessage</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Ned Stark<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>This is a simple example but you can already see some of the fundamentals of\nReact. We have an ES6 <code>class</code>, extending the methods from a <code>React.Component</code>.\nWe have the <code>render</code> method which returns the JSX that we are building. The JSX\nis a <code>&#x3C;h1></code> tag, which as you can imagine, is the same a <code>&#x3C;h1></code> in regular HTML.\nWe then interpolate a dynamic variable into the content of the H1,\n<code>this.props.name</code>. As can be seen on the final line, you pass the name <code>prop</code>,\nthe same an attribute in HTML.</p>\n<p>The final output rendered to the web page would be:</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Hello Ned Stark<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<p>As I mentioned earlier, you do not necessarily have to write React in JSX\nsyntax. The previous code sample would compile down to:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">HelloMessage</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">\'h1\'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'Hello \'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>\n  React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>HelloMessage<span class="token punctuation">,</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">\'Ned Stark\'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>So although this may look a little more natural, using JSX allows you to work\nfiles. So even though it can feel like going backwards to attach events using\nwith the templating language alongside your logic directly in the JavaScript\nuses a component based mindset, so keeping all logic in one place starts to make\n<code>onClick</code> handlers etc. to your components, it is important to remember React\nsense.</p>\n<h2>Writing our first Component</h2>\n<p>Now that we have a better understanding of React Components, let\'s implement our\nfirst one in the tutorial project.</p>\n<p>We will start by installing the React dependency.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>yarn add react\n</code></pre>\n      </div>\n<p>Next we will create a directory for out components, and a directory for you main\n<code>&#x3C;App /></code> component.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code><span class="token function">mkdir</span> app/js/components\n<span class="token function">mkdir</span> app/js/components/App\n</code></pre>\n      </div>\n<p>We can now create our App component in this directory by creating a file called\n<code>App.jsx</code>. We will start by importing <code>React</code> and <code>Component</code> into the file.</p>\n<p>Note: Whenever you use JSX in a file, you must import <code>React</code> even if you do not\nuse the variable directly, otherwise the component will not compile and you will\nsee the following console error:</p>\n<p><div>\n          <a\n            class="gatsby-resp-image-link"\n            title="original image"\n            href="/static/error-no-react-import-a3fc81869d1e602e395cab99b33006c0-909ab.png"\n            style="display: block"\n            target="_blank"\n          >\n            <div\n              class="gatsby-resp-image-wrapper"\n              style="position: relative; z-index: -1; "\n            >\n              <div\n                class="gatsby-resp-image-background-image"\n                style="padding-bottom: 25.934579439252335%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA6klEQVQY032PbU+CUBiG/f+/KdtKBI14GyGGSQjBFFLQzIEvXT7Yh9aafXh2n7Nz73rO1WniBPRHdtqASlXZDofgjfgMAja+zzpJ2GbZJXeSlOWfad/L2Yx6saBzXK3AcaCnUAjs1TBwlD6enB1ZMNI0llHEPs85td0WUlVX5xto2dC95XTT5XB3z7qvkg+GWIqC2evhCjS0bSLXhffl/8BGVJAyDzp7w6SyLFLTJNN1UgGlnkclOsei+KX5kaZUcXxR3QjjR/kt5fDk0fhjGlFrwpB6OqWW/JISkxeZCcid5wDGY5jPr/7wDMHEcUxhl1PnAAAAAElFTkSuQmCC\'); background-size: cover;"\n              >\n                <img\n                  class="gatsby-resp-image-image"\n                  style="width: 100%; margin: 0; vertical-align: middle; position: absolute; box-shadow: inset 0px 0px 0px 400px white;"\n                  alt="Img: Error thrown when React is not imported"\n                  title=""\n                  src="/static/error-no-react-import-a3fc81869d1e602e395cab99b33006c0-ba9a0.png"\n                  srcset="/static/error-no-react-import-a3fc81869d1e602e395cab99b33006c0-125fe.png 163w,/static/error-no-react-import-a3fc81869d1e602e395cab99b33006c0-637de.png 325w,/static/error-no-react-import-a3fc81869d1e602e395cab99b33006c0-ba9a0.png 650w,/static/error-no-react-import-a3fc81869d1e602e395cab99b33006c0-31247.png 975w,/static/error-no-react-import-a3fc81869d1e602e395cab99b33006c0-38f66.png 1300w,/static/error-no-react-import-a3fc81869d1e602e395cab99b33006c0-909ab.png 1712w"\n                  sizes="(max-width: 650px) 100vw, 650px"\n                />\n              </div>\n            </div>\n          </a>\n          </div></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token comment">// app/js/components/App/App.jsx</span>\n\n<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Next we will create a class called <code>App</code>, extended from <code>Component</code>, that has a\n<code>render</code> method.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token comment">// app/js/components/App/App.jsx</span>\n\n<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>We can now specify the content that we want to render on the web page.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token comment">// app/js/components/App/App.jsx</span>\n\n<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Rendered by React<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Finally we will specify that <code>App</code> is the default export for this JavaScript\nmodule.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token comment">// app/js/components/App/App.jsx</span>\n\n<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Rendered by React<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h3>Managing imports</h3>\n<p>When importing from JavaScript modules, the file <code>index.js</code> will automatically\nbe loaded if no filename is specified in the import in the file path.\ni.e.<code>import components/App;</code> is the same as <code>import components/App/index;</code></p>\n<p>For this reason we will always define an <code>index.js</code> file that is responsible for\nexporting the classes and functions defined within out component files.</p>\n<p>To do this we create an <code>index.js</code> file in our "App" directory and export the\ndefault component from there.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// app/js/components/App/index.js</span>\n\n<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./App\'</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h2>Render the app with React DOM</h2>\n<p>React DOM is responsible for selecting the DOM node that will contain the React\napplication and rendering the compile contents of our <code>&#x3C;App /></code> component into\nit. First of all add the package via yarn.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>yarn add react-dom\n</code></pre>\n      </div>\n<p>Finally, we will update our <code>application.js</code> file to import the <code>render</code> method\nfrom <code>react-dom</code>, import our <code>&#x3C;App /></code> component, select the <code>#app</code> div that we\nhave already added to our <code>index.html</code> file and glue it all together.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// app/js/application.js</span>\n\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> render <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">\'./components/App\'</span><span class="token punctuation">;</span>\n\n<span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'app\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Now, build the app by running <code>yarn dev</code> and open <code>index.html</code> in your browser\nand you will see "Rendered by React" in a paragraph tag on the page.</p>\n<p><div>\n          <a\n            class="gatsby-resp-image-link"\n            title="original image"\n            href="/static/rendered-by-react-67737bf71fbc941c3c02174432b93047-6e619.png"\n            style="display: block"\n            target="_blank"\n          >\n            <div\n              class="gatsby-resp-image-wrapper"\n              style="position: relative; z-index: -1; "\n            >\n              <div\n                class="gatsby-resp-image-background-image"\n                style="padding-bottom: 43.32784184514003%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAvklEQVQoz+XOXQqCUBAF4Lv/VbSDXlpBRIoRllAQ4TULTS0L8f4qeroVFFFEUG8NfAzMDMMhi14XVr+DuTvAcubBtYfwHAuuNcCG+lgHIagfYDyawrFcY3JlT18i2xVFHFJEmxBJkuCQ5+CcgTMGIcTNIT8iS3fG/i57lJo9OR9LIcHMA845tNao6vqqqm7Oc6U09BtKKZAs2yGOYpMuNT2ClBJN0zxp2/YjhJUMRVGgLMtLr02yb4rgx/WHD0+rWrmdVLc9tAAAAABJRU5ErkJggg==\'); background-size: cover;"\n              >\n                <img\n                  class="gatsby-resp-image-image"\n                  style="width: 100%; margin: 0; vertical-align: middle; position: absolute; box-shadow: inset 0px 0px 0px 400px white;"\n                  alt="Img: Example of first render with React"\n                  title=""\n                  src="/static/rendered-by-react-67737bf71fbc941c3c02174432b93047-ba9a0.png"\n                  srcset="/static/rendered-by-react-67737bf71fbc941c3c02174432b93047-125fe.png 163w,/static/rendered-by-react-67737bf71fbc941c3c02174432b93047-637de.png 325w,/static/rendered-by-react-67737bf71fbc941c3c02174432b93047-ba9a0.png 650w,/static/rendered-by-react-67737bf71fbc941c3c02174432b93047-31247.png 975w,/static/rendered-by-react-67737bf71fbc941c3c02174432b93047-6e619.png 1214w"\n                  sizes="(max-width: 650px) 100vw, 650px"\n                />\n              </div>\n            </div>\n          </a>\n          </div></p>\n<h2>Stateless Functional Components</h2>\n<p>Finally we can clean this up a little. Since React 14 <sup id="fnref-3"><a href="#fn-3" class="footnote-ref">3</a></sup> we no longer\nnecessarily need to import <code>Component</code> and use a class for a React component. If\nthe component does not need to use internal state or lifecycle methods you can\nsimply use a function that returns the JSX content. Let\'s refactor the <code>&#x3C;App /></code>\ncomponent to see an example.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token comment">// app/js/components/App/App.jsx</span>\n\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Rendered by React<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Run <code>yarn build</code> again and refresh <code>index.html</code> and you will see the content of\nthe browser are still the same.</p>\n<hr>\n<ul>\n<li><sup id="fn-1">[1]</sup>: <a href="https://reactjs.org/">https://reactjs.org/</a></li>\n<li><sup id="fn-2">[2]</sup>: <a href="https://facebook.github.io/jsx/">https://facebook.github.io/jsx/</a></li>\n<li><sup id="fn-3">[3]</sup>:\n<a href="https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc">https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc</a></li>\n</ul>',frontmatter:{title:"Starting with React",step:5}},allMarkdownRemark:{edges:[{node:{fields:{slug:"/tutorial/getting-started/"},frontmatter:{title:"Getting Started",step:null}}},{node:{fields:{slug:"/tutorial/links/"},frontmatter:{title:"Links",step:null}}},{node:{fields:{slug:"/tutorial/steps/1-setup-package/"},frontmatter:{title:"Generate the package.json",step:1}}},{node:{fields:{slug:"/tutorial/steps/10-pointer-details/"},frontmatter:{title:"Showing the Details of each Point",step:10}}},{node:{fields:{slug:"/tutorial/steps/11-favourite-places/"},frontmatter:{title:"Favourite Places",step:11}}},{node:{fields:{slug:"/tutorial/steps/12-favourites-list/"},frontmatter:{title:"Favourites List",step:12}}},{node:{fields:{slug:"/tutorial/steps/13-adding-redux/"},frontmatter:{title:"Starting with Redux",step:13}}},{node:{fields:{slug:"/tutorial/steps/14-managing-favourites-with-redux/"},frontmatter:{title:"Managing Favourites with Redux",step:14}}},{node:{fields:{slug:"/tutorial/steps/2-webpack/"},frontmatter:{title:"Setting up Webpack",step:2}}},{node:{fields:{slug:"/tutorial/steps/3-babel/"},frontmatter:{title:"Setting up Babel",step:3}}},{node:{fields:{slug:"/tutorial/steps/4-eslint-and-prettier/"},frontmatter:{title:"ESLint and Prettier",step:4}}},{node:{fields:{slug:"/tutorial/steps/5-starting-react/"},frontmatter:{title:"Starting with React",step:5}}},{node:{fields:{slug:"/tutorial/steps/6-adding-the-map/"},frontmatter:{title:"Adding the Map",step:6}}},{node:{fields:{slug:"/tutorial/steps/7-styling-with-postcss/"},frontmatter:{title:"CSS Modules and PostCSS",step:7}}},{node:{fields:{slug:"/tutorial/steps/8-webpack-dev-server/"},frontmatter:{title:"Webpack Dev Server",step:8}}},{node:{fields:{slug:"/tutorial/steps/9-adding-points-to-the-map/"},frontmatter:{title:"Adding Points to the Map",step:9}}},{node:{fields:{slug:"/tutorial/steps/15-removing-favourites-from-the-list/"},frontmatter:{title:"Removing Favourites from the List",step:15}}},{node:{fields:{slug:"/tutorial/steps/16-ids-for-points/"},frontmatter:{title:"Adding IDs to the Points Data",step:16}}},{node:{fields:{slug:"/tutorial/steps/17-testing-with-jest/"},frontmatter:{title:"Testing with Jest",step:17}}}]}},pathContext:{slug:"/tutorial/steps/5-starting-react/"}}}});
//# sourceMappingURL=path---tutorial-steps-5-starting-react-31a4d5e6cd5da01c752f.js.map