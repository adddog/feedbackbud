import * as ACTIONS from "actions/actionTypes"
import { Map } from "immutable"

const initialState = new Map().set("settings", {
  width: 640,
  height: 480,
  frameRate: 480,
  noVideo: false,
  noAudio: false,
  receiveMedia: {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  },
})
.set("room", {
  id: "sam"
})

export default function webrtc(state = initialState, action) {
  switch (action.type) {
    default: {
      return state
    }
  }
}
