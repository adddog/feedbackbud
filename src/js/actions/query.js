import {
  QUERY_CHANGED,
  OPEN_FILE_SOURCE_MONITOR,
} from 'actions/actionTypes';

export function queryChanged(payload = {}) {
  return {
    type: QUERY_CHANGED,
    payload: payload
  };
}

export function queryResultClicked(payload = {}) {
  return {
    type: OPEN_FILE_SOURCE_MONITOR,
    payload: payload
  };
}
