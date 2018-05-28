import React, { PureComponent } from "react";
import { withRouter, Link } from "react-router-dom";
import { keys } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ROUTES } from "routes";
import { composeElement, extend, Main } from "UI/UIComponents";
import InputSelectionChannelComponent from "./InputSelectionChannelComponent";
import { setInstructions } from "actions/app";
import { getRoomSlug } from "selectors/webrtc";

const Button = composeElement(["flex"], "button");
const Container = extend(Main, ["centerBoth"]);

class InputSelectionComponent extends PureComponent {
  render() {
    return (
      <Container>
        {new Array(this.props.glSettings.numChannels)
          .fill(0)
          .map((_, i) => (
            <InputSelectionChannelComponent
              key={`InputSelectionChannelComponent${i}`}
              inputs={keys(this.props.videoInputs)}
            />
          ))}
      </Container>
    );
  }
}

export default InputSelectionComponent;
