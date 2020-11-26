import styled from "styled-components";

const StyledRenderLineGroup = styled.div`
  display: block;
  position: relative;

  border-radius: 5px;
  padding: 24px 12px 16px;
  border: dashed 1px transparent;
  border: dashed 1px #e0e0e0;

  .group-explainer {
    position: absolute;
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
    span {
      margin: 0 8px;
    }
  }
  .group-deleter {
    position: absolute;
    top: -28px;
    right: 0;
    background-color: #e0e0e0;
    padding: 0px 0px;
    line-height: 24px;
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:hover .group-explainer,
  &:hover .group-deleter {
    opacity: 1;
    pointer-events: all;
  }

  .group-explainer,
  .group-deleter {
    opacity: 0;
  }
`;

export {StyledRenderLineGroup};
