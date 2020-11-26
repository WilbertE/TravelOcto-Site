import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledPageTagsDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 1200px;
    max-width: 1200px;
    height: 80vh;
  }

  .MuiGrid-container {
    height: 100%;
  }
  .item-selector {
    width: 250px;
    overflow-y: scroll;
    margin-right: 24px;
    height: 100%;
    position: relative;
    padding-bottom: 75px;
    box-sizing: border-box;
    .button-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      background: #fff;
    }
  }
  .variable-selector {
    flex-grow: 1;
    position: relative;
    width: calc(100% - 250px - 24px);
  }
  .MuiTableHead-root .MuiTableCell-head {
    font-weight: bold;
  }
  .table-wrapper {
    height: 100%;
    overflow-y: scroll;

    .property {
      width: 300px;
      max-width: 300px;
    }
    .type {
      width: 50px;
      max-width: 50px;
    }
  }
`;

export {StyledPageTagsDialog};
