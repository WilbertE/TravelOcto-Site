import {Divider, Grid, Tab, Tabs} from "@material-ui/core";
import {useEffect, useState} from "react";
import IconButton from "~/components/atoms/iconButton/IconButton";
import Select from "~/components/atoms/Select/Select";
import TextField from "~/components/atoms/textfield/Textfield";
import TextfieldTitle from "~/components/atoms/textfield/TextfieldTitle";
import TextfieldWithImageSelector from "~/components/atoms/textfield/TextfieldWithImageSelector";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import useForm from "~/util/form";
import {defaultIfBlockData, defaultIfConditionData} from "./defaultProps";
import {StyledIfBlockConfigurator} from "./IfBlockConfigurator.style";
import {useRecoilState} from "recoil";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";

const IfBlockConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  const messageboxStateAtom = useRecoilState(messageboxState);

  var setConditionGroup = function (index) {
    setForm({target: {name: "selectedCondition", value: index}});
  };

  useEffect(() => {
    setConditionGroup(form.data.length - 1);
  }, [form.data.length]);

  const handleAddConditionGroup = () => {
    let newForm = JSON.parse(JSON.stringify(form));
    newForm.data.push(defaultIfBlockData);
    updateForm(newForm);
  };

  const handleDeleteConditionGroup = () => {
    if (form.data.length == 1) {
      MessageboxStoreManager.AddMessage(messageboxStateAtom, {
        title: "Oops",
        content: "Er zit nog maar één conditie in dit blok. Verwijder het hele component als je deze ook wilt verwijderen.",
      });
    } else {
      MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
        title: "Conditie verwijderen?",
        content: "Weet je zeker dat je deze conditie wilt verwijderen?\n\nJe verwijderd daarmee ook de complete inhoud ervan!",
        confirm: {
          color: "warning",
          label: "Verwijderen",
          onClick: deleteConditionGroup,
        },
      });
    }
  };

  const deleteConditionGroup = () => {
    let newForm = JSON.parse(JSON.stringify(form));
    newForm.data.splice(newForm.selectedCondition, 1);
    newForm.selectedCondition = 0;
    updateForm(newForm);
  };

  const handleAddCondition = (index) => {
    let newForm = JSON.parse(JSON.stringify(form));
    newForm.data[newForm.selectedCondition].conditions[index].push(defaultIfConditionData);
    updateForm(newForm);
  };

  const handleAddOrCondition = () => {
    let newForm = JSON.parse(JSON.stringify(form));
    newForm.data[newForm.selectedCondition].conditions.push([defaultIfConditionData]);
    updateForm(newForm);
  };

  const handleUpdateLabel = (e) => {
    let newForm = JSON.parse(JSON.stringify(form));
    newForm.data[newForm.selectedCondition].label = e.target.value;
    updateForm(newForm);
  };

  const handleUpdateCondition = (index, subIndex, name, value) => {
    let newForm = JSON.parse(JSON.stringify(form));
    newForm.data[newForm.selectedCondition].conditions[index][subIndex][name] = value;
    updateForm(newForm);
  };

  const handleDeleteCondition = (index, subIndex) => {
    let newForm = JSON.parse(JSON.stringify(form));
    newForm.data[newForm.selectedCondition].conditions[index].splice(subIndex, 1);
    if (newForm.data[newForm.selectedCondition].conditions[index].length == 0) {
      newForm.data[newForm.selectedCondition].conditions.splice(index, 1);
    }
    updateForm(newForm);
  };

  var data = form.data[form.selectedCondition];

  return (
    <StyledIfBlockConfigurator>
      <Grid container>
        <Grid item xs={11}>
          <Select
            label="Conditie groep"
            onChange={(e) => setConditionGroup(e.target.value)}
            value={form.selectedCondition}
            name="conditionGroup"
            items={form.data.map((condition, i) => {
              return {label: i + 1 + "/" + form.data.length + ": " + condition.label, value: i};
            })}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleAddConditionGroup} className="prefix-button" icon={["fal", "plus"]} />
          <IconButton onClick={handleDeleteConditionGroup} className="prefix-button" icon={["fal", "trash-alt"]} />
        </Grid>
      </Grid>
      <div className="condition-group">
        <Grid container>
          <Grid item xs={12}>
            <TextField value={data.label} onChange={handleUpdateLabel} label="Label" />
          </Grid>
          {data.conditions.map((condition, key) => {
            return (
              <React.Fragment key={key}>
                <div className="and-condition-group">
                  {condition.map((andCondition, subKey) => {
                    return (
                      <Condition
                        key={subKey}
                        index={key}
                        subIndex={subKey}
                        tags={component.tags}
                        onDelete={handleDeleteCondition}
                        onChange={handleUpdateCondition}
                        condition={andCondition}
                      />
                    );
                  })}
                </div>
                <Grid item xs={12}>
                  <AddIfGroupButton onClick={() => handleAddCondition(key)} />
                  <div className="or">OF</div>
                </Grid>
              </React.Fragment>
            );
          })}
          <Grid item xs={12}>
            <AddIfGroupButton onClick={handleAddOrCondition} />
          </Grid>
        </Grid>
      </div>
    </StyledIfBlockConfigurator>
  );
};

const Condition = function ({tags, index, subIndex, condition, onChange, onDelete, ...props}) {
  const handleUpdateCondition = (e) => {
    onChange(index, subIndex, e.target.name, e.target.value);
  };

  return (
    <Grid container spacing={2} className="no-bottom-margin">
      <Grid item xs={4}>
        <TextFieldWithTag
          label="Variabele"
          mustSelectTag
          tags={tags.map((t) => t.name)}
          value={condition.variable}
          onChange={handleUpdateCondition}
          name="variable"
          allowed={["string", "number", "array"]}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          label="Condition"
          value={condition.condition}
          onChange={handleUpdateCondition}
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
        <TextField label="Waarde" value={condition.value} onChange={handleUpdateCondition} name="value" />
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => onDelete(index, subIndex)} className="prefix-button" icon={["fal", "trash-alt"]} />
      </Grid>
    </Grid>
  );
};

const AddIfGroupButton = function (props) {
  return (
    <div className="add-filter-button">
      <IconButton onClick={props.onClick} className="add-button" icon={["fal", "plus"]} small />
    </div>
  );
};

export default IfBlockConfigurator;
