import styled from "styled-components";
import ListContainer from "~/components/atoms/list/ListContainer";

const StyledListContainer = styled(ListContainer)`
  .list-item {
    display: flex;
    justify-content: space-between;
  }

  .list-item-start {
    flex-grow: 1;
  }

  .list-options {
    width: 30px;
    margin-left: 24px;
  }
`;

export {StyledListContainer};
