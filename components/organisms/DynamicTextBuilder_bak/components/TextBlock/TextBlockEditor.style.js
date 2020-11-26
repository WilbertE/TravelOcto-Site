import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    min-width: 700px;
  }
`;

const StyledTextBlockEditor = styled.div`
  margin-bottom: 16px;

  &.edit-mode {
    .switcher {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    .add-text-variant-wrapper {
      display: block;
    }
    .add-button,
    .edit-button {
      display: none;
    }

    .preview,
    .switcher {
      opacity: 0.8;
    }
  }

  .preview {
    border-top: solid 1px #c4c4c4;
    padding: 18.5px 14px;
    max-height: 7em;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .MuiOutlinedInput-root {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .toolbar {
    background-color: #fafafa;
    border: solid 1px #c4c4c4;
    border-left: none;
    border-right: none;
    padding: 4px;
    display: flex;
  }

  .switcher {
    align-items: center;
    justify-content: space-between;

    &-start {
      width: 150px;
    }
    &-end {
      width: 150px;
      text-align: right;
    }
  }

  .add-text-variant-wrapper {
    display: none;

    .MuiOutlinedInput-root {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }
  }
  .add-text {
    width: 100%;
    border-top: none;
  }
  .add-text-variant-toolbar {
    border-top: none;
    justify-content: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .synonym {
    background-color: #c8d0f7;
    padding: 2px 2px;
    margin: 0 3px;
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
  }

  .editor .synonym:hover {
    background-color: #b7c0e8;
  }
`;

export {StyledDialog, StyledTextBlockEditor};
