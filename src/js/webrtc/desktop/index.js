import {
  logInfo,
} from "common/constants"
const Desktop = (webrtc, state, emitter) => {

  const peers = new Set()
  const peerIds = new Map()

  const videoEl = document.getElementById(state.elementIds.localVideo)
  videoEl.setAttribute("autoplay", true)
  videoEl.setAttribute("muted", true)
  if (state.useWebcam) {
    logInfo(`local video waiting..`)
    videoEl.addEventListener("loadeddata", () => {
      logInfo(`local video ready`)
    })
  }
  const remoteVideoDiv = document.getElementById(state.elementIds.remoteVideo)
  //videoEl.style.display = "none"
  remoteVideoDiv.style.display = "none"

  const canvasEl = document.getElementById(state.elementIds.outputCanvas)
  canvasEl.width = state.width
  canvasEl.height = state.height

  const canvasKey = document.createElement("canvas")

  webrtc.on("createdPeer", peer => {
    console.log(`Found peer! ${peer.id}`)
  })

  webrtc.on("leftRoom", roomId => {
  })

  webrtc.on("peerRemoved", peer => {
  })

  webrtc.on("videoRemoved", (videoEl, peer) => {
  })

  webrtc.on("videoAdded", function(video, peer) {
    video.setAttribute("crossorigin", "anonymous")
    video.style.display = "none"
  })


  return {
  }
}

export default Desktop
