import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, setDisplayName, onlyUpdateForPropTypes, withHandlers } from 'recompose'
import { composeElement, Div, extend } from 'UI/UIComponents'
import { requestPartner, requestPartnerConfirm } from 'actions/socket'
import { getUserIds, isRequestingPartnerStatus } from 'selectors/socket'

import PeerDialogComponent from 'components/Interface/peer/PeerDialogComponent'

const ContainerEl = extend(
  Div,
  ['wrap'],
  `
  position: absolute;
  bottom:0;
  `,
)
const Button = composeElement(['flex'], 'button')

class PeersComponent extends Component {
  static propTypes = {
    requestingPartnerStatus: PropTypes.bool.isRequired,
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
            onClick={() => this.props.requestPartner({ id, status: 'requesting' })}
            key={id}
          >
            {id}
          </Button>
        ))}
        {this.props.requestingPartnerStatus && (
          <PeerDialogComponent
            onSubmit={value=>this.props.requestPartnerConfirm({status: 'confirming'})}
            submitText={'Invite'}
            placeholder={"Say hello: 'hello!'"}
          />
        )}
      </ContainerEl>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({
  requestingPartnerStatus: isRequestingPartnerStatus(state),
  userIds: getUserIds(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  requestPartner: id => dispatch(requestPartner(id)),
  requestPartnerConfirm: id => dispatch(requestPartnerConfirm(id)),
})

export default compose(
  setDisplayName('PeersComponent'),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  onlyUpdateForPropTypes,
)(PeersComponent)
