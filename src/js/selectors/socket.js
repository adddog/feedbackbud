export const getUserIds = (state, exlcudeYou = true) => {
  const id = state.socket.getIn(['user', 'id'])
  return state.socket
    .get('userIds')
    .filter(i => i !== id)
    .toArray()
}

export const isRequestingPartnerStatus = state => {
  return state.socket.getIn(['user', 'partner', 'status']) === 'requesting'
}
