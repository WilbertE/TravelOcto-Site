import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledTextBlockConfigurator = styled.div`
  background-color: #e0e0e0;
  padding: 4px 8px 8px;
  margin-bottom: 16px;

  textarea {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    display: block;
    box-sizing: border-box;
    height: 75px;
    border: none;
    padding: 8px 8px;
    outline: none;
    margin-bottom: 4px;
  }

  .configButton {
    margin-right: 4px;
  }

  .tools {
    display: flex;
    justify-content: space-between;
  }

  .italic svg {
    width: 0.7rem;
    height: 0.8rem;
  }
  .bold svg {
    width: 0.6rem;
    height: 0.7rem;
  }
  .save {
    color: green;
    margin-right: 0;
  }
`;

export {StyledTextBlockConfigurator};
