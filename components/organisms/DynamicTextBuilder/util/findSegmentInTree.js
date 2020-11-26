const findComponentInTree = function (segment, id) {
  let counter = 0;
  let result = null;
  if (segment.id != null && segment.id == id) result = {segment: segment, index: counter};
  var arr = Array.isArray(segment) ? segment : segment.data;
  if (arr && Array.isArray(arr))
    arr.forEach((childData) => {
      const segment = findComponentInTree(childData, id);
      if (segment) {
        result = segment;
        result.index = counter;
      }
      counter++;
    });
  return result;
};

export {findComponentInTree};
