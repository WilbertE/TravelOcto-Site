import styled from "styled-components";
import {Button} from "@material-ui/core";

const PrimitiveButton = function ({noMargin, small, color, ...props}) {
  if (color == "warning") color = "primary";
  return (
    <Button {...props} color={color}>
      {props.children}
    </Button>
  );
};

const StyledButton = styled(PrimitiveButton)`
  ${(props) => props.variant == "contained" && `background: ${props.theme.color.primary.base}; color: #fff;`};
  ${(props) => props.variant == "text" && `color: ${props.theme.color.primary.base};`};
  ${(props) => props.variant == "text" && props.color == "warning" && `color: #d90404;`}

  box-shadow: none;
  margin: 16px auto;
  padding: 8px 32px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.8em;

  .indicator-overlay {
    border-radius: 5px;
  }

  ${(props) => props.noMargin && `margin: 0 auto;`}
  ${(props) => props.small && `font-size: 0.7em; padding: 6px 12px;`}

  &:hover {
    ${(props) => props.variant == "contained" && `background: ${props.theme.color.primary.dark};`};
    ${(props) => props.variant == "text" && `color: ${props.theme.color.primary.dark};`};
    ${(props) => props.variant == "text" && props.color == "warning" && `color: #cc0202;`}
  }
`;

export {StyledButton};
