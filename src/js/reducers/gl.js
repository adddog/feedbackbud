import * as ACTIONS from "actions/actionTypes";
import CONFIG from "common/config"
import { Map } from "immutable";

const initialState = new Map()
  .set("settings", {
    numChannels: 2,
    width: CONFIG.width,
    height: CONFIG.height
  })
  .set("videoInputs", {
    webcam: {},
    canvas: {},
    instagram: {},
    media: {},
  });

export default function webrtc(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
