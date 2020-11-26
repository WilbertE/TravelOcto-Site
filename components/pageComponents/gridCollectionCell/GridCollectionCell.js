import Configurable from "../Configurable";
import ComponentRender from "../ComponentRender";
import GridCollectionCellConfigurator from "./GridCollectionCellConfigurator";
import {StyledGridCell} from "../gridCell/GridCell.style";
import {StyledGridCollectionCell} from "./GridCollectionCell.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ComponentSelector from "~/components/organisms/DynamicTextBuilder_bak/components/ComponentSelector/ComponentSelector";
import {retrieveJsonProperty} from "~/util/retrieveJsonProperty";

const gridClass = function (data) {
  let gridClass = "grid-cell grid-cell-xs-" + data.sizeXs;
  gridClass += " grid-cell-sm-" + data.sizeSm;
  gridClass += " grid-cell-md-" + data.sizeMd;
  gridClass += " grid-cell-lg-" + data.sizeLg;
  gridClass += " grid-cell-xl-" + data.sizeXl;
  return gridClass;
};

const GridCollectionCell = function (props) {
  if (props.liveMode == false) {
    const data = props.component.data;

    if (props.component.data.array) {
      const array = props.component.data.array.replace("{", "").replace("}", "");
      if (props.component.tags.filter((x) => x.name == array + "[]").length == 0) {
        props.component.tags.push({
          customInput: "",
          input: "",
          name: array + "[]",
        });
      }
    }

    return (
      <StyledGridCollectionCell className={gridClass(data)} liveMode={props.liveMode}>
        <Configurable setWidth={1100} preview={false} component={props.component} title="Grid collectie cell" configurator={<GridCollectionCellConfigurator />}>
          <div className={"tag " + (props.component.data.array == "" ? "tag-error" : "")}>
            {props.component.data.array == "" ? (
              <>
                <FontAwesomeIcon className="no-array-icon" icon={["fas", "exclamation-triangle"]} />
                Niet ingesteld
              </>
            ) : (
              props.component.data.array
            )}
          </div>
          <Component {...props} />
        </Configurable>
      </StyledGridCollectionCell>
    );
  } else {
    return <Component {...props} />;
  }
};

const Component = function ({component, apiData, ...props}) {
  const data = component.data;

  if (props.liveMode == false) {
    return <ComponentRender parent={component} component={component.children} />;
  } else {
    return (
      <>
        {component.children.map((child, key) => {
          return (
            <StyledGridCell key={key} className={gridClass(data)} liveMode={props.liveMode}>
              {child.map((childComponent, childKey) => {
                return <ComponentRender key={childKey} parent={component} apiData={apiData} component={childComponent} />;
              })}
            </StyledGridCell>
          );
        })}
      </>
    );
  }
};

export default GridCollectionCell;
