---
title: Generate the package.json
step: 1
---

The first step will be for us to generate a `package.json` file with some basic
information about the project. The `package.json` file holds all project
information, such as the project version, author, license etc. which we will
generate now.

This file also holds information on production and development dependencies
(other node modules) as well as configuration information.

## Generating the package

Yarn has a wizard to generate the initial package for you, you can start this by
running:

```bash
yarn init
```

Run this command and enter information into the prompts given, it will look
something like this:

```bash
yarn init v1.3.2
question name (a-map-of-thrones): a-map-of-thrones
question version (1.0.0):
question description: A React Tutorial of Ice and Fire
question entry point (index.js):
question repository url (git@github.com:BlakeSimpson/learning-react-and-redux-tutorial.git):
question author (Blake Simpson <blakersim@gmail.com>):
question license (MIT):
question private:
success Saved package.json
✨  Done in 55.16s.
```

If you now look at the files of the generated `package.json` file it will look
like:

```json
{
  "name": "a-map-of-thrones",
  "version": "1.0.0",
  "description": "A React Tutorial of Ice and Fire",
  "main": "index.js",
  "repository":
    "git@github.com:BlakeSimpson/learning-react-and-redux-tutorial.git",
  "author": "Blake Simpson <blakersim@gmail.com>",
  "license": "MIT"
}
```

That is all we need to do for this step, in the next we will add Webpack and
configure it to build a bundled JavaScript for us.
