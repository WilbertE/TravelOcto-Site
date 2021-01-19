import {useEffect, useState} from "react";
import Configurable from "../Configurable";
import ImageConfigurator from "./ImageConfigurator";
import {StyledImage} from "./Image.style";
import BackgroundImage from "~/components/atoms/backgroundImage/BackgroundImage";

const Image = function (props) {
  if (props.liveMode == false) {
    return (
      <>
        <Configurable component={props.component} title="Afbeelding" configurator={<ImageConfigurator />}>
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
    <StyledImage {...data}>
      <BackgroundImage className="image" mode="image" alt={data.imageAlt} image={data.image} />
      {data.description && data.description != "" && <span className="description">{data.description}</span>}
    </StyledImage>
  );
};

export default Image;
