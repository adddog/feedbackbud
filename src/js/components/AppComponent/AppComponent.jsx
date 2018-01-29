import React, { Component } from "react"
import PropTypes from "prop-types"
import { isUndefined } from "lodash"
import { debounce, autobind } from "core-decorators"
import classnames from "classnames"
import styles from "./AppComponent.css"

import PartnerPollComponent from "components/PartnerPollComponent/PartnerPollComponent"

export default class AppComponent extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUser()
  }

  componentDidUpdate() {}

  render() {
    return (
      <main className={classnames(styles.root)}>
      <PartnerPollComponent/>
      </main>
    )
  }
}
