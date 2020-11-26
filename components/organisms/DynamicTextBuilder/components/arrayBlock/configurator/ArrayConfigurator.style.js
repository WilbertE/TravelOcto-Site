import styled from "styled-components";

const StyledArrayConfigurator = styled.div`
  background-color: #e0e0e0;
  padding: 16px 8px 8px;
  margin-bottom: 16px;
  position: relative;
  &:before {
    display: block;
    content: "";
    position: absolute;
    top: 4px;
    left: 8px;
    right: 8px;
    border-top: solid 1px #fff;
  }
  .MuiFormLabel-root.Mui-focused {
    color: rgba(0, 0, 0, 0.87);
  }

  .input-wrapper {
    background: #fff;
    border-radius: 3px;
    padding: 3px 8px 0;
    margin-bottom: 8px;
    .MuiFormControl-root {
      margin-bottom: 0;
    }
    input {
      color: rgba(0, 0, 0, 0.87);
    }
    .MuiInput-underline:after,
    .MuiInput-underline:before {
      display: none;
    }
  }

  .tools {
    display: flex;
    justify-content: space-between;
  }

  .save {
    color: green;
    margin-right: 0;
  }
`;

export {StyledArrayConfigurator};
