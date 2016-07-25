# redux-recycle

[![NPM version (>=1.0)](https://img.shields.io/npm/v/redux-recycle.svg?style=flat-square)](https://www.npmjs.com/package/redux-recycle) [![NPM Downloads](https://img.shields.io/npm/dm/redux-recycle.svg?style=flat-square)](https://www.npmjs.com/package/redux-recycle) [![Build Status](https://img.shields.io/travis/omnidan/redux-recycle/master.svg?style=flat-square)](https://travis-ci.org/omnidan/redux-recycle) [![Dependencies](https://img.shields.io/david/omnidan/redux-recycle.svg?style=flat-square)](https://david-dm.org/omnidan/redux-recycle) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/) [![https://paypal.me/DanielBugl/10](https://img.shields.io/badge/donate-paypal-yellow.svg?style=flat-square)](https://paypal.me/DanielBugl/10) [![https://gratipay.com/~omnidan/](https://img.shields.io/badge/donate-gratipay/bitcoin-yellow.svg?style=flat-square)](https://gratipay.com/~omnidan/)

_higher-order reducer to reset the redux state on certain actions_


## Installation

```
npm install --save redux-recycle
```


## API

```js
import recycleState from 'redux-recycle';
recycleState(reducer, [ARRAY_OF_ACTIONS])
recycleState(reducer, [ARRAY_OF_ACTIONS], initialState)
recycleState(reducer, [ARRAY_OF_ACTIONS], (state, action) => initialState)
```


## Resetting state

`redux-recycle` is a reducer enhancer (higher-order reducer), it provides the
`recycleState` function, which takes an existing reducer and an array of
actions that will reset the state. Optionally, you can also pass an initial
state to reset to. (defaults to calling your reducer with
`@@redux-recycle/INIT` and an `undefined` state, which will have the same effect
as the initial redux action)

Firstly, import `redux-recycle`:

```js
// Redux utility functions
import { combineReducers } from 'redux';
// redux-recycle higher-order reducer
import recycleState from 'redux-recycle';
```

Then, add `recycleState` to your reducer(s) like this:

```js
combineReducers({
  counter: recycleState(counter, [INCREMENT_COUNTER], 0)
})
```

Now, once you click the increment button, the state will be reset to `0`.

If you need more complex initialization logic, you can provide a `reducer function` as the last param. It will be called with the state and action to get the initial state.

```js

// here you don't allow resetting counting 10 times
const resetCounter = (state, action) => {
  return state > 10 ? state : 0
}

combineReducers({
  counter: recycleState(counter, [RESET_COUNTERS], resetCounter)
})
```

## What is this magic? How does it work?

Have a read of the [Implementing Undo History recipe](https://rackt.github.io/redux/docs/recipes/ImplementingUndoHistory.html)
in the Redux documents, which explains in detail how higher-order reducers work.


## License

MIT, see `LICENSE.md` for more information.
