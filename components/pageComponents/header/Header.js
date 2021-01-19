import BackgroundImage from "~/components/atoms/backgroundImage/BackgroundImage";
import Title from "~/components/atoms/title/Title";
import Configurable from "../Configurable";
import HeaderConfigurator from "./HeaderConfigurator";
import {StyledHeader} from "./Header.style";

const Header = function ({liveMode, ...props}) {
  if (liveMode == false) {
    return (
      <>
        <Configurable component={props.component} title="Header" configurator={<HeaderConfigurator />}>
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
    <StyledHeader height={data.height}>
      <BackgroundImage data-parallax="17" alt={data.backgroundImageAlt} image={data.backgroundImage} />
      <div className="header-content" data-parallax="15">
        <Title component={data.titleComponent} variant={data.titleVariant} className={"header-title " + (data.subtitle != "" ? "header-title-divider" : "")}>
          {data.title}
        </Title>
        <Title component={data.subtitleComponent} variant={data.subtitleVariant} className="header-title">
          {data.subtitle}
        </Title>
      </div>
    </StyledHeader>
  );
};

export default Header;
