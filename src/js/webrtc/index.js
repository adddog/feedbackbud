import io from "socket.io-client"
import Emitter from "common/emitter"
import { SERVER_URL, IS_DEV,IS_PROD } from "common/constants"
import Socket from "server/socket"
import SimpleWebRTC from "simplewebrtc"


export default class WebRTC {
  constructor(props) {

    if(IS_DEV){
      Socket.socket = io(SERVER_URL)
    }
    Socket.emitter = Emitter

    const { settings, roomId } = props

    const videoSettings = {
      width: { max: settings.width },
      height: { max: settings.height },
      frameRate: { max: settings.fps },
    }

    this.webrtc = new SimpleWebRTC(
      {
        url: settings.serverUrl,
        nick: {
          uuid: settings.uuid,
        },
        autoRemoveVideos: true,
        autoRequestMedia: true,
        localVideoEl: "localVideo",
        remoteVideosEl: "remoteVideos",
        media: {
          video: settings.noVideo ? false : { ...videoSettings },
          audio: !settings.noAudio,
        },
        receiveMedia: settings.receiveMedia,
      },
      { mirror: false }
    )

    this.webrtc.on("connectionReady", function(evt) {
      if (IS_PROD) {
        Socket.socket = webrtc.connection.connection
      }
    })

    this.webrtc.on("disconnect", function(evt) {})

    this.webrtc.on("readyToCall", function() {})

    this.webrtc.on("createdPeer", peer => {})

    this.webrtc.on("leftRoom", roomId => {
      console.log(roomId)
    })

    this.webrtc.on("peerRemoved", peer => {})

    this.webrtc.on("videoRemoved", (videoEl, peer) => {})

    this.webrtc.on("videoAdded", function(video, peer) {
      console.log(video)
    })

    Socket.createRoom({roomId})

    this.webrtc.joinRoom(roomId)
  }
}
