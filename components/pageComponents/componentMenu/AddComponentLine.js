import {useState} from "react";
import IconButton from "../../atoms/iconButton/IconButton";
import {StyledAddComponentLine} from "./AddComponentLine.style";
import ComponentChooser from "./ComponentChooser";

const AddComponentLine = function (props) {
  const [showToggleDialog, setShowToggleDialog] = useState(false);

  const toggleComponentDialog = () => setShowToggleDialog(!showToggleDialog);

  return (
    <>
      <StyledAddComponentLine {...props}>
        <IconButton onClick={toggleComponentDialog} className="add-component-button" color="white" small icon={["fal", "plus"]} />
      </StyledAddComponentLine>
      {showToggleDialog && <ComponentChooser parent={props.parent} component={props.component} location={props.location} onClose={toggleComponentDialog} />}
    </>
  );
};
export default AddComponentLine;
