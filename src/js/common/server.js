import "whatwg-fetch"
import { IS_DEV, WIDTH, SERVER_URL } from "common/constants"
const PATH =
  process.env.NODE_ENV === "development" ? "" : "feedback-rtc/"

const Server = (() => {

  const DEFAULT_ENDPOINT = "users"
  const DEFAULT_ORIGIN = "https://api.instagram.com"
  const DEFAULT_SIZE = 100
  const DEFAULT_VERSION = "v1"



  function roomId() {
    return fetch(`${SERVER_URL}${PATH}room`, {}).then(response =>
      response.json()
    )
  }

  return {
    roomId,
  }
})()

export default Server
