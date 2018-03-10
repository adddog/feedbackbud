import QS from "query-string"
import SimpleWebRTC from "simplewebrtc"

export default class WebRTC {
  constructor(props) {
    const videoSettings = {
      width: { max: props.width },
      height: { max: props.height },
      frameRate: { max: props.fps },
    }

    this.webrtc = new SimpleWebRTC(
      {
        url: props.serverUrl,
        nick: {
          desktop: Detector.isDesktop,
          uuid: props.uuid,
        },
        autoRemoveVideos: true,
        autoRequestMedia: true,
        localVideoEl: "localVideo",
        remoteVideosEl: "remoteVideos",
        media: {
          video: props.noVideo ? false : { ...videoSettings },
          audio: !props.noAudio,
        },
        receiveMedia: props.receiveMedia,
      },
      { mirror: false }
    )

    this.webrtc.on("disconnect", function(evt) {})

    this.webrtc.on("connectionReady", function(evt) {})

    this.webrtc.on("readyToCall", function() {})
  }
}
