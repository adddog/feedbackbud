import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { keys } from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WIDTH, HEIGHT } from 'common/constants'
import { ROUTES } from 'routes'
import { composeElement, extend, Container } from 'UI/UIComponents'
import InputSelectionChannelComponent from './InputSelectionChannelComponent'
import { setInstructions } from 'actions/app'
import { getRoomSlug } from 'selectors/webrtc'

const Button = composeElement(['flex'], 'button')
const ContainerEl = extend(
  Container,
  ['centerBoth'],
  `
    width: ${WIDTH}px;
  height: ${HEIGHT}px;`,
)

class InputSelectionComponent extends PureComponent {
  render() {
    return (
      <ContainerEl>
        {new Array(this.props.glSettings.numChannels)
          .fill(0)
          .map((_, i) => (
            <InputSelectionChannelComponent
              index={i}
              key={`InputSelectionChannelComponent${i}`}
              inputs={keys(this.props.videoInputs)}
            />
          ))}
      </ContainerEl>
    )
  }
}

export default InputSelectionComponent
