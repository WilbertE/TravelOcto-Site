import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import IconButton from "~/components/atoms/iconButton/IconButton";
import TextBlock from "../textBlock/TextBlock";
import ArrayBlock from "../arrayBlock/ArrayBlock";
import {configuratorState, deleteSegmentState, segmentState} from "../../atoms";
import {StyledRenderLineGroup} from "./RenderLineGroup.style";
import AddSegmentButton from "../AddSegmentButton";
import {v4 as guid} from "uuid";
import SwitchBlock from "../switchBlock/SwitchBlock";

const RenderLineGroup = function ({segment, ...props}) {
  const [variant, setVariant] = useState(0);
  const [openConfiguratorId, setOpenConfiguratorId] = useRecoilState(configuratorState);
  const [deleteSegment, setDeleteSegment] = useRecoilState(deleteSegmentState);
  const [updateSegment, setUpdateSegment] = useRecoilState(segmentState);
  const [amountOfSegments, setAmountOfSements] = useState(null);

  useEffect(() => {
    if (amountOfSegments != null) {
      if (segment.data.length > amountOfSegments) setVariant(segment.data.length - 1);
    }
    setAmountOfSements(segment.data.length);
  }, [segment.data.length]);

  const handleSetVariant = (index) => {
    if (index == -1 && variant <= 0) return;
    if (index == 1 && variant >= segment.data.length - 1) return;
    setVariant(variant + index);
    setOpenConfiguratorId(0);
  };

  const handleDeleteSegment = () => {
    let id = segment.data[variant].id;
    let parentId = segment.id;
    if (segment.data.length == 1) {
      id = segment.id;
      parentId = segment.parentId || props.parentId;
    }
    setDeleteSegment({parentId: parentId, segmentId: id});
  };

  const handleAddSegment = () => {
    let newSegment = JSON.parse(JSON.stringify(segment));
    newSegment.data.push({
      type: "line",
      isWrapper: false,
      id: guid(),
      data: [],
    });
    newSegment.parentId = segment.parentId || props.parentId;
    setUpdateSegment(newSegment);
  };

  if (segment.data[variant] == null) {
    setVariant(variant - 1);
    return <></>;
  }

  return (
    <StyledRenderLineGroup key={props.key}>
      <div className="group-explainer">
        <IconButton icon={["fal", "angle-left"]} square small onClick={() => handleSetVariant(-1)} />
        <span>
          tekst variant [{variant + 1}/{segment.data.length}]
        </span>
        <IconButton icon={["fal", "angle-right"]} square small onClick={() => handleSetVariant(1)} />
      </div>
      <div className="group-deleter">
        <IconButton icon={["fal", "plus"]} square small onClick={handleAddSegment} />
        <IconButton icon={["fal", "trash-alt"]} square small onClick={handleDeleteSegment} />
      </div>
      <div>
        {segment.data.length > 0 &&
          segment.data[variant].data.map((linepart, key) => {
            return (
              <React.Fragment key={key}>
                {key == 0 && (
                  <AddSegmentButton
                    icon={["fal", "map-marker-plus"]}
                    parentId={segment.data[variant].id}
                    segmentId={linepart.id}
                    isWrapper={true}
                    location="before"
                  />
                )}
                {renderLinePart(linepart, key, segment.data[variant].id)}
                <AddSegmentButton
                  icon={["fal", "map-marker-plus"]}
                  parentId={segment.data[variant].id}
                  segmentId={linepart.id}
                  isWrapper={true}
                  location="after"
                />
              </React.Fragment>
            );
          })}
        {segment.data.length > 0 && segment.data[variant].data.length == 0 && (
          <AddSegmentButton icon={["fal", "map-marker-plus"]} parentId={segment.data[variant].id} segmentId={null} isWrapper={true} location="after" />
        )}
      </div>
    </StyledRenderLineGroup>
  );
};

const renderLinePart = function (linepart, key, parentId) {
  switch (linepart.type) {
    case "text":
      return <TextBlock key={key} parentId={parentId} segment={linepart} />;
    case "array":
      return <ArrayBlock key={key} parentId={parentId} segment={linepart} />;
    case "switch":
      return <SwitchBlock key={key} parentId={parentId} segment={linepart} />;
  }
};
export default RenderLineGroup;
