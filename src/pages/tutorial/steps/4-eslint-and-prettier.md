---
title: ESLint and Prettier
step: 4
---

It is always good to have a linter available while developing. This tool will
look at your files and check that there are no syntax errors and also ensure
there is a consistent style of code across the project, such as always using
single quotes instead of double quotes.

## Configuring ESLint

Arguably the best linter for JavaScript is [ESLint](https://eslint.org/). We
will start by adding it as a dependency. We will also add a few dependencies,
similar to babel, that tell ESLint what kind of project we are working with. We
will be adding:

* `eslint` (the core package)
* `eslint-plugin-standard` (a plugin to provide
  [standard.js](https://standardjs.com/) rules)
* `eslint-config-standard` (the extendable ruleset from standard.js)
* `eslint-plugin-import` (because we use ES6 imports)
* `eslint-plugin-node` (handles `require` and other syntax found in node)
* `eslint-plugin-promise` (to handle Promises)
* `eslint-plugin-react` (to understand React concepts and JSX)
* `babel-eslint` (so that Babel transformed code can be linted)

We will now install these packages with Yarn as development dependencies.

```bash
yarn add --dev eslint eslint-plugin-standard eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-react babel-eslint
```

We can now configure ESLint in a file called `.eslintrc.js`. Create this file
and add the following contents:

```js
// .eslintrc.js

module.exports = {
  extends: ['standard', 'plugin:react/recommended'],
  plugins: ['react', 'import'],
  rules: {
    semi: ['error', 'always']
  }
};
```

This tells ESLint that we are using the "react" and "import" plugins. It also
extends the predefined rules from standard.js that we added from
`eslint-config-standard` and to use the recommended rules for React development.

Finally we specify a custom rule that we must always add a semi-colon to the end
of our JavaScript statements.

Now that ESLint is configured, we will add 2 new scripts to our `package.json`
that let us run eslint from yarn.

```json
// package.json

"scripts": {
  "dev": "webpack -d",
  "build": "webpack -p",
  "lint:all": "eslint app/js/**/*",
  "lint:fix": "eslint app/js/**/* --fix"
}
```

You can test it by running:

```bash
yarn lint:all
```

You can now test this by making an error on a JavaScript file. For example,
remove the semi-colon from the end of our `console.log` in the file
`app/js/application.js` and run the script again. You should see the output:

```bash
yarn run v1.3.2
$ eslint app/js/*

/Users/blake/code/sandbox/learning-react-typescript/app/js/application.js
  1:29  error  Missing semicolon  semi

✖ 1 problem (1 error, 0 warnings)
  1 error, 0 warnings potentially fixable with the `--fix` option.
```

You can now automatically fix that error with our second script

```
yarn lint:fix
```

Look again at `app/js/application.js` and you will see ESLint has added the
semi-colon back for us and saved the file.

## Prettier

In this tutorial, I have used the amazing
[Prettier](https://github.com/prettier/prettier) to auto format the JavaScript
files. This tools scans your code style and when the file is saved, it
automatically formats it. This way you never have to think about code styles
again. This is a scary thought for some developers but for the purpose of this
tutorial, I would recommend trying it out.

If you are using VS Code, you can simply install the
[VS Code prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
without installing prettier as a node module to your system.

For WebStorm there are
[official instructions](https://prettier.io/docs/en/webstorm.html) on how to
integrate prettier.

We will also want Prettier to understand our ESLint configuration, so you should
also install `prettier-eslint`:

```bash
yarn add --dev prettier-eslint
```

#### VS Code Prettier Integration

If you are using VS Code you can add the following config to your workspace
settings (`Code` > `Preferences` > `Settings` > `Workspace Settings`). These
settings enabled prettier to format on save and to respect our ESLint
configuration.

```json
{
  "editor.tabSize": 2,
  "files.insertFinalNewline": true,
  "editor.formatOnSave": true,
  "javascript.format.enable": false,
  "prettier.eslintIntegration": true,
  "prettier.singleQuote": true
}
```

## Next Steps

We are now at the point where we have all of the base infrastructure /
configuration to begin building a modern JavaScript application.

In Step 5 we will add React to the project, get to know the JSX syntax, and
render our first React components to the screen.
