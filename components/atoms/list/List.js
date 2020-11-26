import {StyledList} from "./List.style";

const List = function (props) {
  return <StyledList {...props}>{props.children}</StyledList>;
};

export default List;
