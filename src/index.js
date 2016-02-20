// redux-recycle higher order reducer
export default function recycleState (reducer, actions = [], initialState) {
  return (state, action) => {
    if (actions.indexOf(action.type) >= 0) {
      return reducer(initialState, { type: '@@redux-recycle/INIT' })
    }
    return reducer(state, action)
  }
}
// /redux-recycle
