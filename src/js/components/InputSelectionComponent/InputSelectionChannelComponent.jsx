import React, { PureComponent } from "react"
import { MEDIA_TYPES, ALLOWED_TYPES } from "common/constants"
import { M_INPUT_NEW } from "common/events"
import { withRouter, Link } from "react-router-dom"
import Emitter from "common/emitter"
import { v1 } from "uuid"
import { keys } from "lodash"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { ROUTES } from "routes"
import {
  composeElement,
  extend,
  Container,
  Span,
} from "UI/UIComponents"
import { setInstructions } from "actions/app"
import { getRoomSlug } from "selectors/webrtc"

const Button = composeElement(["flex"], "button")
const Input = composeElement(["flex"], "input")
const ContainerEl = extend(Container, ["wrap"])

const getElType = (type, props) =>
  type === MEDIA_TYPES.file ? (
    <Input
      placeholder={type}
      type={type}
      onChange={e => {
        const files = Array.from(e.target.files).filter(
          file => ALLOWED_TYPES.indexOf(file.type) > -1
        )
        if (files.length) {
          Emitter.emit(M_INPUT_NEW, {
            type: MEDIA_TYPES["file"],
            index: props.index,
            files,
          })
        }
      }}
    />
  ) : (
    <Button
      onClick={() =>
        Emitter.emit(M_INPUT_NEW, {
          type,
          index: props.index,
        })
      }
    >
      {type}
    </Button>
  )

const InputSelectionChannelComponent = props => (
  <ContainerEl>
    {props.inputs.map((str, i) => (
      <Span key={v1()}>{getElType(str, props)}</Span>
    ))}
  </ContainerEl>
)

export default InputSelectionChannelComponent
