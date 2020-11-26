import styled, {css} from "styled-components";

const GridPrimitive = function ({spacing, noOverflow, liveMode, bottomMargin, ...props}) {
  return <div {...props}>{props.children}</div>;
};

const StyledGrid = styled(GridPrimitive)`
  width: 100%;
  position: relative;
  ${(props) =>
    props.liveMode != false &&
    `
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
  `}

  ${(props) => (!props.noOverflow ? `` : `border:dotted 1px #e0e0e0;`)}

  ${(props) => props.bottomMargin == 1 && `margin-bottom: 16px;`}
  ${(props) => props.bottomMargin == 2 && `margin-bottom: 24px;`}
  ${(props) => props.bottomMargin == 3 && `margin-bottom: 32px;`}
  ${(props) => props.bottomMargin == 4 && `margin-bottom: 48px;`}

  .configurator {
    border: none;
    &:hover > .configurable-inner > .add-component-line {
      opacity: 0.25;
    }
    > .configurable-inner > .add-component-line:hover {
      opacity: 1;
    }

    > .configurable-inner > .add-component-line {
      display: flex;
      margin-left: 4px;
      margin-right: 4px;
      align-items: center;

      &:before {
        content: "";
        display: block;
        position: absolute;
        top: -2px;
        bottom: -2px;
        left: 50%;
        right: initial;
        border-left: solid 1px #b8b8b8;
        border-top: none;
      }
    }
  }

  .grid {
    margin: 0;
  }
  @media screen and (min-width: 600px) {
    .grid {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
    }
  }

  .configurable-inner {
    padding: 16px 1px;
    display: flex;
    flex-wrap: wrap;
  }

  ${(props) =>
    [
      [0, "xs"],
      [600, "sm"],
      [960, "md"],
      [1280, "lg"],
      [1690, "xl"],
    ].map((size) => {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
        return `
        @media screen and (min-width:${size[0]}px){
          .grid-cell-${size[1]}-${i}{
            width: calc(${100 / (12 / i)}% ${props.liveMode == false ? ` - 38px` : ``});
            ${props.liveMode == false ? `.configurator{  box-sizing:border-box;}` : ``}
          }
          .configurable-inner .grid-cell-${size[1]}-${i}{
            width: calc(${100 / (12 / i)}% ${props.liveMode == false ? ` - 38px` : ``} - 36px);
          }
        }
      `;
      });
    })}

  ${(props) =>
    [
      [1, 2],
      [2, 4],
      [3, 8],
      [4, 12],
    ].map((item) => {
      if (props.spacing == item[0]) {
        return `
          .grid-cell { padding: ${item[1]}px;}
          .grid {margin:0 -${item[1]}px;}
          .configurable-inner{width: calc(100% - ${item[1]}px / 2);}
        `;
      }
    })}
`;

export {StyledGrid};
