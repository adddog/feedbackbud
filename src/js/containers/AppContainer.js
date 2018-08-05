import React, { Component } from "react"
import PropTypes from "prop-types"
import {
    compose,
    setDisplayName,
    onlyUpdateForPropTypes,
    withHandlers,
} from "recompose"
import { connect } from "react-redux"
import { find, omit } from "lodash"
import { withRouter } from "react-router-dom"
import { isUndefined } from "lodash"
import { debounce, autobind } from "core-decorators"
import { Main } from "UI/UIComponents"

import InstructionsComponent from "components/Instructions/Instructions"
import WebRTC from "webrtc"

class AppComponent extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.webrtx = new WebRTC({})
  }

  componentDidUpdate() {}

  render() {
    return (
      <Main>
        <InstructionsComponent />
      </Main>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({
    routes: state.routes
})

const mapDispatchToProps = (dispatch, props) => ({
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
    }
}

export default withRouter(
    compose(
        setDisplayName("AppComponent"),
        withHandlers({}),
        connect(mapStateToProps, mapDispatchToProps, mergeProps),
        onlyUpdateForPropTypes
    )(AppComponent)
)
