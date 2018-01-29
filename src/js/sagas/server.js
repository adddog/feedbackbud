import { isError } from "lodash"
import { delay } from "redux-saga"
import { takeLatest, select, call, put } from "redux-saga/effects"
import * as ACTIONS from "actions/actionTypes"
import Geolocator from "common/geolocator"
import Server from "common/server"
import Socket from "common/socket"

/*******
Call the api
*******/

/*******
update the progress
*******/
function* _socketEmit(address, value = {}) {
  const socketResponse = yield call(Socket.emit, address, value)
  return socketResponse
}

function* _doGeoStart(action) {
  Geolocator.start()
  yield _doPollFindProximityUsers()
}

function* _doApiGetProjectChildren(action) {
  const children = yield call(Premiere.getProjectChildren, action)
  yield put({
    type: ACTIONS.REQUEST_PREMIERE_PROJECT_CHILDREN_SUCCESS,
    response: children,
  })
}

function* _doPollFindProximityUsers() {
  const partner = yield select(state => state.server.get("partner"))
  if (!partner) {
    const results = yield _socketEmit("geolocation:findNear")
    if (!results.length) {
      yield delay(3000)
      yield _doPollFindProximityUsers()
    } else {
      yield put({
        type: ACTIONS.USER_SET_PARTNERS,
        payload: results,
      })
    }
  }
}

function* _doGeoSetLocation(action) {
  yield _socketEmit("geolocation:update", action.payload)
}

export function* geoStart() {
  yield takeLatest(ACTIONS.SOCKET_SET_ID, _doGeoStart)
}

export function* geoSetLocation() {
  yield takeLatest(ACTIONS.GEO_SET_LOCATION, _doGeoSetLocation)
}
