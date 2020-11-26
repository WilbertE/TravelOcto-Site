import styled from "styled-components";

export default styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.75);
  display: flex;
  vertical-align: center;
  align-items: center;
  justify-content: center;

  .indicator {
    width: 24px !important;
    height: 24px !important;
  }
`;
