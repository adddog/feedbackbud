import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose, setDisplayName, onlyUpdateForPropTypes, withHandlers } from 'recompose'
import { composeElement, Section, Bb } from 'UI/UIComponents'

import { getRoomIdFromMatchParams } from 'selectors/routes'
import { Main } from 'UI/UIComponents'
import WebRTCComponent from 'components/WebRTCComponent/WebRTCComponent'
import PeerComponent from 'components/Interface/PeerComponent'

class FeedComponent extends Component {
    static propTypes = {
        roomId: PropTypes.string.isRequired,
        router: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        return (
            <Main>
                <WebRTCComponent roomId={this.props.roomId} />
                <PeerComponent />
            </Main>
        )
    }
}


const mapStateToProps = () => (state, ownProps) => ({
    routes: state.routes,
    router: state.router,
    roomId: getRoomIdFromMatchParams(state, ownProps),
})

const mapDispatchToProps = (dispatch, props) => ({})

export default withRouter(
    compose(
        setDisplayName('FeedComponent'),
        withHandlers({}),
        connect(
            mapStateToProps,
            mapDispatchToProps,
        ),
        onlyUpdateForPropTypes,
    )(FeedComponent),
)
