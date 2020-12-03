import styled from "styled-components";

const StyledTextFieldWithChips = styled.div`
  .chip-wrapper {
    .chip-wrapper-label {
      display: block;
      transform: translate(0, 1.5px) scale(0.75);
      transform-origin: top left;
      color: rgba(0, 0, 0, 0.54);
    }
    margin: 0 -4px 16px -4px;
  }
  .chip {
    margin: 4px;
  }
`;

export {StyledTextFieldWithChips};
