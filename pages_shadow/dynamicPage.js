import {useRecoilState} from "recoil";
import Head from "~/components/atoms/head/Head";
import ComponentRender from "~/components/pageComponents/ComponentRender";
import Footer from "~/components/pageComponents/footer/Footer";
import {pageRenderState} from "~/components/templates/pageRender/PageRenderAtom";
import ErrorTemplate from "../components/templates/error/Error";

export default function DynamicPage({pageData, ...props}) {
  if (pageData == null)
    return <ErrorTemplate title="Deze pagina bestaat niet!" content="De pagina die je probeert te bezoeken bestaat niet of kan niet geladen worden." />;

  return (
    <>
      <Head {...pageData.meta} />
      <ComponentRender component={pageData.components} apiData={pageData.apiData} />
      <Footer />
    </>
  );
}
