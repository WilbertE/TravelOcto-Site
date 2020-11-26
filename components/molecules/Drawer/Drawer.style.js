import styled from "styled-components";
import {Drawer} from "@material-ui/core";

const StyledDrawer = styled(Drawer)`
  min-width: 240px;
  max-width: 240px;
  > .MuiPaper-root {
    min-width: 240px;
    max-width: 240px;
  }

  &.mobile-drawer {
    min-width: 100%;
    > .MuiPaper-root {
      min-width: 100%;
    }
  }

  .drawer-head {
    border-radius: 0;
    padding: 4px;
    display: flex;
    justify-content: flex-end;
  }

  .logo {
    height: 1.7rem;
    margin: 0.25rem auto;
    display: block;
  }

  .close-button {
    position: absolute;
  }
`;

export {StyledDrawer};
