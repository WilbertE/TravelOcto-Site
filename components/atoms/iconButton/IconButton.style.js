import MuiIconButton from "@material-ui/core/IconButton";
import styled from "styled-components";

const IconButtonPrimitive = function ({small, square, color, ...props}) {
  return <MuiIconButton {...props}>{props.children}</MuiIconButton>;
};

const StyledIconButton = styled(IconButtonPrimitive)`
  cursor: pointer;
  color: #212121;

  ${(props) =>
    props.color == "white" &&
    `
    background: #fff;
    border: solid 1px #b8b8b8;
    &:hover {
      background-color: #f5f5f5;
    }
    `}

  width: 32px;
  height: 32px;

  ${(props) => props.small && `width: 28px;height: 28px;`}

  .MuiIconButton-label {
    width: 1rem;
    height: 1rem;
    svg {
      height: 1rem;
      width: 1rem;
      max-width: 1rem;
      max-height: 1rem;
    }
    ${(props) =>
      props.small &&
      `svg {
        height: 0.8rem;
        width: 0.8rem;
      }`}
  }

  ${(props) =>
    props.square &&
    `
      border-radius:5px;
        * {
        border-radius:5px;
      }
  `}

  .MuiIconButton-label {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export {StyledIconButton};
