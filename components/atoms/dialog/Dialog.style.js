import styled from "styled-components";
import {Dialog} from "@material-ui/core";

const DialogPrimitive = function ({disableCloseButton, title, ...props}) {
  return <Dialog {...props}>{props.children}</Dialog>;
};

const StyledDialog = styled(DialogPrimitive)`
  position: relative;

  .dialog-head button {
    position: relative;
    width: 40px;
    height: 40px;
    top: 8px;
    &:last-child {
      margin-right: 8px;
    }

    svg:not(:root).svg-inline--fa {
      width: 24px;
      height: 24px;
    }
  }
  .dialog-head {
    display: flex;
    justify-content: space-between;
  }
  .title {
    /* ${(props) => (props.disableCloseButton == null || props.disableCloseButton == false) && `margin-right: 2rem;`} */
  }
`;

export {StyledDialog};
