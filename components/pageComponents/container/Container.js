import {Box} from "@material-ui/core";
import {useEffect, useState} from "react";
import BackgroundImage from "~/components/atoms/backgroundImage/BackgroundImage";
import Title from "~/components/atoms/title/Title";
import Configurable from "../Configurable";
import ContainerConfigurator from "./ContainerConfigurator";
import {StyledContainer} from "./Container.style";
import ComponentRender from "../ComponentRender";

const Container = function ({...props}) {
  if (props.liveMode == false) {
    return (
      <StyledContainer liveMode={props.liveMode}>
        <Configurable configurable={false} component={props.component} title="Container" configurator={<ContainerConfigurator />}>
          <Component {...props} />
        </Configurable>
      </StyledContainer>
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
      <StyledContainer liveMode={props.liveMode}>
        <ComponentRender parent={component} component={component.children} />
      </StyledContainer>
    );
  }
};

export default Container;
