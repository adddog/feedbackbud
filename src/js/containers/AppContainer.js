import React from "react"
import {
    compose,
    setDisplayName,
    onlyUpdateForPropTypes,
    withHandlers,
} from "recompose"
import { connect } from "react-redux"
import { find, omit } from "lodash"
import { withRouter } from "react-router-dom"
import { getUser, setUser } from "actions/server"

import AppComponent from "components/AppComponent/AppComponent"

const mapStateToProps = () => (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, props) => ({
    getUser: ()=>dispatch(getUser()),
    setUser: ()=>dispatch(setUser()),
})

export default withRouter(
    compose(
        setDisplayName("AppComponent"),
        withHandlers({}),
        connect(mapStateToProps, mapDispatchToProps),
        onlyUpdateForPropTypes
    )(AppComponent)
)
