import Base from './base'

export default class Room extends Base{
  constructor(socket, dispatch) {
    super(socket, dispatch)
  }
  createRoom({ roomId }) {
    if (!roomId) return
    this.emit('room:create', {
      id: this._socket.id,
      desktop: IS_DESKTOP,
      roomId: roomId,
    })
  }
}
