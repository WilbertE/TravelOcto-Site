import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledTagsDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 1200px;
    max-width: 1200px;
    height: 80vh;
  }

  .MuiGrid-container {
    height: 100%;
  }
  .item-selector {
    width: 425px;
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
  .delete-button {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .list-item {
    padding-right: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  .variable-selector {
    flex-grow: 1;
    position: relative;
    height: 100%;
    width: calc(100% - 425px - 24px);
  }
  .MuiTableHead-root .MuiTableCell-head {
    font-weight: bold;
  }
  .table-wrapper {
    height: 100%;
    overflow-y: scroll;
    > table {
      table-layout: fixed;
    }
    .property {
      width: 200px;
      max-width: 200px;
    }
    .type {
      width: 50px;
      max-width: 50px;
    }
    .value {
      overflow-wrap: break-word;
    }
  }
`;

export {StyledTagsDialog};
