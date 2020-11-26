import styled from "styled-components";

const StyledListContainer = styled.div`
  margin: 0 -8px;

  ${(props) => props.relative && "position: relative;"}
`;

export {StyledListContainer};
