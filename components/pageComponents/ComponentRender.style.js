import styled from "styled-components";

const StyledComponentRender = styled.div`
  > .add-component-line {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  &:hover > .add-component-line {
    opacity: 0.5;
    &:hover{
      transition: opacity 0.2s ease;
      opacity: 1;
    }
  }
`;

export {StyledComponentRender};
