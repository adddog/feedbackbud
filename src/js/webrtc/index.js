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
          video: store.useWebcam
            ? Detector.isDesktop
              ? noCamera ? false : { ...videoSettings }
              : noCamera
                ? false
                : {
                    ...videoSettings,
                    facingMode: "environment",
                  }
            : false,
          audio: store.useWebcam ? !Detector.isDesktop : false,
        },
        receiveMedia: {
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        },
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      },
      { mirror: false }
    )

    this.webrtc.on("disconnect", function(evt) {})

    this.webrtc.on("connectionReady", function(evt) {})

    this.webrtc.on("readyToCall", function() {})
  }
}
