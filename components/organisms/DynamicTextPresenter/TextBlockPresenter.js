// import {seedToNumber} from "./util/seedToNumber";
// import {synonymProcessor} from "./util/synonymProcessor";
// import parse from "html-react-parser";

// const TextBlockPresenter = function ({data, index, randomNumber, ...props}) {
//   const randomIndex = randomNumber != null ? randomNumber : seedToNumber(data.seed, index, data.content.length);

//   let text = JSON.parse(data.content[randomIndex]).blocks[0].data.text;
//   text = synonymProcessor(text, data.seed);

//   return <>{parse(text)}</>;
// };

// export default TextBlockPresenter;
