import * as EVENTS from 'server/events'
import Base from './base'
import { setUsersIds, removeUsersIds } from 'actions/socket'

export default class Users extends Base {
  constructor(socket, store) {
    super(socket, store)

    /*************
     *  listeners
     ************ */
    socket.on(EVENTS.USERS_CONNECTION, id =>
      this.dispatch(setUsersIds(id)),
    )

    socket.on(EVENTS.USERS_DISCONNECTION, id =>
      this.dispatch(removeUsersIds(id)),
    )
  }

  getUsersIds() {
    this.emit(EVENTS.USERS_GET_ID, userIds =>
      this.dispatch(setUsersIds(userIds)),
    )
  }
}
