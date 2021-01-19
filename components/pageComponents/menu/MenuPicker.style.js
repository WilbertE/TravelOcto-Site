import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledMenuPicker = styled(Dialog)`
  .MuiPaper-root {
    width: 800px;
    max-width: calc(100% - 20px);
  }
  .create-menu-form {
    display: flex;
    align-items: center;
  }
  .list-wrapper {
    height: 300px;
    overflow-y: scroll;
    margin-left: -16px;
    position: relative;
  }
  .list-item {
    display: flex;
    justify-content: space-between;
    .list-content {
      flex-grow: 1;
    }
  }
`;

export {StyledMenuPicker};
