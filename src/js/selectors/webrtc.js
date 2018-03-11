export const getRoomSlug = state => state.webrtc.get("room").id

export const getWebRTCProps = state => ({
  settings: state.webrtc.get("settings"),
  roomId: state.webrtc.get("roomId"),
})
