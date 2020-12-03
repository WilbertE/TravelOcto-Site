import ErrorTemplate from "~/components/templates/error/Error";
import Api from "~/util/api";
import {pageTagLoader} from "~/util/pageTagLoader";
import DynamicPage from "../dynamicPage";

const Blog = (props) => {
  if (props.pageData == null || props.pageData.components == null) return <ErrorTemplate content="Deze pagina bestaat niet" />;
  return <DynamicPage {...props} />;
};

const GetPageData = async (ctx, url) => {
  const api = new Api();

  var response = await api.fetch({
    endpoint: api.endpoints.getBlogByUrl,
    urlReplacements: [["url", encodeURIComponent(url)]],
  });

  return response.success ? response.result : null;
};

Blog.getInitialProps = async ({query, ctx}) => {
  if (query == "") query = "/";
  query = "/" + query.slug.join("/");
  const pageData = await GetPageData(ctx, query);
  await pageTagLoader(pageData, {queryTemplate: pageData.url, queryData: query});
  return {pageData: pageData};
};

export default Blog;
