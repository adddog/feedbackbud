import * as ACTIONS from "actions/actionTypes"
import { logBlock } from "common/log"
import { Map } from "immutable"

const initialState = new Map()
  .set("autoloadXMP", true)
  .set("pollTree", false)

export default function settings(state = initialState, action) {
  switch (action.type) {
    default: {
      return state
    }
  }
}
