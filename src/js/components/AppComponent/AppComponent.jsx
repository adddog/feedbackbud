import React, { Component } from "react"
import PropTypes from "prop-types"
import { isUndefined } from "lodash"
import { debounce, autobind } from "core-decorators"
import classnames from "classnames"

import styles from "./AppComponent.css"

import WebRTC from "webrtc"

export default class AppComponent extends Component {

  static propTypes = {
    //actions
//    queryChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.webrtx = new WebRTC({})
  }

  componentDidUpdate() {}

  render() {
    return (
      <main className={classnames(styles.root)}>

      </main>
    )
  }
}
