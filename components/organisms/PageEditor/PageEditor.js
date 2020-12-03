import PageTagsDialog from "../../../components/organisms/PageEditor/components/PageTagsDialog/PageTagsDialog";
import PageRender from "~/components/templates/pageRender/PageRender";
import {addComponentState, deleteComponentState, updateComponentState} from "./componentAtoms";
import {findComponentInTree} from "../../../components/organisms/PageEditor/components/util/findComponentInTree";
import {useEffect, useState, useContext} from "react";
import {useRecoilState} from "recoil";

const PageEditor = function ({page, saveComponents, ...props}) {
  const [updateComponent, setUpdateComponent] = useRecoilState(updateComponentState);
  const [addComponent, setAddComponent] = useRecoilState(addComponentState);
  const [deleteComponent, setDeleteComponent] = useRecoilState(deleteComponentState);

  //Update component
  useEffect(() => {
    if (!updateComponent) return;
    const updatedPage = JSON.parse(JSON.stringify(page));
    let component = findComponentInTree(updatedPage.components, updateComponent.id).component;
    Object.keys(component).forEach((key) => {
      if (updateComponent[key]) component[key] = updateComponent[key];
    });

    //setPage(updatedPage);
    saveComponents(updatedPage);
  }, [updateComponent]);

  //Add component
  useEffect(() => {
    if (!addComponent) return;
    const updatedPage = JSON.parse(JSON.stringify(page));

    let parent = findComponentInTree(updatedPage.components, addComponent.parentComponent.id).component;
    if (addComponent.referenceComponent == null) {
      //Item has to go to root of it
      parent.children.push(addComponent.addComponent);
      saveComponents(updatedPage);
      //setPage(updatedPage);
    } else {
      //Item has to be placed before or after another component
      let {index} = findComponentInTree(parent, addComponent.referenceComponent.id);
      if (addComponent.location == "after") index++;
      parent.children.splice(index, 0, addComponent.addComponent);
      saveComponents(updatedPage);
      //setPage(updatedPage);
    }
  }, [addComponent]);

  //delete component
  useEffect(() => {
    if (!deleteComponent) return;
    const updatedPage = JSON.parse(JSON.stringify(page));
    let {component, index, parent} = findComponentInTree(updatedPage.components, deleteComponent.id);
    console.log(component, index, parent);
    parent.children.splice(index, 1);
    //setPage(updatedPage);
    saveComponents(updatedPage);
  }, [deleteComponent]);

  return <PageRender isLive={false} />;
};

export default PageEditor;
