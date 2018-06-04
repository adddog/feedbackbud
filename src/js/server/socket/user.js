import { SERVER_URL, IS_DESKTOP } from 'common/constants'
import io from 'socket.io-client'
import { setUsersIds } from 'actions/socket'
import Base from './base'

export default class User extends Base {
  constructor(socket, dispatch) {
    super(socket, dispatch)
  }

  getUsersIds() {
    this.emit('users:get:id', userIds => this.dispatch(setUsersIds(userIds)))
  }
}
