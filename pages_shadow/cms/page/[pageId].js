import Head from "~/components/atoms/head/Head";
import WithAuthentication from "~/Authentication/withAuthentication";
import CmsPage from "~/components/templates/cmsPage/CmsPage";
import {StyledPage} from "./[pageId].style";
import {useEffect, useState, useContext} from "react";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import Api from "~/util/api";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import CmsHeader from "~/components/molecules/CmsHeader/CmsHeader";
import IconButton from "~/components/atoms/iconButton/IconButton";
import PagePropertiesDialog from "../../../components/organisms/PageEditor/components/PagePropertiesDialog/PagePropertiesDialog";
import {useRecoilState} from "recoil";
import {pageState} from "../../../components/organisms/PageEditor/pageAtoms";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";

import PageEditor from "~/components/organisms/PageEditor/PageEditor";

const Page = function (props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [page, setPage] = useRecoilState(pageState);

  const [loading, setLoading] = useState(false);
  const [showPagePropertiesDialog, setShowPagePropertiesDialog] = useState(false);

  const togglePagePropertiesDialog = () => setShowPagePropertiesDialog(!showPagePropertiesDialog);

  useEffect(() => {
    loadPage();
  }, []);

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  const handleSaveComponents = async (page) => {
    const {id, components} = page;
    setPage(page);
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
        <StyledPage>{page && <PageEditor page={page} saveComponents={handleSaveComponents} />}</StyledPage>
      </CmsPage>
      {showPagePropertiesDialog && <PagePropertiesDialog onClose={togglePagePropertiesDialog} />}
    </>
  );
};

Page.getInitialProps = async (context) => {
  return {pageId: context.query.pageId};
};

export default WithAuthentication(Page);
