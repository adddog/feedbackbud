import * as ACTIONS from 'actions/actionTypes'
import * as EVENTS from 'server/events'
import { SERVER_URL, IS_DESKTOP } from 'common/constants'
import { isObject } from 'lodash'
import { autobind } from 'core-decorators'
import io from 'socket.io-client'
import { setUsersIds, messageReceived } from 'actions/socket'
import Base from './base'

export default class User extends Base {
  constructor(socket, store) {
    super(socket, store)

    socket.on(EVENTS.USER_MESSAGE_RESPONSE, action => {
      switch (action.type) {
        case ACTIONS.SOCKET_REQ_PARTNER_CONFIRM: {
          this.dispatch(messageReceived(action))
        }
      }
    })

    socket.on(EVENTS.USER_MESSAGE_REQUEST, action => {
      switch (action.type) {
        case ACTIONS.SOCKET_REQ_PARTNER_CONFIRM: {
          this.dispatch(messageReceived(action))
        }
      }
    })
  }

  @autobind
  onStoreChanged() {}

  sendMessageNoReply(event, message) {
    event = isObject(event) ? EVENTS.USER_MESSAGE : event
    this.emit(event, message)
  }

  sendMessage(event, message) {
    event = isObject(event) ? EVENTS.USER_MESSAGE : event
    this.emitWithId(
      event,
      message,
      response => {
        this.dispatch(messageReceived(response))
      },
      EVENTS.USER_MESSAGE_RESPONSE
    )
  }
}
