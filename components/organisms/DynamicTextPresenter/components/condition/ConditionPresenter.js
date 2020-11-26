import DynamicTextPresenter from "../../DynamicTextPresenter";

const ConditionPresenter = function ({component, ...props}) {
  let conditionTrue = false;

  component.data[0].conditions.forEach((conditionGroup) => {
    if (conditionTrue == false) {
      var conditionGroupResults = [];
      conditionGroup.forEach((condition) => {
        var value = condition.variable;
        if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) value = Number(value);
        var compareValue = condition.value;
        if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(compareValue)) compareValue = Number(compareValue);

        switch (condition.condition) {
          case "==":
            conditionGroupResults.push(value == compareValue);
            break;
          case "!=":
            conditionGroupResults.push(value != compareValue);
            break;
          case ">":
            conditionGroupResults.push(value > compareValue);
            break;
          case ">=":
            conditionGroupResults.push(value >= compareValue);
            break;
          case "<":
            conditionGroupResults.push(value < compareValue);
            break;
          case "<=":
            conditionGroupResults.push(value <= compareValue);
            break;
        }
      });
      if (!conditionGroupResults.includes(false)) conditionTrue = true;
    }
  });

  if (conditionTrue) {
    return <DynamicTextPresenter data={component.data[0].data} />;
  } else {
    return <></>;
  }
};

export default ConditionPresenter;
