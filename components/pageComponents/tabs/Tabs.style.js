import styled from "styled-components";

const TabsPrimitive = function ({liveMode, ...props}) {
  if (liveMode != false) return <div {...props}>{props.children}</div>;
  return <div {...props}>{props.children}</div>;
};

const StyledTabs = styled(TabsPrimitive)`
  .tabpanel-cms {
    margin-top: -35px;
    padding-top: 35px;
    border: dashed 1px #e0e0e0;
    border-top: none;
  }
`;

export {StyledTabs};
