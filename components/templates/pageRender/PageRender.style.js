import styled from "styled-components";

const StyledPageRender = styled.div`
  margin-top: 16px;

  .add-component-line {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .add-component-line {
    //opacity: 0.5;
    &:hover {
      transition: opacity 0.2s ease;
      opacity: 1;
    }
  }
`;

export {StyledPageRender};
