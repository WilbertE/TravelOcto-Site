import Head from "~/components/atoms/head/Head";
import WithAuthentication from "~/Authentication/withAuthentication";
import IconButton from "~/components/atoms/iconButton/IconButton";
import CmsPage from "~/components/templates/cmsPage/CmsPage";
import StyledPages from "./index.style";
import CmsHeader from "~/components/molecules/CmsHeader/CmsHeader";
import AddWebsiteDialog from "./components/AddWebsiteDialog";
import PageList from "./components/PageList";
import PageProvider from "./context/pageProvider";
import {useState} from "react";

const Pages = function (props) {
  const [showAddWebsiteDialog, setShowWebsiteDialog] = useState(false);
  const handleShowAddWebpageDialogToggle = () => setShowWebsiteDialog(!showAddWebsiteDialog);

  return (
    <PageProvider>
      <Head title="Pagina's - TravelOcto" />
      <CmsPage title="Pagina's">
        <StyledPages>
          <CmsHeader startComponents={<IconButton onClick={handleShowAddWebpageDialogToggle} icon={["fal", "plus"]} />} />
          <PageList />
        </StyledPages>
      </CmsPage>
      {showAddWebsiteDialog && <AddWebsiteDialog onClose={handleShowAddWebpageDialogToggle} />}
    </PageProvider>
  );
};

export default WithAuthentication(Pages);
