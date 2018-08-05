import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ModalComponent from 'UI/ModalComponent'
import { MessageConfirmComponent } from 'components/Interface/messaging/MessageComponent'

export default class PeerMessagesComponent extends PureComponent {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  render() {
    return (
      <ModalComponent>
        {this.props.messages.map((message, i) => (
          <MessageConfirmComponent
            key={`${message.id}${i}`}
            message={message}
            onSubmit={this.props.onSubmit}
          />
        ))}
      </ModalComponent>
    )
  }
}
