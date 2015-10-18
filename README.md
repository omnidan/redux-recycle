# redux-recycle

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
```


## Ignoring actions

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


## What is this magic? How does it work?

Have a read of the [Implementing Undo History recipe](https://rackt.github.io/redux/docs/recipes/ImplementingUndoHistory.html)
in the Redux documents, which explains in detail how higher-order reducers work.


## License

MIT, see `LICENSE.md` for more information.
