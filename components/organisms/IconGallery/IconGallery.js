import DialogContent from "~/components/atoms/dialog/DialogContent";
import IconButton from "~/components/atoms/iconButton/IconButton";
import {StyledIconGallery} from "./IconGallery.style";

const IconGallery = function (props) {
  const icons = [
    ["fal", "search"],
    ["fal", "times"],
    ["fal", "plus-circle"],
    ["fal", "file"],
    ["fal", "tag"],
    ["fal", "file-import"],
    ["fal", "trash-alt"],
    ["fal", "file-code"],
    ["fal", "sliders-h"],
    ["fal", "save"],
    ["fal", "arrow-up"],
    ["fal", "arrow-down"],
    ["fal", "info-circle"],
    ["fal", "sun-cloud"],
    ["fal", "first-aid"],
    ["fal", "money-bill-wave"],
    ["fal", "coins"],
    ["fal", "plug"],
    ["fal", "glass"],
    ["fal", "cars"],
    ["fal", "flag"],
    ["fal", "arrow-left"],
    ["fal", "link"],
  ];

  return (
    <StyledIconGallery title="Icoonen" onClose={props.onClose} open={true}>
      <DialogContent bottomMargin>
        <div className="icon-collection">
          {icons.map((icon, index) => {
            return <IconButton onClick={() => props.onSelect(icon)} className="icon-button" key={index} icon={icon} />;
          })}
        </div>
      </DialogContent>
    </StyledIconGallery>
  );
};

export default IconGallery;
