import {
  GET_USER,
  SET_USER,
} from 'actions/actionTypes';

export function getUser(payload = {}) {
  return {
    type: GET_USER,
    payload: payload
  };
}

export function setUser(payload = {}) {
  return {
    type: SET_USER,
    payload: payload
  };
}
