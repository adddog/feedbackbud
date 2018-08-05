import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CONFIRMING, CONFIRMED, INACTIVE } from 'common/states'

import { Text, Button, ContainerStack } from 'UI/UIComponents'

const getNextStatus = status => {
  switch (status) {
    case CONFIRMING:
      return CONFIRMED
    case CONFIRMED:
      return INACTIVE
  }
}

export default class MessageComponent extends PureComponent {
  static propTypes = {
    message: PropTypes.object.isRequired,
  }
  render() {
    return (
      <ContainerStack>
        <Text>{this.props.message.id}</Text>
        <Text>{this.props.message.message}</Text>
      </ContainerStack>
    )
  }
}

export class MessageConfirmComponent extends PureComponent {
  static propTypes = {
    message: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    cancelText: PropTypes.string,
    submitText: PropTypes.string,
  }
  static defaultProps = {
    cancelText: 'No',
    submitText: 'Yes',
  }
  render() {
    return (
      <ContainerStack>
        <Text>{this.props.message.title}</Text>
        <Text>{this.props.message.message}</Text>
        {this.props.message.status === CONFIRMING && (
          <Button onClick={() => this.props.onCancel({})}>
            {this.props.cancelText}
          </Button>
        )}
        <Button
          onClick={() =>
            this.props.onSubmit({
              ...this.props.message,
              status: getNextStatus(this.props.message.status),
            })
          }
        >
          {this.props.submitText}
        </Button>
      </ContainerStack>
    )
  }
}
