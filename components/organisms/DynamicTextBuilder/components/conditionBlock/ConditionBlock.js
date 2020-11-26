import {useEffect, useRef, useState} from "react";
const {StyledConditionBlock} = require("./ConditionBlock.style");
import {v4 as guid} from "uuid";
import {useRecoilState} from "recoil";
import {configuratorState, deleteSegmentState, segmentState} from "../../atoms";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IconButton from "~/components/atoms/iconButton/IconButton";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import Select from "~/components/atoms/Select/Select";
import TextField from "~/components/atoms/textfield/Textfield";
import {Grid} from "@material-ui/core";
import ConditionConfiguration from "./configurator/ConditionConfiguration";

const ConditionBlock = function ({segment, ...props}) {
  const [editMode, setEditMode] = useState(false);
  const [openConfiguratorId, setOpenConfiguratorId] = useRecoilState(configuratorState);
  const [id, setId] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [updateSegment, setUpdateSegment] = useRecoilState(segmentState);
  const [deleteSegment, setDeleteSegment] = useRecoilState(deleteSegmentState);

  const handleConditionUpdate = (key, conditions) => {
    let newSegment = JSON.parse(JSON.stringify(segment));
    newSegment.data[key].conditions = conditions;

    newSegment.data = newSegment.data.filter((condition) => {
      if (condition.conditions.length > 0) return condition;
    });

    if (newSegment.data.length > 0) {
      setUpdateSegment(newSegment);
    } else {
      setDeleteSegment({parentId: props.parentId, segmentId: newSegment.id, skipConfirm: true});
    }
  };

  const handleAddCondition = () => {
    let newSegment = JSON.parse(JSON.stringify(segment));
    newSegment.data.push({
      conditions: [[{variable: "", variableProperty: "value", condition: "=", value: ""}]],
      id: guid(),
      data: [],
    });
    newSegment.parentId = segment.parentId || props.parentId;
    setUpdateSegment(newSegment);
  };

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <>
      <StyledConditionBlock>
        <div className="condition-explainer">
          <IconButton icon={["fal", collapsed ? "angle-up" : "angle-down"]} onClick={toggleCollapse} square small />
          <span>Conditie blok</span>
          <IconButton icon={["fal", "plus"]} onClick={handleAddCondition} square small />
        </div>
        {segment.data.map((condition, key) => {
          if (!collapsed || (collapsed && key == 0)) {
            return <ConditionConfiguration key={key} index={key} collapsed={collapsed} onUpdate={handleConditionUpdate} condition={condition} />;
          }
        })}
      </StyledConditionBlock>
    </>
  );
};
export default ConditionBlock;
