mport { IS_DEV, WIDTH, SERVER_URL } from "common/constants"
export default {
  getUser: () => {
    return fetch(`${SERVER_URL}${PATH}user/get`, {}).then(response =>
      response.json()
    )
  },
}
