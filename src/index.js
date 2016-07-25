// redux-recycle higher order reducer
export default function recycleState (reducer, actions = [], initialState) {
  const getInitialState = (typeof initialState === 'function') ? initialState : () => initialState

  return (state, action) => {
    if (actions.indexOf(action.type) >= 0) {
      return reducer(getInitialState(state, action), { type: '@@redux-recycle/INIT' })
    }
    return reducer(state, action)
  }
}
// /redux-recycle
