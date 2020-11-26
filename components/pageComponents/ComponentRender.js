import {useRecoilState} from "recoil";
import ComponentSelector from "~/components/organisms/DynamicTextBuilder_bak/components/ComponentSelector/ComponentSelector";
import TagExpander from "~/components/pageComponents/tagExpander/TagExpander";
import {pageRenderState} from "../templates/pageRender/PageRenderAtom";
import AddComponentLine from "./componentMenu/AddComponentLine";
import {StyledComponentRender} from "./ComponentRender.style";
import Container from "./container/Container";
import DynamicText from "./dynamicText/DynamicText";
import Grid from "./grid/Grid";
import GridCell from "./gridCell/GridCell";
import GridCollectionCell from "./gridCollectionCell/GridCollectionCell";
import Header from "./header/Header";
import PhotoCard from "./photoCard/photoCard";
import Title from "./title/Title";
import Paragraph from "./paragraph/Paragraph";

const ComponentRender = function ({component, apiData, parent, ...props}) {
  const [liveMode, setLiveMode] = useRecoilState(pageRenderState);

  if (liveMode == false) {
    if (Array.isArray(component)) {
      return (
        <>
          {component.map((child, key) => {
            child = JSON.parse(JSON.stringify(child));
            child.tags = [...parent.tags];
            if (child.data && child.data.tags) child.tags = [...child.tags, ...child.data.tags];

            return <ComponentRender index={key} key={key} parent={parent} component={child} />;
          })}
          {component.length == 0 && parent != null && <AddComponentLine parent={parent} component={null} location="before" className="add-component-line" />}
        </>
      );
    }
    return (
      <>
        {parent != null && component != null && props.index == 0 && (
          <AddComponentLine parent={parent} component={component} location="before" className="add-component-line" />
        )}
        {component != null && <Component component={component} />}
        {parent != null && <AddComponentLine parent={parent} component={component} location="after" className="add-component-line" />}
      </>
    );
  } else {
    if (Array.isArray(component)) {
      return (
        <>
          {component.map((child, key) => {
            child = JSON.parse(JSON.stringify(child));
            child.tags = [...child.tags, ...parent.tags];
            return <ComponentRender apiData={apiData} index={key} key={key} parent={parent} component={child} />;
          })}
        </>
      );
    }
    return <Component apiData={apiData} component={component} />;
  }
};

const Component = function ({component, apiData, ...props}) {
  const [liveMode, setLiveMode] = useRecoilState(pageRenderState);
  if (component != null) {
    switch (component.name) {
      case "title":
        return <Title liveMode={liveMode} component={component} apiData={apiData} />;
      case "paragraph":
        return <Paragraph liveMode={liveMode} component={component} apiData={apiData} />;
      case "grid":
        return <Grid liveMode={liveMode} component={component} apiData={apiData} />;
      case "gridCollectionCell":
        return <GridCollectionCell liveMode={liveMode} component={component} apiData={apiData} />;
      case "gridCell":
        return <GridCell liveMode={liveMode} component={component} apiData={apiData} />;
      case "container":
        return <Container liveMode={liveMode} component={component} apiData={apiData} />;
      case "header":
        return <Header liveMode={liveMode} component={component} apiData={apiData} />;
      case "photoCard":
        return <PhotoCard liveMode={liveMode} component={component} apiData={apiData} />;
      case "tagExpander":
        return <TagExpander liveMode={liveMode} component={component} apiData={apiData} />;
      case "dynamicText":
        return <DynamicText liveMode={liveMode} component={component} apiData={apiData} />;
      case "testComponent":
        return <>This is a test component</>;
    }
  }
  return <></>;
};

export default ComponentRender;
