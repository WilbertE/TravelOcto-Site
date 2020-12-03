import {StyledBackgroundImage} from "./BackgroundImage.style";
import Api, {TravelOctoBase} from "~/util/api";
import {generateScrSet, sortImagesBySize} from "~/components/organisms/PageEditor/components/util/imageHelper";
import {faBars} from "@fortawesome/pro-light-svg-icons";

const BackgroundImage = function ({image, alt, liveMode, ...props}) {
  const img = require("~/assets/images/placeholder.jpg").default;
  if (!alt) alt = "";

  let scrSet = "";
  let scr = img;

  try {
    image = JSON.parse(image);
    if (typeof image == "object" && image != null) {
      scrSet = generateScrSet(TravelOctoBase, image);
      scr = TravelOctoBase + sortImagesBySize(image)[0].fileName;
    }
  } catch (ex) {}

  let dynamic = false;
  if (image.indexOf("{") > -1) {
    liveMode = false;
    dynamic = true;
  }

  if (typeof image == "string" && scrSet == "" && image.indexOf("{") == -1) {
    if (liveMode != false) scr = image;
    dynamic = true;
  }

  return (
    <StyledBackgroundImage {...props}>
      {liveMode == false && dynamic && <span className="image-tag">{image}</span>}
      <source type="image/jpg" srcSet={scrSet} />
      <img src={scr} alt={alt} referrerPolicy="no-referrer" />
    </StyledBackgroundImage>
  );
};

export default BackgroundImage;
