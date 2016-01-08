// redux-recycle higher order reducer
export default function recycleState (reducer, actions = [], initialState) {
  return (state, action) => {
    if (actions.indexOf(action.type) >= 0) {
      if (initialState === undefined) {
        return reducer(undefined, { type: '@@redux-recycle/INIT' })
      }
      return initialState
    }
    return reducer(state, action)
  }
}
// /redux-recycle
