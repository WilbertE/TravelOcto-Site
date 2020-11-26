import {TableRow} from "@material-ui/core";
import styled from "styled-components";

const StyledVariableRow = styled(TableRow)`
  &:not(.readonly) {
    cursor: pointer;
    &:hover td {
      background-color: #f0f2ff;
    }
  }
  .value {
    white-space: pre-wrap;
  }
  &.unselectable {
    opacity: 0.5;
  }
`;

export {StyledVariableRow};
