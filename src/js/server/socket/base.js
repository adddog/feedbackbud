import { autobind } from 'core-decorators'
import { SERVER_URL, IS_DESKTOP } from 'common/constants'
import io from 'socket.io-client'
import { isFunction } from 'lodash'
import { setUser, setUsersIds } from 'actions/socket'

export default class Base {
  constructor(socket, store) {
    this._socket = socket
    this._store = store
    this._cbPool = {}

    this._store.subscribe(this.onStoreChanged)
  }

  get id() {
    return this._socket.id
  }

  get store() {
    return this._store
  }

  get dispatch() {
    return this._store.dispatch
  }

  get socket() {
    return this._socket
  }

  @autobind
  onStoreChanged(action) {}

  emitWithId(event, data, cb, cbEvent) {
    this.emit(
      event,
      data,
      cb,
      cbEvent ? `${this.id}:${cbEvent}` : `${this.id}:${event}`,
    )
  }

  emit(event, data, cb, cbEvent) {
    cb = isFunction(data) ? data : cb
    cbEvent = cbEvent || event
    const _self = this
    if (cb) {
      this._cbPool[cbEvent] = function(response) {
        _self._socket.off(cbEvent, _self._cbPool[cbEvent])
        cb(response)
      }
      this._socket.on(cbEvent, this._cbPool[cbEvent])
    }
    this._socket.emit(event, {
      fromId: this.id,
      ...data,
      cbEvent: cbEvent !== event ? cbEvent : null,
    })
  }
}
