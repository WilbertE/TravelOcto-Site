import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {configuratorState, deleteSegmentState} from "../../atoms";
import SwitchConfigurator from "./configurator/SwitchConfigurator";
import {StyledSwitchBlock} from "./SwitchBlock.style";
import {v4 as guid} from "uuid";
import TextBlock from "../textBlock/TextBlock";

const SwitchBlock = function (props) {
  const [editMode, setEditMode] = useState(false);
  const [deleteSegment, setDeleteSegment] = useRecoilState(deleteSegmentState);

  const enableEditMode = () => {
    setEditMode(true);
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  const handleSwitchDelete = () => {
    setDeleteSegment({parentId: props.parentId, segmentId: props.segment.id, skipConfirm: true});
  };

  return (
    <>
      <StyledSwitchBlock className={"preview " + (editMode && "editor-active")} onClick={enableEditMode}>
        <TextBlock disableEdit={true} parentId={props.segment.data[0].data[0].id} segment={props.segment.data[0].data[0].data[0]} />
        <div className="switchDropdown">
          {props.segment.data[0].data.map((switchData, key) => {
            if (key > 0)
              return (
                <span key={key} className="switch">
                  <TextBlock disableEdit={true} parentId={switchData.id} segment={switchData.data[0]} />
                </span>
              );
          })}
        </div>
      </StyledSwitchBlock>
      {editMode && <SwitchConfigurator onDelete={handleSwitchDelete} onClose={disableEditMode} {...props} />}
    </>
  );
};

export default SwitchBlock;
