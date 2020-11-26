const updateElementData = function (data, newData) {
  data.forEach((component) => {
    if (component.id == newData.id) {
      component = newData;
      return data;
    }
  });

  return data;
};

export {updateElementData};
