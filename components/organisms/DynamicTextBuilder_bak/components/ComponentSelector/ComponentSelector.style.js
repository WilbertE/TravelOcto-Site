import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledComponentSelector = styled(Dialog)`
  .MuiDialogContent-root {
    padding-top: 0;
  }

  .buttonWrapper {
    margin: -4px;
    margin-bottom: 8px;
    .MuiButtonBase-root {
      padding: 8px 8px;
      margin-top: 0;
      margin: 4px;
      width: calc(50% - 8px);
      box-sizing: border-box;
    }

    .MuiButton-label {
      display: flex;
      flex-direction: column;
    }

    .icon {
      width: 1.5rem;
      height: 1.5rem;
      display: block;
      margin: 0.3rem;
    }

    .label {
      text-transform: initial;
      font-weight: normal;
      margin: 5px 10px 0;
    }
  }
`;

export {StyledComponentSelector};
