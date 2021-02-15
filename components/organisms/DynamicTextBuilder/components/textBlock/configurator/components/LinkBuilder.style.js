import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledLinkBuilder = styled(Dialog)`
  .MuiPaper-root {
    width: 500px;
  }

  .MuiCheckbox-colorSecondary.Mui-checked {
    color: #323e7a;
  }
`;

export {StyledLinkBuilder};
