import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import RenderComponentGroup from "../../../render/RenderComponentGroup";
import Condition from "./Condition";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {useRecoilState} from "recoil";

const ConditionConfiguration = function ({condition, collapsed, index, ...props}) {
  const messageboxStateAtom = useRecoilState(messageboxState);

  const handleUpdateCondition = ([groupKey, key], data) => {
    let newConditionState = [...condition.conditions];
    const tmpArr = JSON.parse(JSON.stringify(newConditionState[groupKey]));
    tmpArr.splice(key, 1, data);
    newConditionState.splice(groupKey, 1, tmpArr);
    props.onUpdate(index, newConditionState);
  };

  const showRemoveConditionConfirm = (index) => {
    MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
      title: condition.conditions.length == 1 && condition.conditions[0].length == 1 ? "Conditie met inhoud verwijderen?" : "Conditie verwijderen?",
      content:
        condition.conditions.length == 1 && condition.conditions[0].length == 1
          ? "Weet je zeker dat je deze conditie met inhoud(!) wilt verwijderen?"
          : "Weet je zeker dat je deze conditie wilt verwijderen?",
      confirm: {
        label: "Verwijderen",
        color: "warning",
        onClick: () => {
          handleConditionDelete(index);
        },
      },
    });
  };

  const handleConditionDelete = ([groupKey, key]) => {
    let newConditionState = [...condition.conditions];
    const tmpArr = JSON.parse(JSON.stringify(newConditionState[groupKey]));
    tmpArr.splice(key, 1);
    if (tmpArr.length == 0) {
      newConditionState.splice(groupKey, 1);
    } else {
      newConditionState.splice(groupKey, 1, tmpArr);
    }
    props.onUpdate(index, newConditionState);
  };

  const handleAddAndCondition = ([groupKey, key]) => {
    let newConditionState = [...condition.conditions];
    const tmpArr = JSON.parse(JSON.stringify(newConditionState[groupKey]));
    tmpArr.push({variable: "", variableProperty: "value", condition: "=", value: ""});
    newConditionState.splice(groupKey, 1, tmpArr);
    props.onUpdate(index, newConditionState);
  };

  const handleAddOrCondition = ([groupKey, key]) => {
    let newConditionState = [...condition.conditions];
    newConditionState.push([{variable: "", variableProperty: "value", condition: "=", value: ""}]);
    props.onUpdate(index, newConditionState);
  };

  return (
    <div className="condition-group">
      {condition.conditions.map((conditionGroup, groupKey) => {
        if (!collapsed || (collapsed && groupKey == 0)) {
          return (
            <React.Fragment key={groupKey}>
              {conditionGroup.map((conditionFragment, key) => {
                if (!collapsed || (collapsed && key == 0)) {
                  return (
                    <Condition
                      key={key}
                      collapsed={collapsed}
                      index={[groupKey, key]}
                      onDelete={showRemoveConditionConfirm}
                      onAddAndCondition={handleAddAndCondition}
                      onAddOrCondition={handleAddOrCondition}
                      onUpdate={handleUpdateCondition}
                      condition={conditionFragment}
                      suffix={key < conditionGroup.length - 1 ? "en" : ""}
                      enableAddButton={key == conditionGroup.length - 1}
                      enableOrButton={groupKey == condition.conditions.length - 1 && key == conditionGroup.length - 1}
                    />
                  );
                }
              })}
              {groupKey < condition.conditions.length - 1 && !collapsed && <span className="condition-or"></span>}
            </React.Fragment>
          );
        }
      })}
      <div className="condition-expander">
        <div className="condition-explainer-prefix">
          <FontAwesomeIcon icon={["fal", "arrow-right"]} />
        </div>
        <div className="condition-inside">
          <RenderComponentGroup parentId={condition.id} components={condition.data} />
        </div>
      </div>
    </div>
  );
};

export default ConditionConfiguration;
