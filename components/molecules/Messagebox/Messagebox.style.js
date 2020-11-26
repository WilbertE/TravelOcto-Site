import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    min-width: 400px;
  }

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
`;

export default StyledDialog;
