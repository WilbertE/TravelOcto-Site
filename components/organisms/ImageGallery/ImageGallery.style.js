import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledImageGallery = styled(Dialog)`
  .MuiPaper-root {
    width: 80vw;
    max-width: 80vw;
    height: 80vh;
  }

  .no-images {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-wrapper {
    padding-top: 70%;
    position: relative;
    width: 100%;
    cursor: pointer;
  }

  .image {
    position: absolute;
    display: block;
    top: 4px;
    right: 4px;
    bottom: 4px;
    left: 4px;
    background-color: #000;
    object-fit: contain;
    object-position: center center;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    border-radius: 5px;
    ${(props) => props.isSelected && "border: solid 2px #28ab07;"}
    box-sizing: border-box;
  }

  .image-picker {
    border: solid 1px #e0e0e0;
    border-radius: 5px;
    background-color: #fff;
    transition: background-color 0.2s ease;
    &:hover{
        background-color: #f2f2f2;
    }
  }

  .image-buttons {
    margin: 8px;
    display: flex;
    justify-content: space-between;
  }
`;

export {StyledImageGallery};
