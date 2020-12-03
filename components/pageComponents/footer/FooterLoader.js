import Api from "~/util/api";

const FooterLoader = async function () {
  const api = new Api();

  var loadTopBlogs = await api.fetch({
    endpoint: api.endpoints.getBlogsSortedLimit,
    urlReplacements: [
      ["sortMethod", "desc"],
      ["sortKey", "datePublished"],
      ["limit", "5"],
    ],
  });

  return {
    blogs: loadTopBlogs.result,
  };
};

export {FooterLoader};
