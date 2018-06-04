import 'whatwg-fetch'
import Socket from './socket'

export default class Server {
  constructor(dispatch) {
    this.socket = new Socket(dispatch)
  }
}
