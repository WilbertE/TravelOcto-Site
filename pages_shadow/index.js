import {FooterLoader} from "~/components/pageComponents/footer/FooterLoader";
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

Page.getInitialProps = async ({query, ctx}) => {
  //Load pagedata and footer data async
  const pageDataRequest = GetPageData(ctx, "/");
  const footerDataRequest = FooterLoader();
  const [pageData, footerData] = await Promise.all([pageDataRequest, footerDataRequest]);

  //Parse pagedata
  await pageTagLoader(pageData);

  //Return page and footer data
  return {pageData: pageData, footerData: footerData};
};

export default Page;
