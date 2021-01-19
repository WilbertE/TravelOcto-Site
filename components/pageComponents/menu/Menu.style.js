import {List} from "@material-ui/core";
import styled from "styled-components";

const StyledMenu = styled(List)`
  border-bottom: solid 1px #e5ecef;
  margin-bottom: 42px;
  position: relative;
  .menu-button {
    flex-direction: column;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 5px;
    transition: color 0.15s ease;
    white-space: nowrap;
    text-align: center;
    font-size: 1.05rem;
    width: auto;
    display: inline-block;
    padding: 8px 16px;

    .menu-icon {
      margin-bottom: 8px;
    }
    &:hover {
      color: #da4167;
      background-color: transparent;
    }
  }

  .creating-menu {
    text-align: center;
    color: red;
  }
`;

export {StyledMenu};
