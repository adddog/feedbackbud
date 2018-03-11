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
import WebRTCComponent from "components/WebRTCComponent/WebRTCComponent"

class FeedComponent extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  componentDidUpdate() {}

  render() {
    return (
      <Main>
        <WebRTCComponent />
      </Main>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({
  router: state.router,
})

const mapDispatchToProps = (dispatch, props) => ({})

export default compose(
  setDisplayName("FeedComponent"),
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForPropTypes
)(FeedComponent)
