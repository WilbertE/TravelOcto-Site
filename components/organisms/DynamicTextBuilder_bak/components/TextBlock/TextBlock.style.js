import styled from "styled-components";

const StyledTextBlock = styled.span`
  border-radius: 5px;
  padding: 3px;
  position: relative;
  border: dashed 1px #e8e8e8;
  transition: border-color 0.3s ease-out, background-color 0.3s ease-out;
  margin: 0 5px;

  &:hover {
    border: dashed 1px #b5b5b5;
  }

  .variantControlWrapper {
    /* pointer-events: none; */
    display: inline-block;
    /* opacity: 0; */
    position: relative;
    width: 0px;
  }

  .variantControl {
    position: absolute;
    width: 60px;
    display: flex;
    position: relative;
    top: -14px;
    left: -60px;
    background-color: #b5b5b5;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
  }
  .variantControlArrow {
    color: #fff;
    padding: 8px;
    .MuiIconButton-label {
      width: 0.25rem;
      height: 0.25rem;
    }
    svg {
      width: 0.375rem;
    }
  }

  .variantControlAmount {
    color: #fff;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.55em;
    z-index: 9;
    padding: 0 3px;
  }

  &:hover {
    background-color: #fce8fa;
    cursor: pointer;
  }
`;

export {StyledTextBlock};
