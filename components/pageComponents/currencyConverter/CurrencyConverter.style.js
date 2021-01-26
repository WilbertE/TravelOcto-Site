import styled from "styled-components";

const StyledCurrencyConverter = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;

  ${(props) => props.reverse && `flex-direction: row-reverse;`}

  .MuiFormControl-root {
    border: solid 1px #e5ecef;
    border-radius: 5px;
    padding: 5px 16px;
    label {
      top: 5px;
      left: 16px;
    }
    .MuiInput-underline:before,
    .MuiInput-underline:after {
      display: none;
    }
  }

  .button {
    width: 48px;
    height: 48px;
    margin: 8px 24px;
  }

  @media screen and (max-width: 960px) {
    .button {
      width: 48px;
      height: 48px;
      margin: 8px 16px;
    }
  }
  @media screen and (max-width: 600px) {
    .button {
      width: 48px;
      height: 48px;
      margin: 2px 4px;
    }

    .MuiFormControl-root {
      padding: 5px 16px 4px;
      label {
        top: 10px;
        left: 16px;
      }
    }
  }
`;

export {StyledCurrencyConverter};
