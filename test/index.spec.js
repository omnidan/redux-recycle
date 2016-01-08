let { expect } = require('chai')
let recycleState = require('../src')

describe('recycleState', () => {
  let reducer = function (state = 'INITIAL_STATE', action) {
    if (['KNOWN_ACTION', '@@redux-recycle/INIT'].includes(action.type)) {
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
    expect(recycleableReducer('A', { type: 'RECYCLE' })).to.deep.equal('CUSTOM_INITIAL_STATE')
  })

  it('a non-recycle action', () => {
    let recycleableReducer = recycleState(reducer, ['RECYCLE'])
    expect(recycleableReducer('A', { type: 'KNOWN_ACTION' })).to.deep.equal({ state: 'A', type: 'KNOWN_ACTION' })
  })
})
