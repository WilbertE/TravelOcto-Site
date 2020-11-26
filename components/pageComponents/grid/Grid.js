import Configurable from "../Configurable";
import GridConfigurator from "./GridConfigurator";
import {StyledGrid, StyledGridContainer} from "./Grid.style";
import ComponentRender from "../ComponentRender";
import Container from "../container/Container";
import {StyledContainer} from "../container/Container.style";

const Grid = function (props) {
  if (props.component.data.isContainer) {
    return (
      <StyledContainer>
        <Component {...props} />
      </StyledContainer>
    );
  } else {
    return <Component {...props} />;
  }
};

const Component = function ({component, apiData, ...props}) {
  const data = component.data;

  if (props.liveMode == false) {
    return (
      <StyledGrid liveMode={false} noOverflow bottomMargin={data.bottomMargin} spacing={data.spacing}>
        <Configurable preview={false} component={component} title="Grid" configurator={<GridConfigurator />}>
          <div className="configurable-inner">
            <ComponentRender parent={component} component={component.children} />
          </div>
        </Configurable>
      </StyledGrid>
    );
  } else {
    return (
      <StyledGrid bottomMargin={data.bottomMargin} spacing={data.spacing}>
        <ComponentRender parent={component} component={component.children} apiData={apiData} />
      </StyledGrid>
    );
  }
};

export default Grid;
