import styled from "styled-components";

const StyledConditionBlock = styled.div`
  background-color: transparent;
  border-radius: 5px;
  position: relative;
  margin-top: 20px;
  border: dashed 1px #e0e0e0;

  .condition-group:nth-child(2) > .condition:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:hover,
  &:focus {
    .condition-explainer {
      opacity: 1;
    }
    .condition {
      color: rgba(0, 0, 0, 0.87);
      &:before {
        background-color: rgba(0, 0, 0, 0.87);
      }
      &:after {
        border-color: rgba(0, 0, 0, 0.87);
      }
    }

    .condition-explainer-prefix {
      &:before {
        border-color: rgba(0, 0, 0, 0.87);
      }
      svg {
        color: rgba(0, 0, 0, 0.87);
      }
    }
  }

  .condition-explainer {
    position: absolute;
    opacity: 0;
    top: -28px;
    left: 50%;
    font-size: 0.75rem;
    background-color: #e0e0e0;
    padding: 0px 0px;
    line-height: 24px;
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    transform: translateX(-50%);
    > span {
      display: inline-block;
      margin: 2px 8px;
    }
  }

  .condition-or {
    display: block;
    position: relative;
    height: calc(1rem + 1px);
    &:before {
      display: flex;
      content: "";
      position: absolute;
      top: 0%;
      left: 10px;
      bottom: 0;
      z-index: 1;
      border-left: solid 1px #000;
    }
    &:after {
      position: absolute;
      content: "of";
      top: 1px;
      display: inline-block;
      background-color: #fff5eb;
      z-index: 2;
      border-radius: 2px;
      font-size: 0.65rem;
      line-height: 0.75rem;
      border: solid 1px #000;
      padding: 2px 3px 2px 2px;
      margin: 0px 2px;
    }
  }

  .condition {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    padding: 0 0px 0 24px;
    background-color: #f5f5f5;
    position: relative;
    color: #949494;
    .text-button {
      background: transparent;
      color: #413f3c;
      margin: 0;
      min-width: 0;
      padding: 0;
      width: 28px;
      height: 28px;
      border-radius: 3px;
      text-transform: lowercase;
      font-size: 0.6rem;
      line-height: calc(1.05rem - 1px);
      position: relative;
      &:before {
        content: "";
        display: block;
        border: solid 1px;
        position: absolute;
        border-radius: 3px;
        left: 4px;
        top: 4px;
        bottom: 4px;
        right: 4px;
      }

      &:hover,
      &:active {
        background-color: rgba(0, 0, 0, 0.04);
        box-shadow: none;
      }
    }

    &.condition-unspecified {
      color: red;
      .warning-icon {
        margin: 0 8px 0 0;
      }
    }

    &:before {
      display: block;
      position: absolute;
      content: "";
      width: 5px;
      height: 5px;
      background-color: #949494;
      border-radius: 50%;
      left: 8px;
      top: calc(50% - 3px);
    }
    &:after {
      display: flex;
      content: "";
      position: absolute;
      top: 50%;
      left: 10px;
      bottom: 0;
      border-left: solid 1px #949494;
    }
    &:nth-child(n + 2):after {
      top: 0;
    }
  }

  .condition-and {
    color: initial;
    margin: 0 0 0 5px;
  }

  .configurator {
    border: dashed 1px #000;
    background-color: #ffefde;
    padding: 8px 24px 0;
  }

  .condition-expander {
    position: relative;
    padding-left: 32px;
  }
  .condition-explainer-prefix {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &:before {
      display: flex;
      content: "";
      position: absolute;
      top: 0;
      left: 10px;
      bottom: calc(50% - 16px);
      border-left: solid 1px #949494;
    }
    svg {
      margin-top: 32px;
      width: 12px;
      position: relative;
      left: 2px;
      height: 12px;
      color: #949494;
    }
  }

  .condition-inside {
    padding: 32px 5px 5px 0px;
  }
`;

export {StyledConditionBlock};
