import styled from "styled-components";

const StyledCmsPage = styled.div`
  height: 100%;
  display: flex;

  .main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background: #f9f9f9;
  }

  .content {
    margin: 16px;
    height: calc(100% - 32px - 40px);
    border: solid 1px #e0e0e0;
    border-radius: 5px;
    background: #fff;
    padding: 16px;
    box-sizing: border-box;
  }
`;

export {StyledCmsPage};
