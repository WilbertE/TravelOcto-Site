import {CompassCalibrationSharp} from "@material-ui/icons";
import Api from "./api";
import {numberToStringConverter} from "./numberToStringConverter";
import {retrieveJsonProperty} from "./retrieveJsonProperty";

const fetchTagFromApi = async (tags, tag, value, queryData, alreadyAvailableTags) => {
  //Setup api request
  const api = new Api();
  var request = {
    endpoint: "",
    urlReplacements: [],
  };

  //Get the variables
  var urlReplacements = [];
  if (tag.input == "url") {
    //If variable values are in url, extract it from the url
    var destructedQuery = JSON.parse(JSON.stringify(queryData));

    if (destructedQuery.queryTemplate.startsWith("/")) destructedQuery.queryTemplate = destructedQuery.queryTemplate.substring(1).split("/");
    if (destructedQuery.queryData.startsWith("/")) destructedQuery.queryData = destructedQuery.queryData.substring(1).split("/");
    for (var i = 0; i < destructedQuery.queryTemplate.length; i++) {
      const regex = new RegExp(/^(.*?|){([a-zA-Z0-9_\.\[\]]*?)}(.*?|)$/, "g");
      var match;
      do {
        match = regex.exec(destructedQuery.queryTemplate[i]);
        if (match) {
          var queryStringValue = destructedQuery.queryData[i];
          queryStringValue = queryStringValue.replace(match[1], "");
          queryStringValue = queryStringValue.replace(match[3], "");
          urlReplacements.push([match[2], queryStringValue]);
        }
      } while (match);
    }
  } else if (tag.input == "*") {
    //If it has an astrix, the tag doesn't need a value
    urlReplacements = [];
  } else if (tag.customInput && tag.customInput != "" && tag.input.indexOf("[") > -1) {
    //If the value is set manually (custom), captrure it
    var regex = new RegExp(/\[(.*?)\]/);
    var match = regex.exec(tag.input);
    urlReplacements = [[match[1], tag.customInput]];
  } else {
    urlReplacements = [[tag.input, "{" + tag.input + "}"]];
  }

  //Check if a value has an {} in it, because than it should be replaced
  //by a tag value loaded in a cycle before
  var tmpUrlReplacements = [];
  for (var i = 0; i < urlReplacements.length; i++) {
    var definitiveReplacementValue = urlReplacements[i][1];
    if (definitiveReplacementValue.startsWith("{")) {
      var definitiveReplacementValue = retrieveJsonProperty(alreadyAvailableTags, definitiveReplacementValue);
    }
    tmpUrlReplacements.push([urlReplacements[i][0], definitiveReplacementValue]);
  }
  urlReplacements = tmpUrlReplacements;

  //Get the right api endpoint
  request.urlReplacements = urlReplacements;

  switch (tag.name.toLowerCase()) {
    case "all_continents":
      request.endpoint = api.endpoints.getContinentList;
      break;
    case "all_countries":
      request.endpoint = api.endpoints.getCountryList;
      break;
    case "all_countries_by_continent":
      request.endpoint = api.endpoints.getCountryListByContintent;
      request.urlReplacements = [["continentCode", urlReplacements[0][1]]];
      break;
    case "country":
      if (urlReplacements[0][0] == "Country") {
        request.endpoint = api.endpoints.getCountryByUrlName;
        request.urlReplacements = [["urlName", urlReplacements[0][1]]];
      } else if (urlReplacements[0][0] == "iso2") {
        request.endpoint = api.endpoints.getCountryByIso2;
      }
      break;
    case "continent":
      if (urlReplacements[0][0] == "Continent") {
        request.endpoint = api.endpoints.getContinentByUrlName;
        request.urlReplacements = [["urlName", urlReplacements[0][1]]];
      } else if (urlReplacements[0][0] == "iso2") {
        request.endpoint = api.endpoints.getCountryByIso2;
      }
      break;
    default:
      console.log("TAG URL NOT SET IN PAGETAGLOADER: " + tag.name);
      break;
  }

  //Make the request
  const response = await api.fetch(request);
  tag.apiData = response.result;
  return tag;
};

const parseStringWithTags = function (string, tagData) {
  const regex = new RegExp(/{((\[{|)(#|)([a-zA-Z0-9_\.\[\]]*?)(}\]|))}/, "g");
  var match;
  var newString = string;
  do {
    match = regex.exec(string);
    if (match) {
      var variable = "{" + match[1].replace("#", "") + "}";
      var variable = retrieveJsonProperty(tagData, variable);
      if (match[1].startsWith("#")) variable = numberToStringConverter(variable);
      newString = newString.split(match[0]).join(variable);
    }
  } while (match);
  return newString;
};

const parseComponentDataWithTags = function (data, tagData) {
  Object.keys(data).forEach((key) => {
    var value = data[key];
    if (typeof value == "string") {
      if (value.indexOf("{") > -1) data[key] = parseStringWithTags(value, tagData);
    } else if (Array.isArray(value)) {
      var flatArray = JSON.stringify(value);
      if (flatArray.indexOf("{") > -1) data[key] = JSON.parse(parseStringWithTags(flatArray, tagData));
    } else if (typeof value === "object" && value !== null) {
      parseComponentDataWithTags(value, tagData);
    }
  });
  return data;
};

const parseComponentWithTags = async function (component, tagData, queryData) {
  let itterationTagData;
  if (component.name == "tagExpander") {
    //Load tags in tagExpander
    var tags = await loadTags(component.data && component.data.tags ? component.data.tags : component.tags, queryData, tagData);
    //From here all components have access to the new data
    itterationTagData = JSON.parse(JSON.stringify(tagData));
    itterationTagData = [...itterationTagData, ...tags];
  }
  if (itterationTagData == null) itterationTagData = tagData;

  //If item is gridCollectionCell then loop through children
  if (component.name == "gridCollectionCell" && component.data.array && component.data.array != "") {
    //Get the correspondending array from the api
    var arrayData = retrieveJsonProperty(itterationTagData, component.data.array);
    if (component.data.sortProperty != null && component.data.sortProperty != "") {
      var sortData = retrieveJsonProperty(itterationTagData, "{[" + component.data.sortProperty + "]}");
      var sortArray = [];
      for (var i = 0; i < arrayData.length; i++) {
        var sortValue = /^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(sortData[i]) ? Number(sortData[i]) : sortData[i];
        sortArray.push({value: arrayData[i], sortValue: sortValue});
      }
      var sortLargerValue = component.data.sortMethod == "desc" ? -1 : 1;
      var sortLowerValue = component.data.sortMethod == "desc" ? 1 : -1;
      sortArray.sort((a, b) => (a.sortValue > b.sortValue ? sortLargerValue : b.sortValue > a.sortValue ? sortLowerValue : 0));
      arrayData = sortArray.map((item) => item.value);
      if (component.data.limit != null && component.data.limit > 0) arrayData = arrayData.slice(0, component.data.limit);
    }

    //Check if found data is array
    if (Array.isArray(arrayData)) {
      //Get clone of child array of component because this needs to be set for every array item
      var childTemplate = JSON.parse(JSON.stringify(component.children));
      //Create new children array
      component.children = [];
      await Promise.all(
        arrayData.map(async (data) => {
          const newTagData = JSON.parse(JSON.stringify(itterationTagData));
          newTagData.push({name: component.data.array.replace("{", "").replace("}", "") + "[]", apiData: data});
          //Clone the child template for a new child
          var child = JSON.parse(JSON.stringify(childTemplate));
          //Parse data for every item in the child
          await Promise.all(child.map(async (childComponent) => await parseComponentWithTags(childComponent, newTagData, queryData)));

          //Push the child as a child for the component
          component.children.push(child);
        })
      );
    }
  }

  //If component has data then it needs to be parsed
  if (component.data && !["gridCollectionCell", "tagExpander"].includes(component.name)) parseComponentDataWithTags(component.data, itterationTagData);

  //If the component is not a gridCollectionCell then parse other components
  if (!["gridCollectionCell"].includes(component.name) && component.children && component.children.length != 0) {
    await Promise.all(
      component.children.map(async (childComponent) => {
        await parseComponentWithTags(childComponent, itterationTagData, queryData);
      })
    );
  }
};

const loadTags = async function (tags, queryData, alreadyAvailableTags) {
  await Promise.all(
    tags.map(async (tag) => {
      let value = "";
      return await fetchTagFromApi(tags, tag, value, queryData, alreadyAvailableTags);
    })
  );
  return tags;
};

const pageTagLoader = async function (pageData, queryData) {
  if (pageData && pageData.components) await parseComponentWithTags(pageData.components, [], queryData);
  return;
};

export {pageTagLoader};
