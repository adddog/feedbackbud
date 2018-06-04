import { SERVER_URL, IS_DESKTOP } from 'common/constants'
import io from 'socket.io-client'
import { isFunction } from 'lodash'
import { setUser, setUsersIds } from 'actions/socket'

export default class Base {
  constructor(socket, dispatch) {
    this._socket = socket
    this.dispatch = dispatch
    this._cbPool = {}
  }

  get socket(){
    return this._socket
  }

  emit(event, data, cb) {
    cb = isFunction(data) ? data : cb
    const _self = this
    if (cb) {
      this._cbPool[event] = function(response) {
        _self._socket.off(event, _self._cbPool[event])
        cb(response)
      }
      this._socket.on(event, this._cbPool[event])
    }
    this._socket.emit(event, data)
  }
}
