import styled from "styled-components";

const StyledArrayBlock = styled.span`
  display: inline-block;
  position: relative;
  border-radius: 0.1px;
  outline: none;
  cursor: pointer;
  line-height: 1.75rem;
  margin: 0 3px;

  &.editor-active {
    display: block;
    background-color: #e0e0e0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 16px 0 0 0;
    padding: 24px 8px 16px;
    cursor: default;
    box-shadow: none !important;
    &::before {
      opacity: 1;
      top: -14px;
    }
  }

  .array {
    background-color: #f2c8f7;
    border-radius: 3px;
    padding: 2px 5px;
    font-weight: normal;
    position: relative;
    &:before {
      display: block;
      content: "array";
      position: absolute;
      line-height: 0.5rem;
      font-size: 0.55rem;
      left: 0;
      bottom: -13px;
      background-color: #f2c8f7;
      padding: 3px 3px;
      color: #6b6b6b;
    }
  }

  .prefixGroup,
  .suffixGroup {
    background-color: #f7c8e4;
    border-radius: 3px;
    padding: 2px 5px;
    font-weight: normal;
    position: relative;
    display: inline;

    &:before {
      display: block;
      content: "array voorvoegsel";
      white-space: nowrap;
      position: absolute;
      line-height: 0.5rem;
      font-size: 0.55rem;
      left: 0;
      bottom: -13px;
      background-color: #f7c8e4;
      padding: 3px 3px;
      color: #6b6b6b;
    }

    &:hover .prefixDropdown,
    &:hover .suffixDropdown {
      display: block;
    }

    .prefixDropdown,
    .suffixDropdown {
      position: absolute;
      z-index: 6;
      background-color: #f7c8e4;
      left: 0;
      right: 0;
      top: 100%;
      border-radius: 3px;
      display: none;
    }
    .prefix,
    .suffix {
      display: block;
      line-height: 1.25rem;
      padding: 0px 5px;
    }
  }
  .suffixGroup:before {
    content: "array achtervoegsel";
  }
`;

export {StyledArrayBlock};
