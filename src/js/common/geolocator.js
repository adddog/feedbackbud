import geolocator from "geolocator"
import { IS_MOBILE, IS_DEV } from "common/constants"
import * as ACTIONS from "actions/actionTypes"

class GEOLOCATOR {
  constructor() {}

  start() {
    const _self = this
    try {
      geolocator.config({
        language: "en",
      })
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumWait: 10000, // max wait time for desired accuracy
        maximumAge: 0, // disable cache
        desiredAccuracy: 30, // meters
        fallbackToIP: true, // fallback to IP if Geolocation fails or rejected
        addressLookup: true, // requires Google API key if true
        timezone: true, // requires Google API key if true
        map: "map-canvas", // interactive map element id (or options object)
        staticMap: true, // map image URL (boolean or options object)
      }
      geolocator.locate(options, function(err, location) {
        if (err) return console.log(err)
        _self.dispatchLocation(location)
      })
    } catch (e) {}

    if (!IS_MOBILE && IS_DEV) {
      setInterval(() => {
        this.dispatchLocation({
          latitude: 37.845784 - Math.random() / 1000,
          longitude: -122.267539 - Math.random() / 1000,
        })
      }, 3000)
    }
  }

  set dispatch(dispatch) {
    this._dispatch = dispatch
  }

  dispatchLocation(location) {
    this._dispatch({
      type: ACTIONS.GEO_SET_LOCATION,
      payload: location,
    })
  }
}
export default new GEOLOCATOR()
