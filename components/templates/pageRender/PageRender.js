import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {pageState} from "~/components/organisms/PageEditor/pageAtoms";
import ComponentRender from "../../pageComponents/ComponentRender";
import {StyledPageRender} from "./PageRender.style";
import {pageRenderState} from "./PageRenderAtom";

const PageRender = function (props) {
  const [liveMode, setLiveMode] = useRecoilState(pageRenderState);
  const [page, setPage] = useRecoilState(pageState);
  useEffect(() => {
    setLiveMode(props.isLive);
  }, [props.isLive]);

  if (liveMode == null) return <></>;

  if (!liveMode)
    return (
      <StyledPageRender>
        <ComponentRender component={page.components} />
      </StyledPageRender>
    );

  if (liveMode) return <ComponentRender component={page.components} />;
};

export default PageRender;
