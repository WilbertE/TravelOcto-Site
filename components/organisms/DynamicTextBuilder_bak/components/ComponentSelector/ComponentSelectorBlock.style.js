import styled from "styled-components";

const StyledComponentSelectorBlock = styled.span`
  border: dashed 1px #b5b5b5;
  border-radius: 5px;
  padding: 3px 0;
  opacity: 0.5;
  transition: opacity 0.3s ease-out;
  &:hover {
    opacity: 1;
  }
  .iconButton {
    position: relative;
    top: -2px;
  }
`;

export {StyledComponentSelectorBlock};
