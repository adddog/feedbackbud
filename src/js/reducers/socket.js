import * as ACTIONS from 'actions/actionTypes'
import { Map, List, fromJS, setIn } from 'immutable'

const initialState = fromJS({
  user: {
    id: null,
    partner: {
      id: null,
      status: null,
    },
  },
  userIds: [],
})
export default function socket(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SOCKET_SET_USER: {
      return setIn(state, ['user', 'id'], action.payload.id)
      return state.set('user', state.get('user').set('id', action.payload.id))
    }
    case ACTIONS.SOCKET_SET_USERS_IDS: {
      return state.set('userIds', new List(action.payload))
    }
    case ACTIONS.SOCKET_REQ_PARTNER: {
      const { id, status } = action.payload
      console.log(action.payload);
      return setIn(
        state,
        ['user', 'partner'],
        state.getIn(['user', 'partner']).merge(new Map(action.payload)),
      )
      return state
        .get('user')
        .get('partner')
        .merge(new Map(action.payload))
    }
    default: {
      return state
    }
  }
}
