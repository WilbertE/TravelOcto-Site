const parseTags = function (tags, string) {
  var match;
  const regex = new RegExp("{([^{}]*?)}", "g");
  do {
    match = regex.exec(string);
    if (match) {
      //   console.log(String(match[1]));
    }
  } while (match);
  return string;
};

export {parseTags};
