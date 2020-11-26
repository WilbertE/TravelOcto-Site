import {AbstractRecoilValueReadonly} from "recoil";

const ArrayBlockPresenter = function ({component, ...props}) {
  var array = component.data.field.split(",");
  var sortFieldArray = component.data.sortField != "" ? component.data.sortField.split(",") : null;

  if (sortFieldArray) {
    var sortArray = [];
    for (var i = 0; i < array.length; i++) {
      var sortValue = /^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(sortFieldArray[i]) ? Number(sortFieldArray[i]) : sortFieldArray[i];
      sortArray.push({value: array[i], sortValue: sortValue});
    }
    var sortLargerValue = component.data.sortMethod == "desc" ? -1 : 1;
    var sortLowerValue = component.data.sortMethod == "desc" ? 1 : -1;
    sortArray.sort((a, b) => (a.sortValue > b.sortValue ? sortLargerValue : b.sortValue > a.sortValue ? sortLowerValue : 0));
    array = sortArray.map((item) => item.value);
  }

  if (component.data.limit != "" && component.data.limit > 0) array = array.slice(0, component.data.limit);

  array = array.map((item) => item.replace("&#44;", ","));
  var str = "";

  if (Array.isArray(array)) {
    str += array.length == 1 ? component.data.prefixSingle : component.data.prefixMultiple;
    if (array.length == 1) str += array[0];
    if (array.length > 1) {
      const lastItem = array.pop();
      str += array.join(component.data.divider);
      str += component.data.lastDivider;
      str += lastItem;
    }
    str += array.length == 1 ? component.data.suffixSingle : component.data.suffixMultiple;
  }

  return <>&nbsp;{str}&nbsp;</>;
};

export default ArrayBlockPresenter;
