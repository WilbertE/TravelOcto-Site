import Head from "~/components/atoms/head/Head";
import WithAuthentication from "~/Authentication/withAuthentication";
import IconButton from "~/components/atoms/iconButton/IconButton";
import CmsPage from "~/components/templates/cmsPage/CmsPage";
import StyledBlogs from "./index.style";
import CmsHeader from "~/components/molecules/CmsHeader/CmsHeader";
import {useState} from "react";
import AddBlogDialog from "./components/AddBlogDialog";
import BlogProvider from "./context/blogProvider";
import BlogList from "./components/BlogList";

const Page = function (props) {
  const [showAddBlogDialog, setShowBlogDialog] = useState(false);
  const handleShowAddBlogDialogToggle = () => setShowBlogDialog(!showAddBlogDialog);

  return (
    <BlogProvider>
      <Head title="Blogs - TravelOcto" />
      <CmsPage title="Blogs">
        <StyledBlogs>
          <CmsHeader startComponents={<IconButton icon={["fal", "plus"]} onClick={handleShowAddBlogDialogToggle} />} />
          <BlogList />
        </StyledBlogs>
        {showAddBlogDialog && <AddBlogDialog onClose={handleShowAddBlogDialogToggle} />}
      </CmsPage>
    </BlogProvider>
  );
};

export default WithAuthentication(Page);
