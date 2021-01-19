import {ButtonBase} from "@material-ui/core";
import styled from "styled-components";

const ParagraphPrimitive = function ({liveMode, renderDynamicText, dynamicText, staticText, bottomMargin, ...props}) {
  return <p {...props}>{props.children}</p>;
};

const StyledParagraph = styled(ParagraphPrimitive)`
  margin-top: 0;
  line-height: 1.6em;
  letter-spacing: 0.25px;
  &:empty {
    display: none;
  }
  margin-bottom: ${(props) =>
    props.children && props.children.props && props.children.props.bottomMargin == true ? "32px" : props.bottomMargin == true ? "32px" : "0px"};
  > p {
    margin-bottom: ${(props) =>
      props.children && props.children.props && props.children.props.bottomMargin == true ? "-12px" : props.bottomMargin == true ? "-12px" : "0px"};
  }
  @media screen and (min-width: 1280px) {
    line-height: 1.85em;
  }
`;

export {StyledParagraph};
