import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, setDisplayName, onlyUpdateForPropTypes, withHandlers } from 'recompose'
import { qs, fillScreen } from 'utils'
import { keyboardUpdate } from 'actions/keyboard'
import styled from 'styled-components'
import { composeElement } from 'UI/UIComponents'
import { Main } from 'UI/UIComponents'
import { getWebRTCProps, getDimentions } from 'selectors/webrtc'
import WebRTC from 'webrtc'
import GL from 'gl'
import InputSelectionComponent from 'components/InputSelectionComponent/InputSelectionComponent'

export const CanvasContainer = composeElement(['abs', 'abs--tl', 'full'], 'div')

export const Canvas = styled.canvas`
    backface-visibility: hidden
    perspective: 1
    transform-origin: 0% 0%
    transform: scale3d(1,1,1)
`

export const VideoEl = composeElement(['abs', 'abs--tl'], 'video', `display:none;`)

class WebRTCComponent extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired,
    dimensions: PropTypes.object.isRequired,
    webRTCProps: PropTypes.object.isRequired,
    dispatchHandlers: PropTypes.object.isRequired,
    videoInputs: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.webrtc = new WebRTC(this.props.webRTCProps)
    this.gl = GL(this.canvasEl, this.props.webRTCProps.settings,
      this.props.dispatchHandlers)
    /*this.gl.model.addSourceEl(
      qs(`#${this.props.webRTCProps.elementIds.localVideo}`),
    );*/
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidUpdate() {}

  render() {
    return (
      <Main>
        <VideoEl
          width={this.props.dimensions.width}
          height={this.props.dimensions.height}
          id={this.props.webRTCProps.elementIds.localVideo}
          playsInline
          autoPlay
        />
        <div id={this.props.webRTCProps.elementIds.remoteVideo} />
        <CanvasContainer>
          <Canvas
            width={this.props.dimensions.width}
            height={this.props.dimensions.height}
            innerRef={el => (this.canvasEl = el)}
            id={this.props.webRTCProps.elementIds.outputCanvas}
          />
        </CanvasContainer>
        <InputSelectionComponent glSettings={this.props.glSettings} videoInputs={this.props.videoInputs} />
      </Main>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({
  isStarted: state.app.get('instructions').started,
  dimensions: getDimentions(state),
  glSettings: state.gl.get('settings'),
  videoInputs: state.gl.get('videoInputs'),
  webRTCProps: getWebRTCProps(state, ownProps),
})

const mapDispatchToProps = (dispatch, props) => ({
  dispatchHandlers: {
    keyboardUpdate: data => dispatch(keyboardUpdate(data)),
  },
})

export default compose(
  setDisplayName('WebRTCComponent'),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  onlyUpdateForPropTypes,
)(WebRTCComponent)
