import {DialogContent} from "@material-ui/core";
import styled from "styled-components";

const DialogContentPrimitive = function ({bottomMargin, ...props}) {
  return <DialogContent {...props}>{props.children}</DialogContent>;
};

const StyledDialogContent = styled(DialogContentPrimitive)`
  &:first-child {
    padding-top: 8px;
  }

  ${(props) => props.bottomMargin && "padding-bottom: 32px;"}
`;

export {StyledDialogContent};
