import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, setDisplayName, onlyUpdateForPropTypes, withHandlers } from 'recompose'
import { composeElement, Input, Button, extend } from 'UI/UIComponents'
import { requestPartner } from 'actions/socket'
import { getUserIds, isRequestingPartnerStatus } from 'selectors/socket'

import ModalComponent from 'UI/ModalComponent'

export default class PeerDialogComponent extends PureComponent {
  render() {
    return (
      <ModalComponent>
        <Input innerRef={el => (this.el = el)} placeholder={this.props.placeholder} />
        <Button onClick={() => this.props.onSubmit(this.el.value)}>{this.props.submitText}</Button>
      </ModalComponent>
    )
  }
}
