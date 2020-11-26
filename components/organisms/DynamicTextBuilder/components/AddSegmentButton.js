import {useState} from "react";
import SegmentChooser from "./SegmentChooser";
import {StyledAddSegmentButton} from "./AddSegmentButton.style";

const AddSegmentButton = function (props) {
  const [openSegmentPicker, setOpenSegmentPicker] = useState(false);
  const handleSegmentPicker = () => setOpenSegmentPicker(!openSegmentPicker);

  return (
    <>
      <StyledAddSegmentButton className={openSegmentPicker && "highlight"} onClick={handleSegmentPicker} square small icon={props.icon} />
      {openSegmentPicker && (
        <SegmentChooser
          onClose={handleSegmentPicker}
          isWrapper={props.isWrapper}
          parentId={props.parentId}
          segmentId={props.segmentId}
          location={props.location}
        />
      )}
    </>
  );
};

export default AddSegmentButton;
