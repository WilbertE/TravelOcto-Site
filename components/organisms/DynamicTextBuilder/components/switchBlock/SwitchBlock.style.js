import styled from "styled-components";

const StyledSwitchBlock = styled.span`
  background-color: #d7f5f2;
  border-radius: 0.1px;
  padding: 0;
  box-shadow: 0px 0px 0px 4px #d7f5f2;
  font-weight: normal;
  position: relative;
  margin: 0 4px;

  .synonymGroup:hover .synonymDropdown {
    display: none;
  }

  &:not(.editor-active):hover .switchDropdown {
    display: block;
  }

  .switchDropdown {
    position: absolute;
    background-color: #d7f5f2;
    left: -4px;
    left: -4px;
    min-width: 100%;
    top: 100%;
    border-radius: 3px;
    display: none;
  }
  .switch {
    display: block;
    font-size: 1em;
    line-height: 1.25rem;
    padding: 0px 5px;
  }

  &:before {
    display: block;
    content: "switch";
    position: absolute;
    line-height: 0.5rem;
    font-size: 0.55rem;
    left: 0;
    bottom: -13px;
    background-color: #d7f5f2;
    padding: 3px 3px;
    color: #6b6b6b;
  }

  > .textblock,
  .switch > .textblock {
    margin: 0px;
    white-space: nowrap;
    &:hover,
    &:active {
      background-color: transparent;
      box-shadow: none;
      &:before {
        display: none;
      }
    }
  }
`;

export {StyledSwitchBlock};
