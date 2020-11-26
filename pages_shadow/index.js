import Api from "~/util/api";
import {pageTagLoader} from "~/util/pageTagLoader";
import DynamicPage from "./dynamicPage";

const Page = (props) => {
  return <DynamicPage {...props} />;
};

const GetPageData = async (ctx, url) => {
  const api = new Api();

  var response = await api.fetch({
    endpoint: api.endpoints.getPageByUrl,
    urlReplacements: [["url", encodeURIComponent(url)]],
  });

  return response.success ? response.result : null;
};

Page.getInitialProps = async (ctx) => {
  const pageData = await GetPageData(ctx, "/");
  await pageTagLoader(pageData);
  return {pageData: pageData};
};

export default Page;
