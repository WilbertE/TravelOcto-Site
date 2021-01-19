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
    if (Array.isArray(image) && image.length > 1 && image[0].scrSet != null) {
      image = image.find((x) => x.orientation && x.orientation == "horizontal");
      if (image == null) image = image[0];
    }
    if (image.scrSet != null) {
      scrSet = image.scrSet;
      scr = image.url;
    } else if (typeof image == "object" && image != null) {
      scrSet = generateScrSet(TravelOctoBase, image);
      scr = TravelOctoBase + sortImagesBySize(image)[0].fileName;
    }
  } catch (ex) {}

  if (scrSet == "" && image != "" && image != null) {
    var regex = new RegExp(/(.*?)\ [0-9]*?w(,|$)/gi);
    var result = image.match(regex);
    if (result && result.length > 0) {
      scrSet = image;
      image = result[result.length - 1];
    }
  }

  let dynamic = false;
  if (typeof image == "string" && image.indexOf("{") > -1) {
    liveMode = false;
    dynamic = true;
  }

  if (typeof image == "string" && scrSet == "" && image.indexOf("{") == -1) {
    if (liveMode != false) scr = image;
    dynamic = true;
  }

  if (scr == "") scr = img;

  return (
    <StyledBackgroundImage {...props}>
      {liveMode == false && dynamic && <span className="image-tag">{image}</span>}
      {scrSet != "" && <source type="image/jpg" srcSet={scrSet} />}
      <img src={scr} alt={alt} referrerPolicy="no-referrer" />
    </StyledBackgroundImage>
  );
};

export default BackgroundImage;
