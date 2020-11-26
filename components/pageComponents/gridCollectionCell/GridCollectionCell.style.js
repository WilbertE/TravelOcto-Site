import styled from "styled-components";
import {StyledContainer} from "../container/Container.style";
import {StyledGridCell} from "../gridCell/GridCell.style";

const GridCollectionCellPrimitive = function ({...props}) {
  return <StyledGridCell {...props}>{props.children}</StyledGridCell>;
};

const StyledGridCollectionCell = styled(GridCollectionCellPrimitive)`
  .tag {
    font-size: 0.7em;
    background-color: #009488;
    color: #fff;
    padding: 0px 4px;
    border-radius: 3px;
    line-height: 1.15rem;
    left: 50%;
    position: absolute;
    top: -11px;
    letter-spacing: 0.5px;
    transform: translateX(-50%);
  }
  .no-array-icon {
    margin-right: 10px;
  }
  .tag-error {
    background: red;
  }
`;

export {StyledGridCollectionCell};
