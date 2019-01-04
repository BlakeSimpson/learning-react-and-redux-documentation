---
title: Getting Started
---

## What will we learn?

* Yarn
* ES6
* Webpack
* PostCSS (and CSS modules)
* React
* Redux

## What do I need to know?

**JavaScript**

In this tutorial it is assumed that you have worked with JavaScript before as
well as NPM (Node Package Manager). There is however no assumption that you have
worked with Yarn, React, or Redux.

**ES6 Basics**

We will be using many ES6 JavaScript features in this tutorial. Although they
will be explained along the way, it will help to have some understanding of what
these features are, going in. If you have never worked with ES6 before take a
look at [http://es6-features.org/](http://es6-features.org/) in order to see
some examples of the new features and how you can use them instead of common ES5
patterns.

**CSS**

This tutorial will contain a little CSS, or rather PostCSS. For this reason a
basic understanding of CSS styling will be assumed, although you should still be
able to follow along even without much experience.

## What are we building?

Since it seems everyone loves _A Game of Thrones_, we will be building "A Map of
Thrones". This project is an interactive map of _Westeros_ with pointers on the
map that we can click to view additional information. We can even add places to
our favourites list.

The application is fairly simple to build but it has enough complexity to it
that we need various Webpack loaders, we will have a few different React
components, and also have a simple use case to try out Redux.

<!-- Finally we will take the completed app and convert it to TypeScript, in order to
get a feel for the TypeScript syntax and start to understand why adding typing
can help improve your codebase. -->

## What do I need to get started?

You will need to install node.js, Yarn, and have an editor ready, such as Visual
Studio Code, WebStorm, etc.

**node.js (v8.9.1+)**

* `brew install node`
* https://nodejs.org/en/download/

**Yarn(v1.3.2+)**

* `brew install yarn`
* https://yarnpkg.com/en/

**VS Code**

* https://code.visualstudio.com/

## Clone the Repository

When you are ready to begin clone the following repository:

    git clone git@github.com:blake-simpson/learning-react-and-redux-tutorial.git

Every step of the tutorial has an associated git tag, so to have the starting
point for step 9, you could simply checkout the git tag `step-9`. In that sense,
if you want to see the completed code for step 9, checkout the next tag
`step-10`.

To follow along with the tutorial, checkout `step-1` from the git history:

    git checkout step-1

## Working on your own branch

You will probably want to work on your own branch, instead of the master of this
tutorial, so that you can build your own version of the app. I would suggest
creating a branch from tag `step-1` and continuing from there, i.e.:

    git checkout step-1
    git checkout -b your-name

If you ever find that your code is not working, or your code looks a lot
different from the tutorial, sync your local branch to a tutorial step to
restore the original tutorial onto your branch, for example to reset to `step-4`
(all local changes are lost):

    git clean -f
    git reset --hard step-4

If you have everything set up, you can move on to Step 1 of the tutorial.
