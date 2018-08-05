import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { REQUESTING, CONFIRMING } from 'common/states'
import { connect } from 'react-redux'
import {
  compose,
  setDisplayName,
  onlyUpdateForPropTypes,
  withHandlers,
} from 'recompose'
import { composeElement, Div, extend } from 'UI/UIComponents'
import {
  requestPartner,
  requestPartnerConfirm,
  messageSendNoReply,
  messageDelete,
} from 'actions/socket'
import {
  getUserIds,
  requestingPartnerStatusOf,
  getIncomingMessages,
} from 'selectors/socket'

import PeerDialogComponent from 'components/Interface/peer/PeerDialogComponent'
import PeerMessagesComponent from 'components/Interface/peer/PeerMessagesComponent'

const ContainerEl = extend(
  Div,
  ['wrap'],
  `
  position: absolute;
  bottom:0;
  `,
)
const Button = composeElement(['flex'], 'button')

class PeerComponent extends Component {
  static propTypes = {
    requestingPartnerStatus: PropTypes.object,
    incomingMessages: PropTypes.array,
    userIds: PropTypes.array.isRequired,
    requestPartner: PropTypes.func.isRequired,
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <ContainerEl centerBoth="true">
        {this.props.userIds.map(id => (
          <Button
            onClick={() =>
              this.props.requestPartner({ id, status: REQUESTING })
            }
            key={id}
          >
            {id}
          </Button>
        ))}
        {this.props.requestingPartnerStatus && (
          <PeerDialogComponent
            peer={this.props.requestingPartnerStatus}
            onSubmit={data =>
              this.props.requestPartnerConfirm({
                ...data,
                title: `You are being asked to connect.`,
                status: CONFIRMING,
              })
            }
            submitText={'Invite'}
            placeholder={"Say hello: 'hello!'"}
          />
        )}
        {this.props.incomingMessages.length ? (
          <PeerMessagesComponent
            onSubmit={data =>
              this.props.messageSendNoReply({
                ...data,
                title: `You are connected.`,
                /* ************
                *  !!!invert!
                ************ */
                fromId: data.id,
                id: data.fromId,
              })
            }
            onCancel={data => this.props.messageDelete(data)}
            messages={this.props.incomingMessages}
          />
        ) : null}
      </ContainerEl>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({
  requestingPartnerStatus: requestingPartnerStatusOf(state),
  incomingMessages: getIncomingMessages(state),
  userIds: getUserIds(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  requestPartner: id => dispatch(requestPartner(id)),
  messageSendNoReply: id => dispatch(messageSendNoReply(id)),
  Cancel: id => dispatch(Cancel(id)),
  requestPartnerConfirm: id => dispatch(requestPartnerConfirm(id)),
})

export default compose(
  setDisplayName('PeerComponent'),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  onlyUpdateForPropTypes,
)(PeerComponent)
