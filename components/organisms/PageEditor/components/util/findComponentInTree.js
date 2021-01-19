const findComponentInTree = function (component, id) {
  var result = null;
  if (component.id == id) result = {component: component, index: 0, parent: null};

  var componentChildren = component.children;
  console.log(component.name);
  if (component.name == "ifBlock") {
    componentChildren = component.data.data[component.data.selectedCondition].children;
  }
  if (componentChildren) {
    componentChildren.map((child, index) => {
      if (result == null) {
        if (child.id == id) {
          result = {component: child, index: index, parent: component};
        } else if (child.children) {
          result = findComponentInTree(child, id);
        }
      }
    });

    return result;
  }
};

// const findComponentInTree = function (component, id, parentId) {
//   let counter = 0;
//   let result = null;
//   if (component.id == id) {
//     result = {component: component, index: counter, parentId: parentId};
//   }

//   if (component.children) {
//     const parentId = component.id;
//     const parent = component;
//     parent.children.forEach((child) => {
//       const component = findComponentInTree(child, id, parentId);
//       if (component) {
//         result = component;
//         result.index = counter;
//         result.parent = parent;
//       }
//       counter++;
//     });
//   }
//   return result;
// };

export {findComponentInTree};
