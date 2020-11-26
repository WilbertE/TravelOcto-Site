import {ButtonBase} from "@material-ui/core";
import styled from "styled-components";

const ParagraphPrimitive = function ({liveMode, bottomMargin, ...props}) {
  return <p {...props}>{props.children}</p>;
};

const StyledParagraph = styled(ParagraphPrimitive)`
  margin-top: 0;
  margin-bottom: ${(props) => (props.bottomMargin == true ? "32px" : "0px")};
  > p {
    margin-bottom: ${(props) => (props.bottomMargin == true ? "-12px" : "0px")};
  }
`;

export {StyledParagraph};
