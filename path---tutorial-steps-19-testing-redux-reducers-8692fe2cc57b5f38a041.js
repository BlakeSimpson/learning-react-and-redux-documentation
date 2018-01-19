webpackJsonp([0x9529c6c246bd],{334:function(e,n){e.exports={data:{markdownRemark:{html:'<p>We will be using a similar approach as the previous step to test our reducer. We\nwill first create a <code>__specs__</code> directory inside of the <code>app/js/reducers</code>\ndirectory.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code><span class="token function">mkdir</span> app/js/reducers/__specs__\n</code></pre>\n      </div>\n<p>We then create a file named <code>points.spec.js</code> inside of this that matches the\nname of our reducer file that we will be testing.</p>\n<p>In this file we will need to import the reducer we want to test along with the\nactions that the reducer reacts to. We will also define the <code>describe</code> block for\nour reducer.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// app/js/reducers/__specs__/points.spec.js</span>\n\n<span class="token keyword">import</span> reducer <span class="token keyword">from</span> <span class="token string">\'../points\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> addFavourite<span class="token punctuation">,</span> removeFavourite <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'../../actions\'</span><span class="token punctuation">;</span>\n\n<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">\'Points Reducer\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Next we will define mock (fake) data that our test will use as the <code>state</code>\nargument. This will be a very simple version of the <code>points</code> array.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/reducers/__specs__/points.spec.js\n\n  describe(\'Points Reducer\', () => {\n<span class="token inserted">+   let initialPoints = [</span>\n<span class="token inserted">+     {</span>\n<span class="token inserted">+       id: \'point-1\',</span>\n<span class="token inserted">+       favourite: false</span>\n<span class="token inserted">+     },</span>\n<span class="token inserted">+     {</span>\n<span class="token inserted">+       id: \'point-2\',</span>\n<span class="token inserted">+       favourite: true</span>\n<span class="token inserted">+     }</span>\n<span class="token inserted">+   ];</span>\n  });\n</code></pre>\n      </div>\n<p>We then define our first test which tests the <code>default</code> case of the reducer. We\npass the <code>initialPoints</code> mock to the reducer as the <code>state</code> argument and and\nempty object as the second <code>action</code> object. Since there is no action type the\nreducers falls through to the <code>default</code> case of the <code>switch</code> statement and\nsimply returns the state. This means we can simple expected the given\n<code>initialPoints</code> to be returned and nothing to have changed.</p>\n<p>At this point you can start the Jest watcher in the terminal by running</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>yarn test:watch\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/reducers/__specs__/points.spec.js\n\n  describe(\'Points Reducer\', () => {\n    let initialPoints = [\n      {\n        id: \'point-1\',\n        favourite: false\n      },\n      {\n        id: \'point-2\',\n        favourite: true\n      }\n    ];\n<span class="token inserted">+</span>\n<span class="token inserted">+   it(\'returns the initial state\', () => {</span>\n<span class="token inserted">+     expect(reducer(initialPoints, {})).toEqual(initialPoints);</span>\n<span class="token inserted">+   });</span>\n  });\n</code></pre>\n      </div>\n<p>We will now go ahead an define a new context for testing the Redux actions\npassed to the reducer. In this section we will start with a test that marks\n"point-1" as a favourite and our expectation will be that the <code>favourite: false</code>\nturns to <code>favourite: true</code> inside of the initialPoints mock.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/reducers/__specs__/points.spec.js\n\n  describe(\'Points Reducer\', () => {\n    let initialPoints = [\n      {\n        id: \'point-1\',\n        favourite: false\n      },\n      {\n        id: \'point-2\',\n        favourite: true\n      }\n    ];\n\n    it(\'returns the initial state\', () => {\n      expect(reducer(initialPoints, {})).toEqual(initialPoints);\n    });\n\n<span class="token inserted">+   describe(\'favourites handling\', () => {</span>\n<span class="token inserted">+     it(\'can update a point to be a favourite\', () => {</span>\n<span class="token inserted">+       const action = addFavourite(\'point-1\');</span>\n<span class="token inserted">+       const result = reducer(initialPoints, action);</span>\n<span class="token inserted">+       const expected = [</span>\n<span class="token inserted">+         {</span>\n<span class="token inserted">+           id: \'point-1\',</span>\n<span class="token inserted">+           favourite: true</span>\n<span class="token inserted">+         },</span>\n<span class="token inserted">+         {</span>\n<span class="token inserted">+           id: \'point-2\',</span>\n<span class="token inserted">+           favourite: true</span>\n<span class="token inserted">+         }</span>\n<span class="token inserted">+       ];</span>\n<span class="token inserted">+</span>\n<span class="token inserted">+       expect(result).toEqual(expected);</span>\n<span class="token inserted">+     });</span>\n<span class="token inserted">+   });</span>\n  });\n</code></pre>\n      </div>\n<p>We can now write our final test for the "remove" action of the reducer. It is\nsimilar to the "add" action except we will give the ID "point-2" to the action\nand expect both <code>favourite</code> properties inside of <code>initialPoints</code> to be <code>false</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/reducers/__specs__/points.spec.js\n\n  describe(\'favourites handling\', () => {\n    it(\'can update a point to be a favourite\', () => {\n      const action = addFavourite(\'point-1\');\n      const result = reducer(initialPoints, action);\n\n      let expected = [\n        {\n          id: \'point-1\',\n          favourite: true\n        },\n        {\n          id: \'point-2\',\n          favourite: true\n        }\n      ];\n\n      expect(result).toEqual(expected);\n    });\n<span class="token inserted">+</span>\n<span class="token inserted">+   it(\'can remove a point from being a favourite\', () => {</span>\n<span class="token inserted">+     const action = removeFavourite(\'point-2\');</span>\n<span class="token inserted">+     const result = reducer(initialPoints, action);</span>\n<span class="token inserted">+     const expected = [</span>\n<span class="token inserted">+       {</span>\n<span class="token inserted">+         id: \'point-1\',</span>\n<span class="token inserted">+         favourite: false</span>\n<span class="token inserted">+       },</span>\n<span class="token inserted">+       {</span>\n<span class="token inserted">+         id: \'point-2\',</span>\n<span class="token inserted">+         favourite: false</span>\n<span class="token inserted">+       }</span>\n<span class="token inserted">+     ];</span>\n<span class="token inserted">+</span>\n<span class="token inserted">+     expect(result).toEqual(expected);</span>\n<span class="token inserted">+   });</span>\n  });\n</code></pre>\n      </div>\n<p>Although this test is written correctly if you look at the terminal you will see\nthe test is failing.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>  ● Points Reducer › favourites handling › can remove a point from being a favourite\n\n    expect<span class="token punctuation">(</span>received<span class="token punctuation">)</span>.toEqual<span class="token punctuation">(</span>expected<span class="token punctuation">)</span>\n\n    Expected value to equal:\n      <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"favourite"</span><span class="token keyword">:</span> false, <span class="token string">"id"</span><span class="token keyword">:</span> <span class="token string">"point-1"</span><span class="token punctuation">}</span>, <span class="token punctuation">{</span><span class="token string">"favourite"</span><span class="token keyword">:</span> false, <span class="token string">"id"</span><span class="token keyword">:</span> <span class="token string">"point-2"</span><span class="token punctuation">}</span><span class="token punctuation">]</span>\n    Received:\n      <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"favourite"</span><span class="token keyword">:</span> true, <span class="token string">"id"</span><span class="token keyword">:</span> <span class="token string">"point-1"</span><span class="token punctuation">}</span>, <span class="token punctuation">{</span><span class="token string">"favourite"</span><span class="token keyword">:</span> false, <span class="token string">"id"</span><span class="token keyword">:</span> <span class="token string">"point-2"</span><span class="token punctuation">}</span><span class="token punctuation">]</span>\n\n    Difference:\n\n    - Expected\n    + Received\n\n    @@ -1,8 +1,8 @@\n      Array <span class="token punctuation">[</span>\n        Object <span class="token punctuation">{</span>\n    -     <span class="token string">"favourite"</span><span class="token keyword">:</span> false,\n    +     <span class="token string">"favourite"</span><span class="token keyword">:</span> true,\n          <span class="token string">"id"</span><span class="token keyword">:</span> <span class="token string">"point-1"</span>,\n</code></pre>\n      </div>\n<p>Although "point-2" has updated the <code>favourite</code> state to be <code>false</code>, "point-1" is\n<code>true</code> even though we specified it should be <code>false</code> by default in the\n<code>initialPoints</code> array at the top of the test.</p>\n<p>This is because the tests are run in order and as the previous "can update a\npoint to be a favourite" test run it mutated the <code>initialPoints</code> mock.</p>\n<p>We can fix this by adding a <code>beforeEach</code> function to our code that runs before\neach individual test and allows us to set up the test scenario. In this case we\nwill always reset the <code>initialPoints</code> variable to be the initial mock that we\ndefined, so that any changes that happen throughout the test do not affect\nsubsequent tests.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/reducers/__specs__/points.spec.js\n\n\ndescribe(\'Points Reducer\', () => {\n<span class="token deleted">- let initialPoints = [</span>\n<span class="token deleted">-   {</span>\n<span class="token deleted">-     id: \'point-1\',</span>\n<span class="token deleted">-     favourite: false</span>\n<span class="token deleted">-   },</span>\n<span class="token deleted">-   {</span>\n<span class="token deleted">-     id: \'point-2\',</span>\n<span class="token deleted">-     favourite: true</span>\n<span class="token deleted">-   }</span>\n<span class="token deleted">- ];</span>\n\n<span class="token inserted">+ let initialPoints;</span>\n<span class="token inserted">+</span>\n<span class="token inserted">+ beforeEach(() => {</span>\n<span class="token inserted">+   initialPoints = [</span>\n<span class="token inserted">+     {</span>\n<span class="token inserted">+       id: \'point-1\',</span>\n<span class="token inserted">+       favourite: false</span>\n<span class="token inserted">+     },</span>\n<span class="token inserted">+     {</span>\n<span class="token inserted">+       id: \'point-2\',</span>\n<span class="token inserted">+       favourite: true</span>\n<span class="token inserted">+     }</span>\n<span class="token inserted">+   ];</span>\n<span class="token inserted">+ });</span>\n\n  ...\n});\n</code></pre>\n      </div>\n<p>The <code>let</code> is defined outside of the <code>beforeEach</code> or the variable would only be\navailable inside of the scope of the <code>beforeEach</code> function, instead of being\navailable to everything defined inside the <code>describe</code>.</p>\n<p>Take a look at the terminal again and you will notice the Jest watcher has\nre-run the test suite and now all tests are passing.</p>\n<h2>Some Refactoring</h2>\n<p>Now that everything is working we can make a small refactoring to our spec. You\nmay notice that we repeat the mock data 3 times throughout the spec. In this\ncase it may be acceptable but if you image a spec with 10\'s or 100\'s of tests,\nthis could get out of hand, especially if you want to change the data structure\none day, you will have to refactor the code in many locations.</p>\n<p>Now we will define a helper function inside of the spec that will build the mock\ndata structure for us. We will call it <code>buildPointsMock</code>. This functions accepts\n2 arguments. The first is the boolean <code>true</code> or <code>false</code> state of the <code>favourite</code>\nproperty for "point-1". The second argument is the same for "point-2".</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/reducers/__specs__/points.spec.js\n\n  import reducer from \'../points\';\n  import { addFavourite, removeFavourite } from \'../../actions\';\n\n<span class="token inserted">+ const buildPointsMock = (firstFavouriteState, secondFavouriteState) => [</span>\n<span class="token inserted">+   { id: \'point-1\', favourite: firstFavouriteState },</span>\n<span class="token inserted">+   { id: \'point-2\', favourite: secondFavouriteState }</span>\n<span class="token inserted">+ ];</span>\n\n  ...\n</code></pre>\n      </div>\n<p>We can then call this function to build our data structure instead of having\nliteral mock objects and expectations.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code>// app/js/reducers/__specs__/points.spec.js\n\n  describe(\'Points Reducer\', () => {\n    let initialPoints;\n\n    beforeEach(() => {\n<span class="token deleted">-     initialPoints = [</span>\n<span class="token deleted">-       {</span>\n<span class="token deleted">-         id: \'point-1\',</span>\n<span class="token deleted">-         favourite: false</span>\n<span class="token deleted">-       },</span>\n<span class="token deleted">-       {</span>\n<span class="token deleted">-         id: \'point-2\',</span>\n<span class="token deleted">-         favourite: true</span>\n<span class="token deleted">-       }</span>\n<span class="token deleted">-     ];</span>\n<span class="token inserted">+     initialPoints = buildPointsMock(false, true);</span>\n    });\n\n    it(\'returns the initial state\', () => {\n      expect(reducer(initialPoints, {})).toEqual(initialPoints);\n    });\n\n    describe(\'favourites handling\', () => {\n      it(\'can update a point to be a favourite\', () => {\n        const action = addFavourite(\'point-1\');\n        const result = reducer(initialPoints, action);\n<span class="token deleted">-       const expected = [</span>\n<span class="token deleted">-         {</span>\n<span class="token deleted">-           id: \'point-1\',</span>\n<span class="token deleted">-           favourite: true</span>\n<span class="token deleted">-         },</span>\n<span class="token deleted">-         {</span>\n<span class="token deleted">-           id: \'point-2\',</span>\n<span class="token deleted">-           favourite: true</span>\n<span class="token deleted">-         }</span>\n<span class="token deleted">-       ];</span>\n<span class="token inserted">+       const expected = buildPointsMock(true, true);</span>\n\n        expect(result).toEqual(expected);\n      });\n\n      it(\'can remove a point from being a favourite\', () => {\n        const action = removeFavourite(\'point-2\');\n        const result = reducer(initialPoints, action);\n<span class="token deleted">-       const expected = [</span>\n<span class="token deleted">-         {</span>\n<span class="token deleted">-           id: \'point-1\',</span>\n<span class="token deleted">-           favourite: false</span>\n<span class="token deleted">-         },</span>\n<span class="token deleted">-         {</span>\n<span class="token deleted">-           id: \'point-2\',</span>\n<span class="token deleted">-           favourite: false</span>\n<span class="token deleted">-         }</span>\n<span class="token deleted">-       ];</span>\n<span class="token inserted">+       const expected = buildPointsMock(false, false);</span>\n\n        expect(result).toEqual(expected);\n      });\n    });\n  });\n</code></pre>\n      </div>\n<p>This small refactoring has removed many lines from the file length and also\nmeans that if we update our mock data structure we only have to do the update in\none place.</p>\n<p>Check once more in the terminal that the watcher has run again and you will see\nthat the tests are still passing.</p>\n<p>We can also run the Jest coverage task now to see what impact our action and\nreducer tests have had. Stop the watcher with <code>cmd + c</code> or <code>ctrl + c</code> and run.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>yarn test:coverage\n</code></pre>\n      </div>\n<p>An output similar to this will be shown:</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ jest --coverage\n PASS  app/js/reducers/__specs__/points.spec.js\n PASS  app/js/actions/__specs__/points.spec.js\n\nTest Suites: 2 passed, 2 total\nTests:       5 passed, 5 total\nSnapshots:   0 total\nTime:        1.769s\nRan all <span class="token function">test</span> suites.\n---------------<span class="token operator">|</span>----------<span class="token operator">|</span>----------<span class="token operator">|</span>----------<span class="token operator">|</span>----------<span class="token operator">|</span>----------------<span class="token operator">|</span>\nFile           <span class="token operator">|</span>  % Stmts <span class="token operator">|</span> % Branch <span class="token operator">|</span>  % Funcs <span class="token operator">|</span>  % Lines <span class="token operator">|</span>Uncovered Lines <span class="token operator">|</span>\n---------------<span class="token operator">|</span>----------<span class="token operator">|</span>----------<span class="token operator">|</span>----------<span class="token operator">|</span>----------<span class="token operator">|</span>----------------<span class="token operator">|</span>\nAll files      <span class="token operator">|</span>      100 <span class="token operator">|</span>       75 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>                <span class="token operator">|</span>\n js            <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>                <span class="token operator">|</span>\n  constants.js <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>                <span class="token operator">|</span>\n js/actions    <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>                <span class="token operator">|</span>\n  index.js     <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>                <span class="token operator">|</span>\n  points.js    <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>                <span class="token operator">|</span>\n js/reducers   <span class="token operator">|</span>      100 <span class="token operator">|</span>       75 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>                <span class="token operator">|</span>\n  points.js    <span class="token operator">|</span>      100 <span class="token operator">|</span>       75 <span class="token operator">|</span>      100 <span class="token operator">|</span>      100 <span class="token operator">|</span>             87 <span class="token operator">|</span>\n---------------<span class="token operator">|</span>----------<span class="token operator">|</span>----------<span class="token operator">|</span>----------<span class="token operator">|</span>----------<span class="token operator">|</span>----------------<span class="token operator">|</span>\n✨  Done <span class="token keyword">in</span> 2.60s.\n</code></pre>\n      </div>\n<p>You can see that we have very high code coverage across our actions and\nreducers. This means that if we change them it is highly likely that a test will\nfail and we know something has changed. It is them important to make sure the\ntests stay up to date as your application grows.</p>\n<p>You may notice that only the actions, constants, and reducer files are mentioned\nhere. This is because there are no tests regarding the components so Jest does\nnot even know they exist yet.</p>\n<p>The final step to our testing will be to test our components. We will start\nworking on this in our next step.</p>',frontmatter:{title:"Testing Redux Reducers",step:19}},allMarkdownRemark:{edges:[{node:{fields:{slug:"/tutorial/getting-started/"},frontmatter:{title:"Getting Started",step:null}}},{node:{fields:{slug:"/tutorial/steps/1-setup-package/"},frontmatter:{title:"Generate the package.json",step:1}}},{node:{fields:{slug:"/tutorial/links/"},frontmatter:{title:"Links",step:null}}},{node:{fields:{slug:"/tutorial/steps/10-pointer-details/"},frontmatter:{title:"Showing the Details of each Point",step:10}}},{node:{fields:{slug:"/tutorial/steps/11-favourite-places/"},frontmatter:{title:"Favourite Places",step:11}}},{node:{fields:{slug:"/tutorial/steps/12-favourites-list/"},frontmatter:{title:"Favourites List",step:12}}},{node:{fields:{slug:"/tutorial/steps/13-adding-redux/"},frontmatter:{title:"Starting with Redux",step:13}}},{node:{fields:{slug:"/tutorial/steps/14-managing-favourites-with-redux/"},frontmatter:{title:"Managing Favourites with Redux",step:14}}},{node:{fields:{slug:"/tutorial/steps/15-removing-favourites-from-the-list/"},frontmatter:{title:"Removing Favourites from the List",step:15}}},{node:{fields:{slug:"/tutorial/steps/16-ids-for-points/"},frontmatter:{title:"Adding IDs to the Points Data",step:16}}},{node:{fields:{slug:"/tutorial/steps/17-testing-with-jest/"},frontmatter:{title:"Testing with Jest",step:17}}},{node:{fields:{slug:"/tutorial/steps/18-testing-redux-actions/"},frontmatter:{title:"Testing Redux Actions",step:18}}},{node:{fields:{slug:"/tutorial/steps/19-testing-redux-reducers/"},frontmatter:{title:"Testing Redux Reducers",step:19}}},{node:{fields:{slug:"/tutorial/steps/2-webpack/"},frontmatter:{title:"Setting up Webpack",step:2}}},{node:{fields:{slug:"/tutorial/steps/20-jest-component-configuration/"},frontmatter:{title:"Preparing Component testing with Jest",step:20}}},{node:{fields:{slug:"/tutorial/steps/21-testing-the-map/"},frontmatter:{title:"Testing the Map",step:21}}},{node:{fields:{slug:"/tutorial/steps/22-testing-connected-components/"},frontmatter:{title:"Testing Connected Components",step:22}}},{node:{fields:{slug:"/tutorial/steps/23-test-the-app-component/"},frontmatter:{title:"Testing the App Component",step:23}}},{node:{fields:{slug:"/tutorial/steps/24-test-favourites-list/"},frontmatter:{title:"Testing the Favourites List",step:24}}},{node:{fields:{slug:"/tutorial/steps/25-test-the-pointer/"},frontmatter:{title:"Testing the Pointer",step:25}}},{node:{fields:{slug:"/tutorial/steps/3-babel/"},frontmatter:{title:"Setting up Babel",step:3}}},{node:{fields:{slug:"/tutorial/steps/4-eslint-and-prettier/"},frontmatter:{title:"ESLint and Prettier",step:4}}},{node:{fields:{slug:"/tutorial/steps/5-starting-react/"},frontmatter:{title:"Starting with React",step:5}}},{node:{fields:{slug:"/tutorial/steps/6-adding-the-map/"},frontmatter:{title:"Adding the Map",step:6}}},{node:{fields:{slug:"/tutorial/steps/8-webpack-dev-server/"},frontmatter:{title:"Webpack Dev Server",step:8}}},{node:{fields:{slug:"/tutorial/steps/7-styling-with-postcss/"},frontmatter:{title:"CSS Modules and PostCSS",step:7}}},{node:{fields:{slug:"/tutorial/steps/9-adding-points-to-the-map/"},frontmatter:{title:"Adding Points to the Map",step:9}}}]}},pathContext:{slug:"/tutorial/steps/19-testing-redux-reducers/"}}}});
//# sourceMappingURL=path---tutorial-steps-19-testing-redux-reducers-8692fe2cc57b5f38a041.js.map