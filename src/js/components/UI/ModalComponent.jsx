import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { composeElement, Div, extend } from 'UI/UIComponents'
const ContainerEl = extend(
  Div,
  ['fixed','full', 'tl', 'flex', 'centerBoth'],
)
const PeerDialogComponent = props => <ContainerEl>{props.children}</ContainerEl>

export default PeerDialogComponent
