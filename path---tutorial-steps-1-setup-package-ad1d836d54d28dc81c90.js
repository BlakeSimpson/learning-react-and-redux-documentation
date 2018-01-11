webpackJsonp([0xc2af3db1843d],{315:function(t,n){t.exports={data:{markdownRemark:{html:'<p>The first step will be for us to generate a <code>package.json</code> file with some basic\ninformation about the project. The <code>package.json</code> file holds all project\ninformation, such as the project version, author, license etc. which we will\ngenerate now.</p>\n<p>This file also holds information on production and development dependencies\n(other node modules) as well as configuration information.</p>\n<h2>Generating the package</h2>\n<p>Yarn has a wizard to generate the initial package for you, you can start this by\nrunning:</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>yarn init\n</code></pre>\n      </div>\n<p>Run this command and enter information into the prompts given, it will look\nsomething like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>yarn init v1.3.2\nquestion name <span class="token punctuation">(</span>learning-react-typescript<span class="token punctuation">)</span>: a-map-of-thrones\nquestion version <span class="token punctuation">(</span>1.0.0<span class="token punctuation">)</span>:\nquestion description: A React Tutorial of Ice and Fire\nquestion entry point <span class="token punctuation">(</span>index.js<span class="token punctuation">)</span>:\nquestion repository url <span class="token punctuation">(</span>git@bitbucket.org:blake/learning-react-typescript.git<span class="token punctuation">)</span>:\nquestion author <span class="token punctuation">(</span>Blake Simpson <span class="token operator">&lt;</span>blake.simpson@kartenmacherei.de<span class="token operator">></span><span class="token punctuation">)</span>:\nquestion license <span class="token punctuation">(</span>MIT<span class="token punctuation">)</span>:\nquestion private:\nsuccess Saved package.json\n✨  Done <span class="token keyword">in</span> 55.16s.\n</code></pre>\n      </div>\n<p>If you now look at the files of the generated <code>package.json</code> file it will look\nlike:</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"a-map-of-thrones"</span><span class="token punctuation">,</span>\n  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>\n  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"A React Tutorial of Fire and Ice"</span><span class="token punctuation">,</span>\n  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"index.js"</span><span class="token punctuation">,</span>\n  <span class="token property">"repository"</span><span class="token operator">:</span>\n    <span class="token string">"git@personal.bitbucket.org:blake/learning-react-typescript.git"</span><span class="token punctuation">,</span>\n  <span class="token property">"author"</span><span class="token operator">:</span> <span class="token string">"Blake Simpson &lt;blake.simpson@kartenmacherei.de>"</span><span class="token punctuation">,</span>\n  <span class="token property">"license"</span><span class="token operator">:</span> <span class="token string">"MIT"</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>That is all we need to do for this step, in the next we will add Webpack and\nconfigure it to build a bundled JavaScript for us.</p>',frontmatter:{title:"Generate the package.json",step:1}},allMarkdownRemark:{edges:[{node:{fields:{slug:"/tutorial/getting-started/"},frontmatter:{title:"Getting Started",step:null}}},{node:{fields:{slug:"/tutorial/links/"},frontmatter:{title:"Links",step:null}}},{node:{fields:{slug:"/tutorial/steps/1-setup-package/"},frontmatter:{title:"Generate the package.json",step:1}}},{node:{fields:{slug:"/tutorial/steps/10-pointer-details/"},frontmatter:{title:"Showing the Details of each Point",step:10}}},{node:{fields:{slug:"/tutorial/steps/11-favourite-places/"},frontmatter:{title:"Favourite Places",step:11}}},{node:{fields:{slug:"/tutorial/steps/12-favourites-list/"},frontmatter:{title:"Favourites List",step:12}}},{node:{fields:{slug:"/tutorial/steps/13-adding-redux/"},frontmatter:{title:"Starting with Redux",step:13}}},{node:{fields:{slug:"/tutorial/steps/14-managing-favourites-with-redux/"},frontmatter:{title:"Managing Favourites with Redux",step:14}}},{node:{fields:{slug:"/tutorial/steps/2-webpack/"},frontmatter:{title:"Setting up Webpack",step:2}}},{node:{fields:{slug:"/tutorial/steps/3-babel/"},frontmatter:{title:"Setting up Babel",step:3}}},{node:{fields:{slug:"/tutorial/steps/4-eslint-and-prettier/"},frontmatter:{title:"ESLint and Prettier",step:4}}},{node:{fields:{slug:"/tutorial/steps/5-starting-react/"},frontmatter:{title:"Starting with React",step:5}}},{node:{fields:{slug:"/tutorial/steps/6-adding-the-map/"},frontmatter:{title:"Adding the Map",step:6}}},{node:{fields:{slug:"/tutorial/steps/7-styling-with-postcss/"},frontmatter:{title:"CSS Modules and PostCSS",step:7}}},{node:{fields:{slug:"/tutorial/steps/8-webpack-dev-server/"},frontmatter:{title:"Webpack Dev Server",step:8}}},{node:{fields:{slug:"/tutorial/steps/9-adding-points-to-the-map/"},frontmatter:{title:"Adding Points to the Map",step:9}}},{node:{fields:{slug:"/tutorial/steps/15-removing-favourites-from-the-list/"},frontmatter:{title:"Removing Favourites from the List",step:15}}},{node:{fields:{slug:"/tutorial/steps/16-ids-for-points/"},frontmatter:{title:"Adding IDs to the Points Data",step:16}}},{node:{fields:{slug:"/tutorial/steps/17-testing-with-jest/"},frontmatter:{title:"Testing with Jest",step:17}}}]}},pathContext:{slug:"/tutorial/steps/1-setup-package/"}}}});
//# sourceMappingURL=path---tutorial-steps-1-setup-package-ad1d836d54d28dc81c90.js.map