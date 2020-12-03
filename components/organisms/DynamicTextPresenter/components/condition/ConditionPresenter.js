import DynamicTextPresenter from "../../DynamicTextPresenter";

const ConditionPresenter = function ({component, ...props}) {
  let returnData = <></>;
  component.data.forEach((conditionGroupCollection) => {
    let conditionTrue = false;
    conditionGroupCollection.conditions.forEach((conditionGroup) => {
      if (conditionTrue == false) {
        var conditionGroupResults = [];
        conditionGroup.forEach((condition) => {
          var value = condition.variable;
          if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) value = Number(value);
          var compareValue = condition.value;
          if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(compareValue)) compareValue = Number(compareValue);

          //console.log(condition);

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
      returnData = <DynamicTextPresenter data={conditionGroupCollection.data} />;
    }
  });
  return returnData;
};

export default ConditionPresenter;
