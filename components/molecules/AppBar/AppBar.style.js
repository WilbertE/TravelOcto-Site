import styled from "styled-components";
import {AppBar} from "@material-ui/core";

const StyledAppBar = styled(AppBar)`
  flex-direction: row;
  justify-content: space-between;
  background: linear-gradient(114.66deg, #323e7a 0.96%, #712c69 94.05%);
  color: #fff;
  padding: 4px;
  position: relative;

  svg {
    color: #fff;
  }

  .appbar-start {
  }

  .appbar-title {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: -1;
  }
  .appbar-end {
  }
`;

export {StyledAppBar};
