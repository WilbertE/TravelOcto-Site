import Drawer from "~/components/molecules/Drawer/Drawer";
import DrawerProvider from "~/components/molecules/Drawer/DrawerProvider";
import {StyledCmsPage} from "./CmsPage.style";
import AppBar from "~/components/molecules/AppBar/AppBar";

const CmsPage = function (props) {
  return (
    <StyledCmsPage>
      <DrawerProvider>
        <Drawer />
        <main className="main">
          <AppBar title={props.title} />
          <div className="content">{props.children}</div>
        </main>
      </DrawerProvider>
    </StyledCmsPage>
  );
};

export default CmsPage;
