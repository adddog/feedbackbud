import * as ACTIONS from "actions/actionTypes"
import { SERVER_URL, IS_DESKTOP } from "common/constants"
import io from "socket.io-client"
import objectPool from "usfl/object-pool"
import {autobind} from "core-decorators"

class Socket {

  constructor() {
    this._cbPool = {}
    this._socket = io(SERVER_URL)

    this._socket.on("handshake", ({ id }) => {
      this._dispatch({ type: ACTIONS.SOCKET_SET_ID, payload: id })
      //this.emitter.emit("set:roomId", roomId)
    })

    this._socket.on("event", data => {
      console.log(data)
    })

    this._socket.on("disconnect", () => {})
  }

  set store(store) {
    this._store = store
  }

  set dispatch(dispatch) {
    this._dispatch = dispatch
  }

  get state(){
    return this._store.getState()
  }

  get socket() {
    return this._socket
  }

  getResponseAddress(address){
    return `${this.state.server.get('user').id}:${address}`
  }

  on(str, cb) {
    this._socket.on(str, cb)
  }

  @autobind
  emit(address, data) {
    return new Promise((yes, no) => {
      const responseAddress = this.getResponseAddress(address)
      const _self = this
      this._cbPool[responseAddress] = function(response) {
        _self._socket.off(responseAddress, _self._cbPool[responseAddress])
        yes(response)
      }
      this._socket.on(responseAddress, this._cbPool[responseAddress])
      this._socket.emit(address, data)
    })
  }

  createRoom({ roomId }) {
    if (!roomId) return
    this.emit("room:create", {
      id: this._socket.id,
      desktop: IS_DESKTOP,
      roomId: roomId,
    })
  }

  shareThumbnail(data) {
    this.emit("room:thumbnail", data)
  }
}

export default new Socket()
