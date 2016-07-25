import { expect } from 'chai'
import recycleState from '../src'

describe('recycleState', () => {
  let reducer = function (state = 'INITIAL_STATE', action) {
    if (['KNOWN_ACTION', '@@redux-recycle/INIT'].indexOf(action.type) > -1) {
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
})
