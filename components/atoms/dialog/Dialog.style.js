import styled from "styled-components";
import {Dialog} from "@material-ui/core";

const DialogPrimitive = function ({disableCloseButton, title, ...props}) {
  return <Dialog {...props}>{props.children}</Dialog>;
};

const StyledDialog = styled(DialogPrimitive)`
  position: relative;
  .close-button {
    position: absolute;
    right: 8px;
    width: 40px;
    height: 40px;
    top: 8px;

    svg:not(:root).svg-inline--fa {
      width: 24px;
      height: 24px;
    }
  }
  .title {
    ${(props) => (props.disableCloseButton == null || props.disableCloseButton == false) && `margin-right: 2rem;`}
  }
`;

export {StyledDialog};
