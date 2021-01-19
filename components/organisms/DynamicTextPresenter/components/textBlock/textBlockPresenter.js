import parse from "html-react-parser";
import {replaceMarkup} from "~/util/markupReplacer";
import {randomNumberWithSeed} from "~/util/randomNumberWithSeed";

const TextBlockPresenter = function (props) {
  var text = JSON.parse(JSON.stringify(props.component.data));
  text = replaceMarkup(text);
  return <>{parse(text, props.component.id)}&nbsp;</>;
};

export default TextBlockPresenter;
