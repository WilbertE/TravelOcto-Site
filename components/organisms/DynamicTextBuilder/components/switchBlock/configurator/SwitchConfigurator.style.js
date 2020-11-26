import styled from "styled-components";

const StyledSwitchConfigurator = styled.div`
  background-color: #d7f5f2;
  border-radius: 5px;
  padding: 16px 8px 8px;
  margin-bottom: 16px;
  position: relative;
  margin-top: 16px;

  .switch-content-wrapper {
    display: flex;
    align-items: center;
    .iconButton {
      margin-left: 8px;
    }
  }

  .switch-content {
    flex-grow: 1;
    border: dashed 1px #b8b8b8;
    padding: 10px;
    border-radius: 5px;
    .preview.editor-active + div {
      margin-bottom: 0;
    }
  }

  .tools {
    display: flex;
    justify-content: space-between;
    .save {
    color: green;
    margin-right: 0;
  }
  }
`;

export {StyledSwitchConfigurator};
