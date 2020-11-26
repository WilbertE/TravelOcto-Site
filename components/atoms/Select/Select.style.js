import styled from "styled-components";
import {FormControl} from "@material-ui/core";

const StyledSelect = styled(FormControl)`
  width: 100%;
  margin-bottom: 16px;

  .MuiSelect-select:focus {
    background-color: transparent;
  }
`;

export default StyledSelect;
