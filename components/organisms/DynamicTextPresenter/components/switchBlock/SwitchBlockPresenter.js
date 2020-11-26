import TextBlockPresenter from "../textBlock/textBlockPresenter";

const SwitchBlockPresenter = function ({component, ...props}) {
  var value = component.data[0].variable;
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) value = Number(value);

  var matchedCondition = null;
  component.data[0].data.forEach((conditionGroup) => {
    if (matchedCondition == null) {
      var compareValue = conditionGroup.value;
      if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(compareValue)) compareValue = Number(compareValue);

      switch (conditionGroup.condition) {
        case "==":
          if (value == compareValue) matchedCondition = conditionGroup;
          break;
        case "!=":
          if (value != compareValue) matchedCondition = conditionGroup;
          break;
        case ">":
          if (value > compareValue) matchedCondition = conditionGroup;
          break;
        case ">=":
          if (value >= compareValue) matchedCondition = conditionGroup;
          break;
        case "<":
          if (value < compareValue) matchedCondition = conditionGroup;
          break;
        case "<=":
          if (value <= compareValue) matchedCondition = conditionGroup;
          break;
      }
    }
  });
  if (matchedCondition == null) return <></>;
  return <TextBlockPresenter component={matchedCondition.data[0]} />;
};

export default SwitchBlockPresenter;
