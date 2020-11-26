import BackgroundImage from "~/components/atoms/backgroundImage/BackgroundImage";
import Configurable from "../Configurable";
import {StyledPhotoCard} from "./PhotoCard.style";
import PhotoCardConfigurator from "./photoCardConfigurator";
import Title from "~/components/atoms/title/Title";
import Text from "~/components/atoms/text/Text";
import {Grid} from "@material-ui/core";

const PhotoCard = function (props) {
  if (props.liveMode == false) {
    return (
      <>
        <Configurable component={props.component} title="Foto kaart" configurator={<PhotoCardConfigurator />}>
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
    <StyledPhotoCard liveMode={props.liveMode} href={data.linkHref} target={data.linkTarget} title={data.linkTitle}>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={12}>
          <div className="photo-card-image-wrapper">
            <BackgroundImage liveMode={props.liveMode} alt={data.imageAlt} image={data.image} />
          </div>
        </Grid>
        {(data.title || data.description) && (
          <Grid item xs={8} sm={12}>
            <div className="photo-card-content">
              {data.title && (
                <Title component={data.titleComponent} variant={data.titleVariant} className="photo-card-title">
                  {data.title}
                </Title>
              )}
              {data.description && (
                <Text noMarginBottom lines={3}>
                  {data.description}
                </Text>
              )}
            </div>
          </Grid>
        )}
      </Grid>
    </StyledPhotoCard>
  );
};

export default PhotoCard;
