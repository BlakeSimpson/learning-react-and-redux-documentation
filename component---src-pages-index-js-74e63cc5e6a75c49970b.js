webpackJsonp([35783957827783],{89:function(e,t){"use strict";var r={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,mixins:!0,propTypes:!0,type:!0},n={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},o=Object.defineProperty,a=Object.getOwnPropertyNames,u=Object.getOwnPropertySymbols,l=Object.getOwnPropertyDescriptor,i=Object.getPrototypeOf,f=i&&i(Object);e.exports=function e(t,s,c){if("string"!=typeof s){if(f){var p=i(s);p&&p!==f&&e(t,p,c)}var d=a(s);u&&(d=d.concat(u(s)));for(var y=0;y<d.length;++y){var m=d[y];if(!(r[m]||n[m]||c&&c[m])){var g=l(s,m);try{o(t,m,g)}catch(e){}}}return t}return t}},65:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var l=r(4),i=n(l),f=r(86),s=n(f),c=function(e){var t=e.slug,r=e.step,n=e.title;return i.default.createElement("li",null,i.default.createElement(s.default,{to:t},r&&"Step "+r+": ",n))},p=function(e){function t(){return o(this,t),a(this,e.apply(this,arguments))}return u(t,e),t.prototype.renderDynamicPages=function(){return this.props.edges.sort(function(e,t){return e.node.frontmatter.step>t.node.frontmatter.step?1:-1}).map(function(e){var t=e.node;if(t.frontmatter.step)return i.default.createElement(c,{key:t.frontmatter.step,slug:t.fields.slug,step:t.frontmatter.step,title:t.frontmatter.title})}).filter(function(e){return"undefined"!=typeof e})},t.prototype.render=function(){return i.default.createElement("aside",{id:"toc"},i.default.createElement("ul",null,i.default.createElement(c,{slug:"/tutorial/getting-started",title:"Getting Started"}),this.renderDynamicPages(),i.default.createElement(c,{slug:"/tutorial/links",title:"Links"})))},t}(l.Component);t.default=p,e.exports=t.default},182:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.query=void 0;var o=r(4),a=n(o),u=r(65),l=n(u),i=function(e){var t=e.data;return a.default.createElement("div",null,a.default.createElement("h1",null,"Table of Contents"),a.default.createElement(l.default,{edges:t.allMarkdownRemark.edges}))};t.query="** extracted graphql fragment **";t.default=i}});
//# sourceMappingURL=component---src-pages-index-js-74e63cc5e6a75c49970b.js.map