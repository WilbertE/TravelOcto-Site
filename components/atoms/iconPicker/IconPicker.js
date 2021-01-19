import {useState} from "react";
import IconGallery from "~/components/organisms/IconGallery/IconGallery";
import {StyledIconPicker} from "./IconPicker.style";

const IconPicker = function (props) {
  const [showIconGallery, setShowIconGallery] = useState(false);

  const handleIconSelect = (icon) => {
    props.onChange({
      target: {
        name: props.name,
        value: icon,
      },
    });
    setShowIconGallery(false);
  };

  return (
    <>
      <StyledIconPicker icon={props.value} onClick={() => setShowIconGallery(true)} />
      {showIconGallery && <IconGallery onSelect={handleIconSelect} onClose={() => setShowIconGallery(false)} />}
    </>
  );
};

export default IconPicker;
