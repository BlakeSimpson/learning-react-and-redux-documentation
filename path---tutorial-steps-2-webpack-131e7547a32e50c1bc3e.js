webpackJsonp([86486738803091],{320:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Now that we have yarn setup, we can add <a href="https://webpack.github.io/">Webpack</a> to\nour dependencies and configure it to bundle all of our JavaScript files\ntogether.</p>\n<p>We start by installing Webpack via yarn:</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>yarn add webpack\n</code></pre>\n      </div>\n<p>Now that Webpack is installed as a node module, we can begin to configure it to\nbundle all JavaScript files that we will place in the <code>app/js/</code> directory and\nbuild them to a directory called <code>dist/</code>. So let\'s go ahead and create a test\nfile in our <code>app/js/</code> directory.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// app/js/application.js</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`it\'s working!`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h2>Webpack Configuration</h2>\n<p>Next we will setup our webpack configuration. We start by creating a file called\n<code>webpack.config.js</code> in the root directory of our project. This file is written\nin JavaScript and will specify the input files and output directory/filename for\nour application files.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// webpack.config.js</span>\n\n<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> BUILD_DIR <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">\'dist\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> APP_DIR <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">\'app\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> JS_DIR <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>APP_DIR<span class="token punctuation">,</span> <span class="token string">\'js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token punctuation">:</span> JS_DIR <span class="token operator">+</span> <span class="token string">\'/application.js\'</span><span class="token punctuation">,</span>\n  output<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    path<span class="token punctuation">:</span> BUILD_DIR<span class="token punctuation">,</span>\n    filename<span class="token punctuation">:</span> <span class="token string">\'bundle.js\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> config<span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>This configuration is setting up the paths where we want to build to (<code>dist/</code>),\nwhere to find our source files <code>app/js/</code> and our final filename <code>bundle.js</code>.</p>\n<p>Next we will test our configuration is working by running the Webpack build.</p>\n<h2>Running Webpack</h2>\n<p>We will now add our first 2 "scripts" to the <code>package.json</code> that will allow us\nto run the Webpack build via yarn. Since Webpack is not installed globally,\nrunning it via yarn allows us to skip settings the path to the webpack\nexecutable every time we call Webpack. i.e. we can simply run <code>yarn build</code>\ninstead of <code>./node_modules/.bin/webpack -p</code>.</p>\n<p>Let\'s set this up by adding the the <code>"scripts"</code> key to our <code>package.json</code> with\nthe following value:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code>  <span class="token operator">...</span>\n\n  <span class="token string">"scripts"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">"dev"</span><span class="token punctuation">:</span> <span class="token string">"webpack -d"</span><span class="token punctuation">,</span>\n    <span class="token string">"build"</span><span class="token punctuation">:</span> <span class="token string">"webpack -p"</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n  <span class="token operator">...</span>\n</code></pre>\n      </div>\n<h2>Testing it out</h2>\n<p>Now that Webpack is ready to run, let\'s test our configuration by running</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>yarn dev\n</code></pre>\n      </div>\n<p>If everything has gone to plan, you should see the following output from your\nterminal:</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ yarn dev\n\nyarn run v1.3.2\n$ webpack -d\nHash: c344ba9d2d49de2bffd7\nVersion: webpack 3.8.1\nTime: 59ms\n    Asset     Size  Chunks             Chunk Names\nbundle.js  3.18 kB       0  <span class="token punctuation">[</span>emitted<span class="token punctuation">]</span>  main\n   <span class="token punctuation">[</span>0<span class="token punctuation">]</span> ./app/js/application.js 30 bytes <span class="token punctuation">{</span>0<span class="token punctuation">}</span> <span class="token punctuation">[</span>built<span class="token punctuation">]</span>\n✨  Done <span class="token keyword">in</span> 0.69s.\n</code></pre>\n      </div>\n<p>Now have a look at the newly created <code>dist/</code> directory, you will see a\n<code>bundle.js</code> file inside.</p>\n<p>Let\'s add an <code>index.html</code> file that will serve as the entry point to our\napplication by including the bundled JavaScript.</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code>// index.html\n\n<span class="token doctype">&lt;!DOCTYPE html></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>A Map of Thrones<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>dist/bundle.js<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script language-javascript"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<p>Now open this file in your browser (<code>open index.html</code>) and open the developer\nconsole (<code>⌘ + ⌥ + I</code> in Chrome on OS X). In the console you should see the "it\'s\nworking" log from our <code>application.js</code> file.</p>\n<h2>Production build</h2>\n<p>We can now also test the production build by running</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>yarn build\n</code></pre>\n      </div>\n<p>Uh, oh. That didn\'t work. You will see the following output:</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ yarn build\n\nyarn run v1.3.2\n$ webpack -p\nHash: 3ac14d4cf932ecbadcb5\nVersion: webpack 3.8.1\nTime: 71ms\n    Asset    Size  Chunks             Chunk Names\nbundle.js  2.5 kB       0  <span class="token punctuation">[</span>emitted<span class="token punctuation">]</span>  main\n   <span class="token punctuation">[</span>0<span class="token punctuation">]</span> ./app/js/application.js 30 bytes <span class="token punctuation">{</span>0<span class="token punctuation">}</span> <span class="token punctuation">[</span>built<span class="token punctuation">]</span>\n\nERROR <span class="token keyword">in</span> bundle.js from UglifyJs\nUnexpected character <span class="token string">\'`\'</span> <span class="token punctuation">[</span>bundle.js:70,12<span class="token punctuation">]</span>\nerror Command failed with <span class="token keyword">exit</span> code 2.\ninfo Visit https://yarnpkg.com/en/docs/cli/run <span class="token keyword">for</span> documentation about this command.\n</code></pre>\n      </div>\n<p>This is because in our <code>applicaton.js</code>, for the console.log, we are using a\n<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">template literal</a>\nto build the string. Since this is an ES6 feature and Webpack only supports ES5\nand lower, the build will not work.</p>\n<p>In the next step we will learn how to add support for Babel, which can transform\nour ES6/7 code down to ES5.</p>',frontmatter:{title:"Setting up Webpack",step:2}},allMarkdownRemark:{edges:[{node:{fields:{slug:"/tutorial/getting-started/"},frontmatter:{title:"Getting Started",step:null}}},{node:{fields:{slug:"/tutorial/links/"},frontmatter:{title:"Links",step:null}}},{node:{fields:{slug:"/tutorial/steps/1-setup-package/"},frontmatter:{title:"Generate the package.json",step:1}}},{node:{fields:{slug:"/tutorial/steps/10-pointer-details/"},frontmatter:{title:"Showing the Details of each Point",step:10}}},{node:{fields:{slug:"/tutorial/steps/11-favourite-places/"},frontmatter:{title:"Favourite Places",step:11}}},{node:{fields:{slug:"/tutorial/steps/12-favourites-list/"},frontmatter:{title:"Favourites List",step:12}}},{node:{fields:{slug:"/tutorial/steps/13-adding-redux/"},frontmatter:{title:"Starting with Redux",step:13}}},{node:{fields:{slug:"/tutorial/steps/14-managing-favourites-with-redux/"},frontmatter:{title:"Managing Favourites with Redux",step:14}}},{node:{fields:{slug:"/tutorial/steps/2-webpack/"},frontmatter:{title:"Setting up Webpack",step:2}}},{node:{fields:{slug:"/tutorial/steps/3-babel/"},frontmatter:{title:"Setting up Babel",step:3}}},{node:{fields:{slug:"/tutorial/steps/4-eslint-and-prettier/"},frontmatter:{title:"ESLint and Prettier",step:4}}},{node:{fields:{slug:"/tutorial/steps/5-starting-react/"},frontmatter:{title:"Starting with React",step:5}}},{node:{fields:{slug:"/tutorial/steps/6-adding-the-map/"},frontmatter:{title:"Adding the Map",step:6}}},{node:{fields:{slug:"/tutorial/steps/7-styling-with-postcss/"},frontmatter:{title:"CSS Modules and PostCSS",step:7}}},{node:{fields:{slug:"/tutorial/steps/8-webpack-dev-server/"},frontmatter:{title:"Webpack Dev Server",step:8}}},{node:{fields:{slug:"/tutorial/steps/9-adding-points-to-the-map/"},frontmatter:{title:"Adding Points to the Map",step:9}}},{node:{fields:{slug:"/tutorial/steps/15-removing-favourites-from-the-list/"},frontmatter:{title:"Removing Favourites from the List",step:15}}}]}},pathContext:{slug:"/tutorial/steps/2-webpack/"}}}});
//# sourceMappingURL=path---tutorial-steps-2-webpack-131e7547a32e50c1bc3e.js.map