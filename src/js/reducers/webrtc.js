import * as ACTIONS from "actions/actionTypes"
import CONFIG from "common/config"
import { SERVER_URL } from "common/constants"
import { Map } from "immutable"

const initialState = new Map()
  .set("settings", {
    serverUrl: SERVER_URL,
    localVideoEl:'localVideo',
    remoteVideosEl:'remoteVideo',
    width: CONFIG.width,
    height: CONFIG.height,
    frameRate: CONFIG.fps,
    noVideo: false,
    noAudio: true,
    autoRemoveVideos: true,
    autoRequestMedia: true,
    receiveMedia: {
      offerToReceiveAudio: false,
      offerToReceiveVideo: true,
    },
  })
  .set("room", {
    id: "sam",
  })

export default function webrtc(state = initialState, action) {
  switch (action.type) {
    default: {
      return state
    }
  }
}
