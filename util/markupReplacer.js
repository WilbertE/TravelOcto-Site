const replaceMarkup = (str, id) => {
  let newStr = "";

  //replace links
  newStr = str.replace(new RegExp(/\[a\s*?target='(.*?)'\s*?href='(.*?)'\s*?\]((?!\[).*)\[\/a]/, "gi"), function (a, b, c, d) {
    return `<a href="${c}" target="${b}">${d}</a>`;
  });

  //replace new lines
  newStr = str.replace(new RegExp(/\n/, "gi"), "<br/>");

  //Replace bold
  let arr = newStr.split(new RegExp(/\*\*(.*?)\*\*/, "gi"));
  newStr = "";
  for (var i = 0; i < arr.length; i++) newStr += i % 2 == 0 ? arr[i] : `<b>${arr[i]}</b>`;

  //Replace italic
  arr = newStr.split(new RegExp(/__(.*?)__/, "gi"));
  newStr = "";
  for (var i = 0; i < arr.length; i++) newStr += i % 2 == 0 ? arr[i] : `<i>${arr[i]}</i>`;

  //replace synonyms
  newStr = newStr.replace(new RegExp(/\[([^|]+?\|[^\]]+?)\]/, "gi"), function (a, b) {
    b = b.split("|");

    const variant = randomNumberWithSeed(0, b.length - 1, id + str + JSON.stringify(b));
    return b[variant];
  });

  return newStr;
};

export {replaceMarkup};
