import {StyledComponentSelector} from "./ComponentSelector.style";
import {DialogContent} from "@material-ui/core";
import Button from "~/components/atoms/button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {textblockData} from "./util/textblockData";

const ComponentSelector = function (props) {
  const handleAddTextBlock = () => props.onAddComponent(props.index, textblockData);

  return (
    <StyledComponentSelector title="Component toevoegen" open={true} onClose={props.onClose}>
      <DialogContent>
        <div className="buttonWrapper">
          <Button variant="outlined" onClick={handleAddTextBlock}>
            <FontAwesomeIcon className="icon" icon={["fal", "text-width"]} />
            <div className="label">Tekst blok</div>
          </Button>
          <Button variant="outlined" onClick={handleAddTextBlock}>
            <FontAwesomeIcon className="icon" icon={["fal", "code-branch"]} />
            <div className="label">Conditie</div>
          </Button>
        </div>
      </DialogContent>
    </StyledComponentSelector>
  );
};

export default ComponentSelector;
