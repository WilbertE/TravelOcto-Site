import ConditionPresenter from "./components/condition/ConditionPresenter";
import LineGroupPresenter from "./components/lineGroup/LineGroupPresenter";

const DynamicTextPresenter = function (props) {
  return (
    <>
      {Array.isArray(props.data) &&
        props.data.map((component, key) => {
          if (component.type == "linegroup") return <LineGroupPresenter key={key} component={component} />;
          if (component.type == "condition") return <ConditionPresenter key={key} component={component} />;
        })}
    </>
  );
};

export default DynamicTextPresenter;
