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

import AppComponent from "components/AppComponent/AppComponent"

import {
    getProjectChildren,
    getProjectFileMetadatas,
} from "actions/premiere"

import { queryChanged } from "actions/query"

const mapStateToProps = () => (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, props) => ({
    getProjectChildren: () => dispatch(getProjectChildren()),
    getProjectFileMetadatas: () =>
        dispatch(getProjectFileMetadatas()),
    queryChanged: value => dispatch(queryChanged(value)),
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
