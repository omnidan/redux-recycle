import { expect } from 'chai'
import recycleState from '../src'

describe('recycleState', () => {
  let reducer = function (state = 'INITIAL_STATE', action) {
    if (['KNOWN_ACTION', '@@redux-recycle/INIT', 'SPECIAL_RECYCLE_ACTION_NAME'].indexOf(action.type) > -1) {
      return {
        state,
        type: action.type
      }
    }
    return state
  }

  it('a recycle action', () => {
    let recycleableReducer = recycleState(reducer, ['RECYCLE'])
    expect(recycleableReducer('A', { type: 'RECYCLE' })).to.deep.equal({ state: 'INITIAL_STATE', type: '@@redux-recycle/INIT' })
  })

  it('custom initial state', () => {
    let recycleableReducer = recycleState(reducer, ['RECYCLE'], 'CUSTOM_INITIAL_STATE')
    expect(recycleableReducer('A', { type: 'RECYCLE' })).to.deep.equal({ state: 'CUSTOM_INITIAL_STATE', type: '@@redux-recycle/INIT' })
  })

  it('a non-recycle action', () => {
    let recycleableReducer = recycleState(reducer, ['RECYCLE'])
    expect(recycleableReducer('A', { type: 'KNOWN_ACTION' })).to.deep.equal({ state: 'A', type: 'KNOWN_ACTION' })
  })

  it('initial state reducer', () => {
    const resetReducer = (state, action) => {
      return {oldState: state}
    }

    let recycleableReducer = recycleState(reducer, ['RECYCLE'], resetReducer)
    expect(recycleableReducer('A', { type: 'RECYCLE' })).to.deep.equal({ state: {oldState: 'A'}, type: '@@redux-recycle/INIT' })
  })

  it('special recycle action name', () => {
    let recycleableReducer = recycleState(reducer, ['RECYCLE'], 'A', {recycleActionType: 'SPECIAL_RECYCLE_ACTION_NAME'})
    expect(recycleableReducer('A', { type: 'RECYCLE' })).to.deep.equal({ state: 'A', type: 'SPECIAL_RECYCLE_ACTION_NAME' })
  })

  it('special recycle action name and initial state reducer', () => {
    const resetReducer = (state, action) => {
      return {oldState: state}
    }

    let recycleableReducer = recycleState(reducer, ['RECYCLE'], resetReducer, {recycleActionType: 'SPECIAL_RECYCLE_ACTION_NAME'})
    expect(recycleableReducer('A', { type: 'RECYCLE' })).to.deep.equal({ state: {oldState: 'A'}, type: 'SPECIAL_RECYCLE_ACTION_NAME' })
  })

  it('no recycle action', () => {
    let recycleableReducer = recycleState(reducer, ['RECYCLE'], 'A', {recycleActionType: false})
    expect(recycleableReducer('A', { type: 'RECYCLE' })).to.deep.equal('A')
  })

  it('no recycle action and initial state reducer', () => {
    const resetReducer = (state, action) => {
      return {oldState: state}
    }

    let recycleableReducer = recycleState(reducer, ['RECYCLE'], resetReducer, {recycleActionType: false})
    expect(recycleableReducer('A', { type: 'RECYCLE' })).to.deep.equal({oldState: 'A'})
  })

  it('set new initial state', () => {
    const getNewStateReducer = (state, action) => action.type === 'LOAD' ? 'B' : reducer(state, action)
    const recycleableReducer = recycleState(getNewStateReducer, ['RECYCLE'], 'A', {setInitialStateActionTypes: ['LOAD']})

    recycleableReducer('A', { type: 'LOAD' }) // set new initial state
    expect(recycleableReducer('A', { type: 'RECYCLE' })).to.deep.equal({ state: 'B', type: '@@redux-recycle/INIT' })
  })
})
