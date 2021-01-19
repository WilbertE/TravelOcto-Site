import JsonSaveString from "./jsonSaveString";

const searchTag = (json, tagGroups) => {
  var tag = tagGroups.shift();
  var tagIsArray = false;
  if (tag.endsWith("[]")) {
    tagIsArray = true;
    tag = tag.split("[]").join("");
  }

  var value = json[tag];
  if (tagIsArray) value = value[0];
  if (tagGroups.length != 0) value = searchTag(value, tagGroups);
  return value;
};

const retrieveJsonProperty = (tags, selectedTag) => {
  const initialTag = selectedTag;
  if (!Array.isArray(tags)) return "NO ARRAY";

  //Filter out selector
  const regex = new RegExp(/{([a-zA-Z0-9_\.\[\]]*?)}/, "g");
  const match = regex.exec(selectedTag);
  if (match == null) return "Parse error [" + selectedTag + "]";
  selectedTag = match[1];

  //Get base
  const regexBase = new RegExp(/^(.*\[\])|^(.*)\./, "g");
  const baseMatch = regexBase.exec(selectedTag);
  let variableBase = selectedTag;
  if (baseMatch != null) variableBase = baseMatch[1] || baseMatch[2];
  var baseIsArray = initialTag.startsWith("{[{");

  //Get selector without base in groups
  const selectedTagGroups = selectedTag.substring(variableBase.length + 1).split(".");
  if (baseIsArray) variableBase = variableBase.substring(0, variableBase.length - 2);

  //Find correspondeding tag
  let tagGroup = tags.find((tag) => tag.name.toLowerCase() == variableBase.toLowerCase());

  if (tagGroup == null) {
    var variableBaseParts = variableBase.split(".");
    for (var i = variableBaseParts.length - 1; i >= 0; i--) {
      tagGroup = tags.find((tag) => tag.name.toLowerCase() == variableBaseParts[i].toLowerCase());
      if (tagGroup) {
        var leftOver = variableBaseParts.slice(i + 1, variableBaseParts.length);
        var tried = variableBaseParts.slice(0, variableBaseParts.length - 1);
        var newTagGroup = new Object();
        var b = selectedTag.replace(tried.join(".") + ".", "");
        var n = b.split(".")[0].replace("[]", "");
        newTagGroup.apiData = searchTag(tagGroup.apiData, leftOver);
        newTagGroup.name = n;
        var newSearch = initialTag.replace(tried.join(".") + ".", "");
        var result = retrieveJsonProperty([newTagGroup], newSearch);
        return result;
      }
    }
  }

  if (tagGroup == null) return "Parse error [" + selectedTag + "] (group not found)";
  if (tagGroup.apiData == null) return "Parse error [" + selectedTag + "] (group no data)";

  //Return the data
  const json = tagGroup.apiData;
  if (selectedTagGroups.length == 0 || (selectedTagGroups.length == 1 && selectedTagGroups[0] == "")) return json;

  if (baseIsArray) {
    if (selectedTagGroups.length == 0) return json;
    var arr = [];

    json.forEach((childJson) => {
      arr.push(String(searchTag(childJson, [...selectedTagGroups])).replace(",", "&#44;"));
    });
    return arr;
  }

  var value = searchTag(json, selectedTagGroups);
  if (value == null) return "Parse error [" + selectedTag + "] (value not exist)";
  if (typeof value == "string") value = JsonSaveString(value);
  return value;
};

export {retrieveJsonProperty, searchTag};
