import {Box} from "@material-ui/core";
import {useEffect, useState} from "react";
import Configurable from "../Configurable";
import TitleConfigurator from "./TitleConfigurator";
import {StyledTitle} from "./Title.style";
import {parseTags} from "~/util/parseTags";

const Title = function (props) {
  if (props.liveMode == false) {
    return (
      <>
        <Configurable component={props.component} title="Titel" configurator={<TitleConfigurator />}>
          <Component {...props} />
        </Configurable>
      </>
    );
  } else {
    return <Component {...props} />;
  }
};

const Component = function ({component, ...props}) {
  const data = component.data;

  return (
    <StyledTitle alignment={data.alignment} underline={data.underline} variant={data.titleVariant} component={data.titleComponent}>
      {props.liveMode == false ? data.title : parseTags(props.pageData, data.title)}
    </StyledTitle>
  );
};

export default Title;
