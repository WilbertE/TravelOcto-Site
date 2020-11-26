import styled from "styled-components";
import {List} from "@material-ui/core";

const ListPrimitive = function ({noPaddingTop, ...props}) {
  return <List {...props}>{props.children}</List>;
};

const StyledList = styled(ListPrimitive)`
  .list-icon {
    margin-right: 16px;
  }

  ${(props) => props.noPaddingTop && "padding-top: 0;"}
`;
export {StyledList};
