import styled from "styled-components";

const StyledTextBlock = styled.span`
  display: inline;
  position: relative;
  border-radius: 0.1px;
  outline: none;
  cursor: pointer;
  line-height: 1.75rem;
  margin: 0 3px;

  &:hover,
  &:focus {
    background-color: #f2f2f2;
    box-shadow: 0px 0px 0px 5px #f2f2f2;
    &::before {
      opacity: 1;
    }
  }

  &.editor-active {
    display: block;
    background-color: #e0e0e0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 0;
    margin-top: 16px;
    padding: 24px 8px 16px;
    cursor: default;
    box-shadow: none !important;
    &:before {
      background-color: #e0e0e0;
      opacity: 1;
      top: -14px;
    }
  }

  &::before {
    opacity: 0;
    pointer-events: none;
    content: "tekst";
    display: inline-block;
    position: absolute;
    top: -20px;
    padding: 3px 8px;
    line-height: 0.5rem;
    font-size: 0.55rem;
    background-color: #f2f2f2;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .tag {
    background-color: #c8d0f7;
    border-radius: 3px;
    padding: 2px 5px;
    font-weight: normal;
    position: relative;
    &:before {
      display: block;
      content: "variabele";
      position: absolute;
      line-height: 0.5rem;
      font-size: 0.55rem;
      left: 0;
      bottom: -13px;
      background-color: #c8d0f7;
      padding: 3px 3px;
      color: #6b6b6b;
    }
  }

  .numeric-tag {
    background-color: #c8e9f7;
    border-radius: 3px;
    padding: 2px 5px;
    font-weight: normal;
    position: relative;
    &:before {
      display: block;
      content: "nr variabele";
      position: absolute;
      line-height: 0.5rem;
      font-size: 0.55rem;
      left: 0;
      bottom: -13px;
      background-color: #c8e9f7;
      padding: 3px 3px;
      color: #6b6b6b;
    }
  }

  .synonymGroup {
    background-color: #f7d9ab;
    white-space: nowrap;
    border-radius: 3px;
    padding: 2px 5px;
    font-weight: normal;
    position: relative;
    display: inline;

    &:before {
      display: block;
      content: "synonym";
      position: absolute;
      line-height: 0.5rem;
      font-size: 0.55rem;
      left: 0;
      bottom: -13px;
      background-color: #f7d9ab;
      padding: 3px 3px;
      color: #6b6b6b;
    }

    &:hover .synonymDropdown {
      display: block;
    }

    .synonymDropdown {
      position: absolute;
      background-color: #f7d9ab;
      left: 0;
      right: 0;
      top: 100%;
      border-radius: 3px;
      display: none;
    }
    .synonym {
      display: block;
      line-height: 1.25rem;
      padding: 0px 5px;
    }
  }
`;

export {StyledTextBlock};
