import styled from "styled-components";
import Dialog from "../atoms/dialog/Dialog";

const StyledConfigurable = styled.div`
  position: relative;
  border: solid 1px transparent;

  &:after {
    display: block;
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    border: solid 2px #323e7a;
    z-index: 99;
    pointer-events: none;
  }

  > .configurator-buttons,
  &:after {
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &.-hover {
    > .configurator-buttons,
    &:after {
      opacity: 1;
    }
  }
`;

const StyledConfiguratorOverlayButtons = styled.div`
  position: absolute;
  top: -37px;
  left: 16px;
  padding: 4px;
  z-index: 99;
  background-color: #323e7a;
  border: solid 1px #323e7a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  > .button {
    background: #fff;
    border: solid 1px #999999;
    margin: 0 4px;
    &:hover {
      background-color: #f5f5f5;
    }
  }
  &:hover {
    opacity: 1;
  }
`;

const DialogPrimitive = function ({preview, setWidth, ...props}) {
  return <Dialog {...props}>{props.children}</Dialog>;
};

const StyledComponentConfigurator = styled(DialogPrimitive)`
  .MuiPaper-root {
    width: 100%;
    min-width: ${(props) => (props.setWidth != null ? props.setWidth : 1200)}px;
    ${(props) => props.preview == false && props.setWidth == null && `min-width: 600px; max-width: 600px;`}
  }
  .frame-grid {
    /* min-height: 65vh; */
  }
`;

export {StyledConfigurable, StyledConfiguratorOverlayButtons, StyledComponentConfigurator};
