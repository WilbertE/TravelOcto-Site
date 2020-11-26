import Head from "~/components/atoms/head/Head";
import WithAuthentication from "~/Authentication/withAuthentication";
import CmsPage from "~/components/templates/cmsPage/CmsPage";
import {StyledPage} from "./index.style";
import Title from "~/components/atoms/title/Title";
import {useEffect, useState, useContext} from "react";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import Api from "~/util/api";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import CmsHeader from "~/components/molecules/CmsHeader/CmsHeader";
import IconButton from "~/components/atoms/iconButton/IconButton";
import PagePropertiesDialog from "./components/PagePropertiesDialog/PagePropertiesDialog";
import {useRecoilState} from "recoil";
import {pageState} from "./pageAtoms";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import PageTagsDialog from "./components/PageTagsDialog/PageTagsDialog";
import PageRender from "~/components/templates/pageRender/PageRender";
import {addComponentState, deleteComponentState, updateComponentState} from "./componentAtoms";
import {findComponentInTree} from "./components/util/findComponentInTree";

const Page = function (props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [page, setPage] = useRecoilState(pageState);
  const [updateComponent, setUpdateComponent] = useRecoilState(updateComponentState);
  const [addComponent, setAddComponent] = useRecoilState(addComponentState);
  const [deleteComponent, setDeleteComponent] = useRecoilState(deleteComponentState);
  const [loading, setLoading] = useState(false);
  const [showPagePropertiesDialog, setShowPagePropertiesDialog] = useState(false);

  const togglePagePropertiesDialog = () => setShowPagePropertiesDialog(!showPagePropertiesDialog);

  useEffect(() => {
    loadPage();
  }, []);

  //Update component
  useEffect(() => {
    if (!updateComponent) return;
    const updatedPage = JSON.parse(JSON.stringify(page));
    let component = findComponentInTree(updatedPage.components, updateComponent.id).component;
    Object.keys(component).forEach((key) => {
      if (updateComponent[key]) component[key] = updateComponent[key];
    });

    setPage(updatedPage);
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
      setPage(updatedPage);
    } else {
      //Item has to be placed before or after another component
      let {index} = findComponentInTree(parent, addComponent.referenceComponent.id);
      if (addComponent.location == "after") index++;
      parent.children.splice(index, 0, addComponent.addComponent);
      saveComponents(updatedPage);
      setPage(updatedPage);
    }
  }, [addComponent]);

  //delete component
  useEffect(() => {
    if (!deleteComponent) return;
    const updatedPage = JSON.parse(JSON.stringify(page));
    let {component, index, parent} = findComponentInTree(updatedPage.components, deleteComponent.id);
    console.log(component, index, parent);
    parent.children.splice(index, 1);
    setPage(updatedPage);
    saveComponents(updatedPage);
  }, [deleteComponent]);

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  const saveComponents = async (page) => {
    const {id, components} = page;

    const response = await api.fetch({
      endpoint: api.endpoints.savePageComponents,
      urlReplacements: [["pageId", id]],
      body: {components: JSON.stringify(components)},
    });
    if (!response.success) MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
  };

  const loadPage = async () => {
    const response = await api.fetch({
      endpoint: api.endpoints.getPage,
      urlReplacements: [["pageId", props.pageId]],
    });
    if (response.success) setPage(response.result);
    if (!response.success) MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
  };

  return (
    <>
      <Head title={page ? `Pagina bewerken: ${page.name} - TravelOcto` : `Pagina bewerken`} />
      <CmsPage title={page ? `Pagina bewerken: ${page.name}` : `Pagina bewerken`}>
        {loading && <LoadingIndicator />}
        <CmsHeader endComponents={<IconButton onClick={togglePagePropertiesDialog} icon={["fal", "file-code"]} />} />
        <StyledPage>{page && <PageRender isLive={false} />}</StyledPage>
      </CmsPage>
      {showPagePropertiesDialog && <PagePropertiesDialog onClose={togglePagePropertiesDialog} />}
    </>
  );
};

Page.getInitialProps = async (context) => {
  return {pageId: context.query.pageId};
};

export default WithAuthentication(Page);
