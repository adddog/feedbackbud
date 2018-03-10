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

import WebRTC from "webrtc"

class WebRTCComponent extends Component {
  static propTypes = {
    isStarted: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.webrtx = new WebRTC(this.props.webrtc)
  }

  componentDidUpdate() {}

  render() {
    return (
      <Main>
      <span>HERER</span>
        <div id="localVideo" />
        <div id="remoteVideo" />
      </Main>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({
  isStarted: state.app.get("instructions").started,
  webrtc: state.webrtc,
})

const mapDispatchToProps = (dispatch, props) => ({})

export default compose(
  setDisplayName("WebRTCComponent"),
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForPropTypes
)(WebRTCComponent)
