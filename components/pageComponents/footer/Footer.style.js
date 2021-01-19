import styled from "styled-components";

const StyledFooter = styled.div`
  margin-top: 128px;
  border-top: solid 8px #da4167;
  background-color: #2d2d2d;
  color: #bfbfbf;
  font-size: 0.95rem;
  padding: 24px 0;
  display: flex;
  justify-content: center;

  @media screen and (max-weight: 960px) {
    font-size: 0.8rem;
  }

  .footer-container {
    flex-grow: 1;
  }

  .logo {
    max-height: 50px;
    max-width: 100%;
    margin-bottom: 8px;
  }

  .social-button {
    margin: 16px 8px;
    padding: 4px;
    background-color: #3c3c3c;
    color: #bfbfbf;
    &:first-child {
      margin-left: 0;
    }
  }

  .footer-title {
    font-weight: bold;
    color: #bfbfbf;
    font-weight: normal;
    margin-top: 8px;
    font-size: 1rem;
  }

  a:not(.social-button) {
    color: #bfbfbf;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    &:hover {
      text-decoration: underline;
    }
  }

  .footer-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export {StyledFooter};
