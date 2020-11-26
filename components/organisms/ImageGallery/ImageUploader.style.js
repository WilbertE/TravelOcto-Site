import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledImageUploader = styled(Dialog)`
  .image-wrapper {
    margin: 16px 0;

    padding-top: 70%;
    position: relative;
    width: 100%;
    background-color: #e0e0e0;

    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 5px;
    &:hover {
      background-color: #c2c2c2;
      .upload-icon.upload-icon-selected {
        opacity: 1;
        transform: translateY(0%);
      }
    }

    .image {
      border-radius: 5px;
      position: absolute;
      display: block;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      background-color: #000;
      object-fit: contain;
      object-position: center center;
      width: calc(100%);
      height: calc(100%);
      box-sizing: border-box;
    }

    .upload-icon {
      &.upload-icon-selected {
        transition: opacity 0.2s ease, transform 0.2s ease;
        opacity: 0;
        transform: translateY(50%);
        background: rgba(255, 255, 255, 0.85);
      }
      padding: 16px;
      border-radius: 50%;
      z-index: 1;
      position: absolute;
      width: 24px;
      height: 24px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .no-image-selected-text {
    margin: 0 auto 8px;
  }

  .image-input {
    position: absolute;
    top: 0;
    z-index: 999;
    display: block;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    border: solid;
    box-sizing: border-box;
    cursor: pointer;
    opacity: 0;
  }
`;

export {StyledImageUploader};
