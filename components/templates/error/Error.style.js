import styled from "styled-components";

export const StyledErrorTemplate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;

  .logo {
    max-width: 100%;
    display: block;
    margin-bottom: ${(props) => props.theme.margin * 10}px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  .content {
    max-width: 600px;
  }
`;
