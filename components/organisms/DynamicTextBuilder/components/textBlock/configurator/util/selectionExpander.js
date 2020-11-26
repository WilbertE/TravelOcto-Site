const selectionExpander = (data, startSelection, endSelection) => {
  let updatedStartSelection = startSelection;
  let updatedEndSelection = endSelection;

  let tags = [
    ["\\[a", "\\/a\\]"],
    ["{", "}"],
    ["\\[", "\\]"],
  ];

  tags.forEach((tag) => {
    let regex = new RegExp("(" + tag[0] + "((?!" + tag[1] + ").*?)" + tag[1] + ")", "gi");
    let result;
    while ((result = regex.exec(data)) !== null) {
      const start = result.index;
      const end = start + result[1].length;
      if (start < startSelection && start < updatedStartSelection && startSelection > start && startSelection < end) updatedStartSelection = start;
      if (end > endSelection && end > updatedEndSelection && endSelection > start && endSelection < end) updatedEndSelection = end;
    }
  });
  return {adjustedStart: updatedStartSelection, adjustedEnd: updatedEndSelection};
};

export {selectionExpander};
