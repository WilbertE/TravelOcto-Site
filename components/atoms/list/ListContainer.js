import {StyledListContainer} from "./ListContainer.style";

const ListContainer = function (props) {
  return <StyledListContainer {...props}>{props.children}</StyledListContainer>;
};

export default ListContainer;
