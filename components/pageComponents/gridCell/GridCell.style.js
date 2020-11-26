import styled from "styled-components";
import {StyledContainer} from "../container/Container.style";

const GridCellPrimitive = function ({liveMode, ...props}) {
  return <div {...props}>{props.children}</div>;
};

const StyledGridCell = styled(GridCellPrimitive)`
  box-sizing: border-box;

  .configurator {
    &:after {
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
    }
    .configurator-buttons {
      top: -39px;
    }
    &:hover > .add-component-line {
      opacity: 0.25;
    }
    > .add-component-line:hover {
      opacity: 1;
    }
  }

  ${(props) => props.liveMode == false && `> .configurator { border:dotted 1px #e0e0e0;}`}
`;

export {StyledGridCell};
