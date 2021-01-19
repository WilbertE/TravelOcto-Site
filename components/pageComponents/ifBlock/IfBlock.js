import {Box} from "@material-ui/core";
import {useEffect, useState} from "react";
import Configurable from "../Configurable";
import IfBlockConfigurator from "./IfBlockConfigurator";
import ComponentRender from "../ComponentRender";
import {StyledIfBlock} from "./IfBlock.style";
import Select from "~/components/atoms/Select/Select";
import {useRecoilState} from "recoil";
import {updateComponentState} from "~/components/organisms/PageEditor/componentAtoms";

const IfBlock = function ({...props}) {
  const [conditionGroup, setConditionGroup] = useState(props.component.data.selectedCondition);
  const [updateComponent, setUpdateComponent] = useRecoilState(updateComponentState);

  useEffect(() => {
    handleSave();
  }, [conditionGroup]);

  useEffect(() => {
    setConditionGroup(props.component.data.selectedCondition);
  }, [props.component.data.selectedCondition]);

  const handleSave = async () => {
    if (conditionGroup != props.component.data.selectedCondition) {
      const newComponent = JSON.parse(JSON.stringify(props.component));
      newComponent.data.selectedCondition = conditionGroup;
      setUpdateComponent(newComponent);
    }
  };

  if (props.liveMode == false) {
    return (
      <StyledIfBlock liveMode={props.liveMode}>
        <Configurable setWidth={900} preview={false} component={props.component} title="Conditioneel blok" configurator={<IfBlockConfigurator />}>
          <div className="ifblock-header">
            <Select
              label="Conditie groep"
              onChange={(e) => setConditionGroup(e.target.value)}
              value={conditionGroup}
              name="conditionGroup"
              items={props.component.data.data.map((condition, i) => {
                return {label: i + 1 + "/" + props.component.data.data.length + ": " + condition.label, value: i};
              })}
            />
          </div>
          <Component conditionGroup={conditionGroup} {...props} />
        </Configurable>
      </StyledIfBlock>
    );
  } else {
    return <Component {...props} />;
  }
};

const Component = function ({component, conditionGroup, ...props}) {
  const data = component.data;

  if (props.liveMode == false) {
    return <ComponentRender parent={component} component={component.data.data[conditionGroup].children} />;
  } else {
    var children = null;
    data.data.forEach((conditionGroup) => {
      if (children == null) {
        conditionGroup.conditions.forEach((orCondition) => {
          if (children == null) {
            var valid = true;
            orCondition.forEach((condition) => {
              valid = validateCondition(condition);
            });
            if (valid) children = conditionGroup.children;
          }
        });
      }
    });
    if (children == null) return <></>;

    return (
      <>
        <ComponentRender parent={component} component={children} />
      </>
    );
  }
};

const validateCondition = function (condition) {
  var value = condition.variable;
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) value = Number(value);
  var compareValue = condition.value;
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(compareValue)) compareValue = Number(compareValue);

  switch (condition.condition) {
    case "==":
      return value == compareValue;
    case "!=":
      return value != compareValue;
    case ">":
      return value > compareValue;
    case ">=":
      return value >= compareValue;
    case "<":
      return value < compareValue;
    case "<=":
      return value <= compareValue;
  }
};

export default IfBlock;
