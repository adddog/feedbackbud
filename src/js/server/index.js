import 'whatwg-fetch'
import Socket from './socket'

class Server {
  setStore(store) {
    this.socket = new Socket(store)
    this.Socket = this.socket
  }

  get io() {
    return this.socket.io
  }
}

export default new Server()