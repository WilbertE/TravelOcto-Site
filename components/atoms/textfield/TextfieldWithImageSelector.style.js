import {Grid} from "@material-ui/core";
import styled from "styled-components";

const StyledTextfieldWithImageSelector = styled.div`
  margin-bottom: 16px;
  display: flex;

  .image-picker {
    margin-right: 16px;
    margin-top: 2px;
  }

  .buttons {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    border-radius: 5px;
    overflow: hidden;

    &.buttons-hidden {
      opacity: 0;
      pointer-events: none;
      transition: 0.25s ease;
    }

    .iconButton {
      margin: 0 8px;
      background: #fff;
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }

  .image-label {
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 0.75rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em;
    margin-bottom: 8px;
  }

  .image-wrapper {
    width: 150px;
    height: 100px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    &:hover .buttons.buttons-hidden {
      opacity: 1;
      pointer-events: all;
    }
  }
  .form {
    flex-grow: 1;
  }
`;

export {StyledTextfieldWithImageSelector};
