import {useEffect, useRef, useState} from "react";
import TextBlockConfigurator from "./configurator/TextBlockConfigurator";
const {StyledTextBlock} = require("./TextBlock.style");
import {v4 as guid} from "uuid";
import {useRecoilState} from "recoil";
import {configuratorState} from "../../atoms";
import {dataFormatter} from "./util/dataFormatter";

const TextBlock = function (props) {
  const [editMode, setEditMode] = useState(false);
  const [openConfiguratorId, setOpenConfiguratorId] = useRecoilState(configuratorState);
  const [id, setId] = useState(null);

  const enableEditMode = () => {
    setEditMode(true);
    setOpenConfiguratorId(id);
  };
  const disableEditMode = () => {
    setEditMode(false);
  };

  useEffect(() => {
    setId(guid());
  }, []);

  useEffect(() => {
    if (openConfiguratorId != id) disableEditMode();
  }, [openConfiguratorId]);

  let formattedData = dataFormatter(props.segment.data);

  return (
    <>
      <StyledTextBlock
        className={"textblock preview " + (editMode && !props.disableEdit && "editor-active")}
        onClick={enableEditMode}
        dangerouslySetInnerHTML={{__html: formattedData}}
      />
      {editMode && !props.disableEdit && <TextBlockConfigurator parentId={props.parentId} onClose={disableEditMode} segment={props.segment} />}
    </>
  );
};
export default TextBlock;
