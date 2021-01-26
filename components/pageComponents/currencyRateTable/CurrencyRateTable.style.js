import styled from "styled-components";

const StyledCurrencyRateTable = styled.div`
  .row {
    display: flex;
    max-width: 800px;
    margin: 0 auto;
    align-items: center;

    &:first-child {
      .eur {
        border-top: solid 1px #e5ecef;
        border-top-left-radius: 5px;
      }
      .value {
        border-top: solid 1px #e5ecef;
        border-top-right-radius: 5px;
      }
    }
    &:last-child {
      .eur {
        border-bottom-left-radius: 5px;
      }
      .value {
        border-bottom-right-radius: 5px;
      }
      .icon {
        border-bottom: none;
      }
    }

    .eur,
    .value {
      width: calc(50% - 24px);
      border: solid 1px #e5ecef;
      border-top: none;
      height: 2.35rem;
      display: flex;
      align-items: center;
    }

    .eur {
      justify-content: flex-end;
      padding-right: 2.35rem;
      border-right: none;
    }
    .value {
      justify-content: flex-start;
      padding-left: 2.35rem;
      border-left: none;
    }

    .icon {
      width: 48px;
      height: 2.35rem;
      justify-content: center;
      display: flex;
      align-items: center;
      background-color: #eec225;
      color: #fff;
      border-top: solid 1px #eec225;
      border-bottom: solid 1px #d6ad1f;
    }
  }
`;

export {StyledCurrencyRateTable};
