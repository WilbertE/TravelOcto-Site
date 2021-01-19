import styled from "styled-components";

const HeaderPrimitive = function ({height, ...props}) {
  return <header {...props}>{props.children}</header>;
};

const StyledHeader = styled(HeaderPrimitive)`
  position: relative;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 225px;
  max-height: 70vh;
  ${(props) => (props.height == "medium" ? "height: 340px; max-height: 70vh;" : "")};
  ${(props) => (props.height == "large" ? " height: 95vh !important; max-height: 95vh !important;" : "")};
  overflow: hidden;
  margin-bottom: 32px;

  @media screen and (min-width: 960px) {
    height: 325px;
    margin-bottom: 40px;
    ${(props) => (props.height == "medium" ? "height: 448px;" : "")};
  }

  @media screen and (min-width: 1280px) {
    height: 400px;
    margin-bottom: 48px;
    ${(props) => (props.height == "medium" ? "height: 640px;" : "")};
  }
  @media screen and (min-width: 1690px) {
    height: 500px;
    ${(props) => (props.height == "medium" ? "height: 840px;" : "")};
    margin-bottom: 56px;
  }

  &::after {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: block;
    background-color: #da4167;
    content: "";
    height: 8px;
    box-shadow: 0 0px 24px 16px rgba(0, 0, 0, 0.3);
    z-index: 3;
  }
  .header-content {
    text-align: center;
    position: relative;
    z-index: 1;
    color: #fff;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  }
  .header-title-divider {
    display: inline-block;
    position: relative;
    margin-bottom: 0.6em;
    &:before {
      display: block;
      content: "";
      width: 100%;
      border-bottom: solid 1px #fff;
      position: absolute;
      bottom: -1rem;
      @media screen and (min-width: 1280px) {
        bottom: -1.4rem;
      }
    }
  }
`;

export {StyledHeader};
