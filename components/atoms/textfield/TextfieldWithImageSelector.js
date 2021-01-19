import ImageGallery from "~/components/organisms/ImageGallery/ImageGallery";
import TextFieldWithTag from "./TextFieldWithTag";
import {useRef, useState} from "react";
import BackgroundImage from "../backgroundImage/BackgroundImage";
import {Grid} from "@material-ui/core";
import {StyledTextBlockConfigurator} from "~/components/organisms/DynamicTextBuilder/components/textBlock/configurator/TextBlockConfigurator.style";
import {StyledTextfieldWithImageSelector} from "./TextfieldWithImageSelector.style";
import IconButton from "../iconButton/IconButton";
import VariableSelector from "~/components/organisms/VariableSelector/VariableSelector";

const TextfieldWithImageSelector = function (props) {
  const [openImageGallery, setImageGallery] = useState(false);
  const [showVariableDialog, setShowVariableDialog] = useState(false);
  const toggleVariableDialog = () => setShowVariableDialog(!showVariableDialog);

  const toggleImageGallery = (e) => {
    if (e != null && e.target.classList.contains("iconButton")) return;
    setImageGallery(!openImageGallery);
    if (e) e.target.blur();
  };

  const handleVariableSelect = (data) => {
    props.onChange({target: {name: props.name, value: "{" + data + "}"}});
    setShowVariableDialog(false);
  };

  const handleSelectImage = (image) => {
    if (Array.isArray(image)) {
      props.onChange({target: {name: props.name, value: JSON.stringify(image)}});
    }
  };

  return (
    <>
      <StyledTextfieldWithImageSelector container>
        <div className="image-picker">
          <div className="image-label">{props.label}</div>
          <div className="image-wrapper">
            <div className={"buttons " + (props.value != "" ? "buttons-hidden" : "")}>
              <IconButton icon={["fal", "images"]} onClick={toggleImageGallery} />
              <IconButton icon={["fal", "tag"]} onClick={toggleVariableDialog} />
            </div>
            <BackgroundImage image={props.value} />
          </div>
        </div>
        <div className="form">
          {props.altLabel && (
            <TextFieldWithTag
              allowed={["string", "imageSet"]}
              tags={props.tags}
              onChange={props.onChange}
              label={props.altLabel}
              value={props.altValue}
              name={props.altName}
            />
          )}
        </div>
      </StyledTextfieldWithImageSelector>
      {showVariableDialog && (
        <VariableSelector allowed={["string", "imageSet"]} tags={props.tags} onSelect={handleVariableSelect} onClose={toggleVariableDialog} />
      )}
      {openImageGallery && <ImageGallery onClose={toggleImageGallery} onSelect={handleSelectImage} />}
    </>
  );
};

export default TextfieldWithImageSelector;
