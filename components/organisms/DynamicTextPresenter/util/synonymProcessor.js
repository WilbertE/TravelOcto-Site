import {seedToNumber} from "./seedToNumber";

const synonymProcessor = function (text, seed) {
  let i = 0;
  text = text.replace(/\[([^\]]*)\]/g, function (match, group) {
    let synonymGroup = group.split("|");
    if (synonymGroup.length == 1) return group;
    const randomIndex = seedToNumber(seed, i, synonymGroup.length);
    i += 1;
    return synonymGroup[randomIndex];
  });

  return text;
};

export {synonymProcessor};
