import Configurable from "../Configurable";
import {StyledGridCell} from "./GridCell.style";
import ComponentRender from "../ComponentRender";
import GridCellConfigurator from "./GridCellConfiguration";

const gridClass = function (data) {
  let gridClass = "grid-cell grid-cell-xs-" + data.sizeXs;
  gridClass += " grid-cell-sm-" + data.sizeSm;
  gridClass += " grid-cell-md-" + data.sizeMd;
  gridClass += " grid-cell-lg-" + data.sizeLg;
  gridClass += " grid-cell-xl-" + data.sizeXl;
  return gridClass;
};

const GridCell = function (props) {
  if (props.liveMode == false) {
    const data = props.component.data;
    return (
      <StyledGridCell className={gridClass(data)} liveMode={props.liveMode}>
        <Configurable preview={false} component={props.component} title="Grid cell" configurator={<GridCellConfigurator />}>
          <Component {...props} />
        </Configurable>
      </StyledGridCell>
    );
  } else {
    return <Component {...props} />;
  }
};

const Component = function ({component, ...props}) {
  const data = component.data;
  if (props.liveMode == false) {
    return <ComponentRender parent={component} component={component.children} />;
  } else {
    return (
      <StyledGridCell className={gridClass(data)} liveMode={props.liveMode}>
        <ComponentRender parent={component} component={component.children} />
      </StyledGridCell>
    );
  }
};

export default GridCell;
