import styled from "styled-components";
import {FormControl, TextField} from "@material-ui/core";

const StyledTextBox = styled.div`
  position: relative;
  margin-bottom: 16px;
  .textarea {
    width: 100%;
  }

  .adornment-button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
  }
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 16px;
`;

export {StyledFormControl, StyledTextBox};
