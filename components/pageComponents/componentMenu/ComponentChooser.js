import {useRecoilState} from "recoil";
import Button from "~/components/atoms/button/Button";
import {addComponentState} from "~/components/organisms/PageEditor/componentAtoms";
import {StyledComponentChooser} from "./ComponentChooser.style";
import {v4 as guid} from "uuid";
import DialogContent from "~/components/atoms/dialog/DialogContent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {defaultHeaderProps} from "../header/defaultProps";
import {defaultContainerProps} from "../container/defaultProps";
import {defaultTitleProps} from "../title/defaultProps";
import {defaultGridProps} from "../grid/defaultProps";
import {defaultGridCellProps} from "../gridCell/defaultProps";
import {defaultGridCollectionCellProps} from "../gridCollectionCell/defaultProps";
import {defaultPhotoCardProps} from "../photoCard/defaultProps";
import {defaultParagraphProps} from "../paragraph/defaultProps";
import {defaultTagsProps} from "../tagExpander/defaultProps";

const ComponentChooser = function ({component, parent, location, ...props}) {
  const [updateComponent, setUpdateComponent] = useRecoilState(addComponentState);

  const handleAddComponent = (data) => {
    setUpdateComponent({
      location: location,
      referenceComponent: component,
      parentComponent: parent,
      addComponent: data,
    });
    props.onClose();
  };

  let buttons = [];

  const registerButton = function (icon, description, name, data) {
    buttons.push({
      icon: icon,
      description: description,
      data: {
        name: name,
        id: guid(),
        data: data,
        tags: [],
        children: [],
      },
    });
  };

  registerButton(["fal", "h-square"], "Header", "header", defaultHeaderProps);
  registerButton(["fal", "square"], "Container", "container", defaultContainerProps);
  registerButton(["fal", "heading"], "Titel", "title", defaultTitleProps);
  registerButton(["fal", "align-justify"], "Paragraaf", "paragraph", defaultParagraphProps);
  registerButton(["fal", "th-large"], "Grid", "grid", defaultGridProps);
  registerButton(["fal", "image-polaroid"], "Foto kaart", "photoCard", defaultPhotoCardProps);
  registerButton(["fal", "tags"], "Tag uitbreider", "tagExpander", defaultTagsProps);

  if (parent.name == "grid") {
    buttons = [];
    registerButton(["fal", "game-board-alt"], "Grid cell", "gridCell", defaultGridCellProps);
    registerButton(["fal", "bars"], "Collectie cell", "gridCollectionCell", defaultGridCollectionCellProps);
  }

  return (
    <StyledComponentChooser open={true} onClose={props.onClose} title="Kies een component">
      <DialogContent bottomMargin>
        <div className="buttonWrapper">
          {buttons.map((button, key) => {
            return (
              <Button key={key} variant="outlined" onClick={() => handleAddComponent(button.data)}>
                <FontAwesomeIcon className="icon" icon={button.icon} />
                <div className="label">{button.description}</div>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </StyledComponentChooser>
  );
};

export default ComponentChooser;
