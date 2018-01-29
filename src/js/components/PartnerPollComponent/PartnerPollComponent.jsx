import React, { Component } from "react"
import {
  compose,
  setDisplayName,
  onlyUpdateForPropTypes,
  withHandlers,
} from "recompose"
import { isUndefined } from "lodash"
import { connect } from "react-redux"
import { autobind } from "core-decorators"
import ReactHtmlParser from "react-html-parser"
import {
  CSSTransition,
  TransitionGroup,
} from "react-transition-group"
import PropTypes from "prop-types"
import classnames from "classnames"
import styles from "./PartnerPollComponent.css"

export class PartnerPollComponent extends Component {
  static propTypes = {
    pollPartnerResults: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      closed: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      /*this.setState({ closed: false })
      clearTimeout(this._timeout)
      const _self = this
      this._timeout = setTimeout(function() {
        _self.setState({ closed: true })
      }, 8000)*/
    }
    console.log(nextProps)
  }

  @autobind
  _onClick() {}

  render() {
    console.log(this.props.pollPartnerResults)
    return (
      <TransitionGroup
        onClick={this._onClick}
        className={classnames([styles.root])}
      >
        <CSSTransition
          timeout={1000}
          classNames={{
            enter: styles["alertEnter"],
            enterActive: styles["alertEnterActive"],
            exit: styles["alertLeave"],
            exitActive: styles["alertLeaveActive"],
          }}
        >
          <div className={styles["root--content"]}>
              {this.props.pollPartnerResults.map(pollPartner => (
                <div
                  key={pollPartner.id}
                  className={styles["root--content--results--item"]}
                >{pollPartner.id}</div>
              ))}
          </div>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({
  pollPartnerResults: state.server.get("pollPartnerResults"),
})

const mapDispatchToProps = (dispatch, props) => ({})

export default compose(
  setDisplayName("PartnerPollComponent"),
  connect(mapStateToProps, mapDispatchToProps)
)(PartnerPollComponent)
