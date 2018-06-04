import { SERVER_URL, IS_DESKTOP } from 'common/constants'
import io from 'socket.io-client'
import { isFunction } from 'lodash'
import { setUser, setUsersIds } from 'actions/socket'
import User from './user'
import Room from './room'

export default class Socket{
  constructor(dispatch) {
    this._dispatch = dispatch
    this._socket = io(SERVER_URL)

    this.user = new User(this.socket, dispatch)
    this.room = new Room(this.socket, dispatch)

    this._socket.on('connect', id => {})
    this._socket.on('handshake', id => {
      this._dispatch(setUser(id))
      this.user.getUsersIds()
    })
    this._socket.on('event', data => {})
    this._socket.on('disconnect', () => {})
  }

  get socket() {
    return this._socket
  }

}
