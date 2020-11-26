import {randomNumberWithSeed} from "~/util/randomNumberWithSeed";
import ArrayBlockPresenter from "../arrayBlock/arrayBlockPresenter";
import SwitchBlockPresenter from "../switchBlock/SwitchBlockPresenter";
import TextBlockPresenter from "../textBlock/textBlockPresenter";

const LineGroupPresenter = function (props) {
  const variant = randomNumberWithSeed(0, props.component.data.length - 1, props.component.id);
  return (
    <>
      {props.component.data[variant].data.map((component, key) => {
        if (component.type == "text") return <TextBlockPresenter key={key} component={component} />;
        if (component.type == "switch") return <SwitchBlockPresenter key={key} component={component} />;
        if (component.type == "array") return <ArrayBlockPresenter key={key} component={component} />;
      })}
    </>
  );
};

export default LineGroupPresenter;
