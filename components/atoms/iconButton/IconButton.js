import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {StyledIconButton} from "./IconButton.style";

const IconButton = function ({icon, ...props}) {
  return (
    <StyledIconButton className="iconButton" {...props}>
      <FontAwesomeIcon icon={icon} />
    </StyledIconButton>
  );
};

export default IconButton;
