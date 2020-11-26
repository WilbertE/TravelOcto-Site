import {StyledComponentSelectorBlock} from "./ComponentSelectorBlock.style";
import IconButton from "~/components/atoms/iconButton/IconButton";
import ComponentSelector from "./ComponentSelector";
import {useState} from "react";

const ComponentSelectorBlock = function (props) {
  const [openComponentSelector, setOpenComponentSelector] = useState(false);

  const handleOpenComponentToggle = () => setOpenComponentSelector(!openComponentSelector);

  const handleAddComponent = (index, component) => {
    handleOpenComponentToggle();
    props.onAddComponent(index, component);
  };

  return (
    <>
      <StyledComponentSelectorBlock onClick={handleOpenComponentToggle}>
        <IconButton className="iconButton" size="small" square icon={["fal", "map-marker-plus"]} />
      </StyledComponentSelectorBlock>
      {openComponentSelector && <ComponentSelector index={props.index} onAddComponent={handleAddComponent} onClose={handleOpenComponentToggle} />}
    </>
  );
};

export default ComponentSelectorBlock;
