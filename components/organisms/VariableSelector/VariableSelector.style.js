import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledVariableSelector = styled(Dialog)`
  .MuiPaper-root {
    width: 80%;
    max-width: 1400px;
    height: 80vh;
  }

  .MuiGrid-container {
    height: 100%;
  }
  .item-selector {
    width: 350px;
    overflow-y: scroll;
    margin-right: 24px;
  }
  .variable-selector {
    flex-grow: 1;
    position: relative;
    height: 100%;
    width: calc(100% - 350px - 24px);
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
  .no-variables {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }
`;

export {StyledVariableSelector};
