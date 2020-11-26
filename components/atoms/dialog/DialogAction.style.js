import styled from "styled-components";
import {DialogActions} from "@material-ui/core";

const DialogActionPrimitive = function (props) {
  return <DialogActions {...props}>{props.children}</DialogActions>;
};

const StyledDialogActions = styled(DialogActionPrimitive)`
  button {
    margin-top: 4px;
    margin-bottom: 8px;
  }
`;

export {StyledDialogActions};
