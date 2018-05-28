import React, { PureComponent } from "react";
import { withRouter, Link } from "react-router-dom";
import { v1 } from "uuid";
import { keys } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ROUTES } from "routes";
import { composeElement, extend, Section } from "UI/UIComponents";
import { setInstructions } from "actions/app";
import { getRoomSlug } from "selectors/webrtc";

const Button = composeElement(["flex"], "button");
const Container = extend(Section, ["centerBoth"]);

const InputSelectionChannelComponent = props => (
  <Container>
    {props.inputs.map((str, i) => (
      <Button key={v1()} onClick={() => {}}>
        {str}
      </Button>
    ))}
  </Container>
);

export default InputSelectionChannelComponent;
