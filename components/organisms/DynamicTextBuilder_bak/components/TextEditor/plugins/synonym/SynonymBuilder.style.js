import styled, {keyframes} from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";
const highlight = keyframes`
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
`;

const StyledSynonymBuilder = styled(Dialog)`
  display: none;

  .MuiPaper-root {
    width: 500px;
  }
  #template {
    display: none;
  }

  &.open {
    display: block;
  }
  .deleteButton {
  }

  .table-row {
    position: relative;
    display: block;
  }
  .table-row.highlight:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
    background-color: #c8d0f7;
    animation: ${highlight} 1s infinite;
  }

  .table-cell {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    padding-right: 0;
    align-items: center;
  }

  .tableWrapper {
    height: 12rem;
    overflow-x: none;
    overflow-y: scroll;
    border-bottom: solid 1px #e0e0e0;
    margin-bottom: 24px;
    padding-right: 16px;
  }

  .add-synonym-form {
    display: flex;
    align-items: center;
  }
`;

export {StyledSynonymBuilder};
