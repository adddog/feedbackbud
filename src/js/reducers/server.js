import * as ACTIONS from "actions/actionTypes"
import { logBlock, logGreen } from "common/log"
import { Map } from "immutable"

const initialState = new Map()
  .set("user", null)
  .set("userGeolocation", null)
  .set("pollPartnerResults", [])

const getUser = state => state.get("user") || {}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SOCKET_SET_ID: {
      logGreen(
        `reducers/server: ACTIONS.SOCKET_SET_ID ${action.payload}`
      )
      return state.set("user", {
        ...getUser(state),
        id: action.payload,
      })
    }
    case ACTIONS.GEO_SET_LOCATION: {
      return state.set("userGeolocation", action.payload)
    }
    case ACTIONS.USER_SET_PARTNERS: {
      return state.set("pollPartnerResults", action.payload)
    }
    default: {
      return state
    }
  }
}
