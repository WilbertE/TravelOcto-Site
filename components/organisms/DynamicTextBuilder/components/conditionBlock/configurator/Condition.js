import IconButton from "~/components/atoms/iconButton/IconButton";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import Select from "~/components/atoms/Select/Select";
import TextField from "~/components/atoms/textfield/Textfield";
import {Grid} from "@material-ui/core";
import useForm from "~/util/form";
import {useEffect, useRef, useState} from "react";
import {useRecoilState} from "recoil";
import {deleteSegmentState, tagsState} from "../../../atoms";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "~/components/atoms/button/Button";

const Condition = function ({condition, collapsed, ...props}) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode(!editMode);

  const updateCondition = (e) => {
    props.onUpdate(props.index, {...condition, [e.target.name]: e.target.value});
  };

  const unspecifiedCondition = condition.variable == "" || condition.variableProperty == "" || condition.condition == "" || condition.value == "";

  return (
    <>
      <span className={"condition " + (unspecifiedCondition && !collapsed ? "condition-unspecified" : "")}>
        {collapsed && <span>Ingeklapte condtie groep</span>}
        {!collapsed && (
          <span>
            {unspecifiedCondition && <FontAwesomeIcon className="warning-icon" icon={["fas", "exclamation-triangle"]} />}
            {condition.variable != "" ? condition.variable : "[!niet gespecificeerde variabele!]"}
            {condition.variable != "" && condition.variableProperty != "" && "." + condition.variableProperty + " "}
            {condition.condition + " "}
            {condition.value != "" ? condition.value : "[!niet gespecificeerde waarde!]"}
            {props.suffix && <span className="condition-and">{props.suffix}</span>}
          </span>
        )}
        {!collapsed && (
          <span>
            {props.enableOrButton && (
              <Button className="text-button" onClick={() => props.onAddOrCondition(props.index)}>
                of
              </Button>
            )}
            {props.enableAddButton && (
              <Button className="text-button" onClick={() => props.onAddAndCondition(props.index)}>
                en
              </Button>
            )}
            <IconButton icon={!editMode ? ["fal", "pencil"] : ["fal", "check"]} onClick={toggleEditMode} square small />
            <IconButton icon={["fal", "trash-alt"]} onClick={() => props.onDelete(props.index)} square small />
          </span>
        )}
      </span>
      {editMode && (
        <div className="configurator">
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextFieldWithTag
                label="Variabele"
                mustSelectTag
                tags={tags}
                value={condition.variable}
                onChange={updateCondition}
                name="variable"
                allowed={["string", "number", "array"]}
              />
            </Grid>
            {/* <Grid item xs={2}>
              <Select
                label="Eigenschap"
                value={condition.variableProperty}
                onChange={updateCondition}
                name="variableProperty"
                items={[
                  {label: "waarde", value: "value"},
                  {label: "bevat", value: "contains"},
                ]}
              />
            </Grid> */}
            <Grid item xs={3}>
              <Select
                label="Condition"
                value={condition.condition}
                onChange={updateCondition}
                name="condition"
                items={[
                  {label: "is gelijk aan", value: "=="},
                  {label: "niet gelijk is aan", value: "!="},
                  {label: "is groter dan", value: ">"},
                  {label: "is groter of gelijk aan", value: ">="},
                  {label: "is kleiner dan", value: "<"},
                  {label: "is kleiner of gelijk aan", value: "<="},
                ]}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Waarde" value={condition.value} onChange={updateCondition} name="value" />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Condition;
