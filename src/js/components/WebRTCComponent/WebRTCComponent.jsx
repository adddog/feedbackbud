import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  compose,
  setDisplayName,
  onlyUpdateForPropTypes,
  withHandlers,
} from "recompose"
import { composeElement, Section, Bb } from "UI/UIComponents"
import { Main } from "UI/UIComponents"

import { getWebRTCProps } from "selectors/webrtc"

import WebRTC from "webrtc"

class WebRTCComponent extends Component {
  static propTypes = {
    webRTCProps: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.webrtc = new WebRTC(this.props.webRTCProps)
  }

  componentDidUpdate() {}

  render() {
    return (
      <Main>
        <div id="localVideo" />
        <div id="remoteVideo" />
      </Main>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({
  isStarted: state.app.get("instructions").started,
  webRTCProps: getWebRTCProps(state),
})

const mapDispatchToProps = (dispatch, props) => ({})

export default compose(
  setDisplayName("WebRTCComponent"),
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForPropTypes
)(WebRTCComponent)
