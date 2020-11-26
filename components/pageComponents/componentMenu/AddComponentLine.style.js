import styled from "styled-components";

const StyledAddComponentLine = styled.div`
  position: relative;
  margin: 8px 0;
  text-align: center;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 50%;

    border-top: solid 1px #b8b8b8;
  }
`;

export {StyledAddComponentLine};
