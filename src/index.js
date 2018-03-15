// redux-recycle higher order reducer
export default function recycleState (reducer, actions, initialState, config = {}) {
  const recycleActionType = (typeof config.recycleActionType === 'undefined') ? '@@redux-recycle/INIT' : config.recycleActionType
  let setInitialStateActionTypes = []
  let resetState
  let getInitialState

  if (typeof initialState === 'function') {
    getInitialState = initialState
  } else {
    resetState = initialState
    getInitialState = () => resetState
  }

  if (typeof config.setInitialStateActionTypes !== 'undefined' && Array.isArray(config.setInitialStateActionTypes)) {
    setInitialStateActionTypes = config.setInitialStateActionTypes
  }

  return (state, action) => {
    if (actions.indexOf(action.type) === -1) {
      const newState = reducer(state, action)

      if (setInitialStateActionTypes.indexOf(action.type) >= 0) {
        resetState = newState
      }

      return newState
    }

    if (recycleActionType) {
      return reducer(getInitialState(state, action), { type: recycleActionType })
    }

    return getInitialState(state, action)
  }
}
// /redux-recycle
