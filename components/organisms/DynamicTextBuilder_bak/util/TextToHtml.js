const filterSynonyms = function (text) {
  return text.replace(/\[([^\]]*)\]/g, `<span class="synonym" contenteditable="false">[$1]</span>`);
};

const textToHtml = function (data) {
  var text = data;
  if (typeof data === "object" && data !== null) text = data.blocks[0].data.text;

  text = filterSynonyms(text);
  if (typeof data === "object" && data !== null) {
    data.blocks[0].data.text = text;
    return data;
  } else {
    return text;
  }
};

export {textToHtml};
