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
    roomId: PropTypes.string.isRequired,
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
        <video
          className="u-full video--local"
          id={this.props.webRTCProps.elementIds.localVideo}
          playsInline
          autoPlay
        />
        <div id={this.props.webRTCProps.elementIds.remoteVideo} />
        <div className="u-canvas-container">
          <canvas className="canvas" id={this.props.webRTCProps.elementIds.outputCanvas} />
        </div>
      </Main>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({
  isStarted: state.app.get("instructions").started,
  webRTCProps: getWebRTCProps(state, ownProps),
})

const mapDispatchToProps = (dispatch, props) => ({})

export default compose(
  setDisplayName("WebRTCComponent"),
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForPropTypes
)(WebRTCComponent)
