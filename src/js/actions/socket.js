import * as ACTIONS from 'actions/actionTypes'
import { values, isObject } from 'lodash'

export function setUser(payload) {
  return {
    type: ACTIONS.SOCKET_SET_USER,
    payload
  }
}

export function setUsersIds(userIds) {
  return {
    type: ACTIONS.SOCKET_SET_USERS_IDS,
    payload: isObject(userIds) ? values(userIds) : userIds,
  }
}

export function requestPartner(payload) {
  return {
    type: ACTIONS.SOCKET_REQ_PARTNER,
    payload
  }
}

export function requestPartnerConfirm(text) {
  return {
    type: ACTIONS.SOCKET_REQ_PARTNER,
    payload:text
  }
}