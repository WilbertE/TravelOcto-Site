import styled from "styled-components";

const ContainerPrimitive = function ({liveMode, ...props}) {
  return <div {...props}>{props.children}</div>;
};

const StyledContainer = styled(ContainerPrimitive)`
  > .configurator {
    margin-left: -16px;
    margin-right: -16px;

    .configurator-buttons {
      top: -39px;
    }
    &:after {
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
    }
  }

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;

  @media screen and (min-width: 600px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media screen and (min-width: 960px) {
    padding-left: 32px;
    padding-right: 32px;
  }
  ${(props) => props.liveMode == false && `border:dotted 1px #e0e0e0;`}
`;

export {StyledContainer};
