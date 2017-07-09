// redux-recycle higher order reducer
export default function recycleState (reducer, actions, initialState, config = {}) {
  const getInitialState = (typeof initialState === 'function') ? initialState : () => initialState
  const recycleActionType = (typeof config.recycleActionType === 'undefined') ? '@@redux-recycle/INIT' : config.recycleActionType

  return (state, action) => {
    if (actions.indexOf(action.type) === -1) {
      return reducer(state, action)
    }

    if (recycleActionType) {
      return reducer(getInitialState(state, action), { type: recycleActionType })
    }

    return getInitialState(state, action)
  }
}
// /redux-recycle
