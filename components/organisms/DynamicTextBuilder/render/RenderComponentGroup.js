import AddSegmentButton from "../components/AddSegmentButton";
import ConditionBlock from "../components/conditionBlock/ConditionBlock";
import RenderLineGroup from "../components/lineGroup/RenderLineGroup";

const RenderComponentGroup = function ({components, ...props}) {
  return (
    <>
      {components.length == 0 && <AddSegmentButton icon={["fal", "plus"]} parentId={props.parentId} isWrapper={false} location="after" />}
      {components.length > 0 &&
        components.map((data, key) => {
          return (
            <React.Fragment key={key}>
              {key == 0 && <AddSegmentButton icon={["fal", "plus"]} segmentId={data.id} parentId={props.parentId} isWrapper={false} location="before" />}
              {insertComponent(data, props)}
              <AddSegmentButton icon={["fal", "plus"]} parentId={props.parentId} segmentId={data.id} isWrapper={false} location="after" />
            </React.Fragment>
          );
        })}
    </>
  );
};

const insertComponent = (data, props) => {
  switch (data.type) {
    case "condition":
      return <ConditionBlock parentId={props.parentId} segment={data} />;
    case "linegroup":
      return <RenderLineGroup parentId={props.parentId} segment={data} />;
    default:
      return <React.Fragment>Type not specified: {data.type}</React.Fragment>;
  }
};

export default RenderComponentGroup;
