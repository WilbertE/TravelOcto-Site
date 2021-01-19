import styled from "styled-components";

const StyledIfBlockConfigurator = styled.div`
  .prefix-button {
    position: relative;
    top: 20px;
    left: 16px;
  }
  .condition-group {
    border: solid 1px #e0e0e0;
    padding: 16px;
    margin: 16px -8px -8px;
    border-radius: 5px;
  }
  .add-filter-button {
    width: 100%;
    position: relative;
    text-align: center;
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      border-top: solid 1px #e0e0e0;
    }
    .add-button {
      background: #fff;
      border: solid 1px #e0e0e0;
      &:hover {
        background-color: #e0e0e0;
      }
    }
  }
  .and-condition-group {
    width: 100%;
  }
  .and-condition-group .MuiGrid-root:last-child .MuiFormControl-root {
    //  margin-bottom: 0;
  }
  .and,
  .or {
    display: inline-block;
    font-size: 0.65em;
    left: 50%;
    position: relative;
    transform: translateX(-50%);
    background-color: #afedd9;
    border-radius: 3px;
    line-height: 1em;
    padding: 3px 5px;
    margin: 7px auto;
  }
`;

export {StyledIfBlockConfigurator};
