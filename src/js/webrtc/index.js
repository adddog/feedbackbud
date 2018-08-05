import SimpleWebRTC from 'simplewebrtc'
import { AppEmitter as Emitter } from 'common/emitters'
import { M_INPUT_NEW } from 'common/events'
import { SERVER_URL, MEDIA_TYPES, IS_DEV, IS_PROD } from 'common/constants'
import { connect, disconnect } from 'webrtc/model'
import Server from 'server'
import Desktop from 'webrtc/desktop'
import Mobile from 'webrtc/mobile'

export default class WebRTC {
  constructor(props) {
    this.props = props
    Emitter.on(M_INPUT_NEW, obj => {
      const { type, files } = obj
      if (type === MEDIA_TYPES.webcam && !this.webrtc) {
        this.initWebRTC()
      }
    })
  }

  initWebRTC() {
    const { settings, roomId } = this.props
    const videoSettings = {
      width: { max: settings.width },
      height: { max: settings.height },
      frameRate: { max: settings.fps },
    }

    console.log(settings)

    this.webrtc = new SimpleWebRTC(
      {
        // url: settings.url,
        nick: {
          uuid: settings.uuid,
        },
        ...settings,
        media: {
          video: settings.noVideo ? false : { ...videoSettings },
          audio: !settings.noAudio,
        },
      },
      { mirror: false },
    )

    this.webrtc.on('connectionReady', evt => {
      if (IS_PROD) {
        Socket.socket = webrtc.connection.connection
      }
    })

    //this.webrtc.on("disconnect", evt => {})

    this.webrtc.on('readyToCall', () => {
      Server.socket.room.createRoom({ roomId })
      this.webrtc.joinRoom(roomId)
      this.start()
    })

    /*
    this.webrtc.on("createdPeer", peer => {})

    this.webrtc.on("handlePeerStreamAdded", peer => {})

    this.webrtc.on("leftRoom", roomId => {
      console.log(roomId)
    })

    this.webrtc.on("peerRemoved", peer => {})

    this.webrtc.on("videoRemoved", (videoEl, peer) => {})

    this.webrtc.on("localScreenAdded", el => {
      console.log(el)
    })
    this.webrtc.on("videoAdded", (video, peer) => {})*/
  }

  start() {
    this.app = Detector.isMobile
      ? new Mobile(this.webrtc, this.props, Emitter)
      : new Desktop(this.webrtc, this.props, Emitter)
    // connect()
  }
}
