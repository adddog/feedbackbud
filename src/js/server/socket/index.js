import { SERVER_URL, IS_DESKTOP } from 'common/constants'
import io from 'socket.io-client'
import { isFunction } from 'lodash'
import { logGreen } from "common/log"
import { setUser, setUsersIds } from 'actions/socket'
import Users from './users'
import User from './user'
import Room from './room'

export default class Socket {
  constructor(store) {
    this._store = store
    this._socket = io(SERVER_URL)
    this.user = new User(this.socket, store)
    this.users = new Users(this.socket, store)
    this.room = new Room(this.socket, store)

    this._socket.on('connect', id => {
    })

    this._socket.on('handshake', id => {
      logGreen(`You are socket id: ${id.id}`)
      this.dispatch(setUser(id))
      this.users.getUsersIds()
    })
    this._socket.on('event', data => {})
    this._socket.on('disconnect', () => {})
  }

  get dispatch() {
    return this._store.dispatch
  }

  get socket() {
    return this._socket
  }

  get io() {
    return this._socket
  }
}
