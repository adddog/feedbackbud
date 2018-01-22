import * as ACTIONS from "actions/actionTypes"
import { Map } from "immutable"

const initialState = new Map()
  .set("autoloadXMP", true)
  .set("pollTree", true)

export default function settings(state = initialState, action) {
  switch (action.type) {
    default: {
      return state
    }
  }
}
