const JsonSaveString = function (json) {
  json = String(json);
  json = json.replace(/(?:\r\n|\r|\n)/g, "<br>");
  json = json.replace(/"/gi, "'");
  return json;
};
export default JsonSaveString;
