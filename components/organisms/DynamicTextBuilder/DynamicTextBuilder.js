import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import DailogContent from "~/components/atoms/dialog/DialogContent";
import {StyledDynamicTextBuilder} from "./DynamicTextBuilder.style";
import {addSegmentState, configuratorState, segmentState, tagsState, deleteSegmentState} from "./atoms";
import {findComponentInTree} from "./util/findSegmentInTree";
import DialogActions from "~/components/atoms/dialog/DialogAction";
import Button from "~/components/atoms/button/Button";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";

import RenderComponentGroup from "./render/RenderComponentGroup";

const DynamicTextBuilder = function (props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [openConfigurator, setOpenConfigurator] = useRecoilState(configuratorState);
  const [updateSegment, setUpdateSegment] = useRecoilState(segmentState);
  const [addSegment, setAddSegment] = useRecoilState(addSegmentState);
  const [deleteSegment, setDeleteSegment] = useRecoilState(deleteSegmentState);
  const [data, setData] = useState([]);
  const [changeDetected, setChangeDetected] = useState(false);

  useEffect(() => {
    setData(props.componentData);
  }, []);

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags]);

  useEffect(() => {
    props.onChange({
      target: {
        name: props.name,
        value: data,
      },
    });
  }, [data]);

  //Update segment
  useEffect(() => {
    if (updateSegment != null) {
      let newData = JSON.parse(JSON.stringify(data));
      const parent = updateSegment.parentId == null ? newData : findComponentInTree(newData, updateSegment.parentId).segment.data;
      if (parent != null) {
        let {segment, index} = findComponentInTree(parent, updateSegment.id);
        segment.data = updateSegment.data;
        setData(newData);
      }
      setChangeDetected(true);
      setUpdateSegment(null);
    }
  }, [updateSegment]);

  //Add segment
  useEffect(() => {
    if (addSegment != null) {
      let newData = JSON.parse(JSON.stringify(data));
      const parent = addSegment.parentId == null ? newData : findComponentInTree(newData, addSegment.parentId).segment.data;
      if (parent != null) {
        if (addSegment.segmentId == null) parent.push(addSegment.segment);
        if (addSegment.segmentId != null) {
          let {segment, index} = findComponentInTree(parent, addSegment.segmentId);
          if (addSegment.location == "after") index++;
          let parentArr = Array.isArray(parent) ? parent : parent.data;
          parentArr.splice(index, 0, addSegment.segment);
        }
        setData(newData);
        setAddSegment(null);
      }
    }
  }, [addSegment]);

  //Confirm delete segment
  useEffect(() => {
    if (deleteSegment != null) {
      if (deleteSegment.skipConfirm) {
        handleDeleteSegment();
        return;
      }
      MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
        title: "Segment verwijderen?",
        content: "Weet je zeker dat je dit segment wilt verwijderen?",
        confirm: {
          onClick: handleDeleteSegment,
          label: "Verwijderen",
          color: "warning",
        },
      });
    }
  }, [deleteSegment]);

  //Delete segment
  const handleDeleteSegment = () => {
    let newData = JSON.parse(JSON.stringify(data));
    const parent = deleteSegment.parentId == null ? newData : findComponentInTree(newData, deleteSegment.parentId).segment;
    if (parent != null) {
      const {index} = findComponentInTree(parent, deleteSegment.segmentId);
      let parentArr = Array.isArray(parent) ? parent : parent.data;
      parentArr.splice(index, 1);
      setData(newData);
      setDeleteSegment(null);
    }
  };

  //Handle close
  const handleClose = () => {
    if (changeDetected) {
      MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
        title: "Wijzigingen verwijderen?",
        content: "Er zijn niet opgeslagen wijzigingen. Als je dit venster sluit worden alle wijzigen verwijderd. Weet je zeker dat je door wilt gaan?",
        confirm: {
          onClick: props.onClose,
        },
      });
    } else {
      props.onClose();
    }
  };
  return (
    <StyledDynamicTextBuilder>
      <div className="header-title">Dynamische tekst</div>
      <RenderComponentGroup components={data} />
    </StyledDynamicTextBuilder>
  );
};

export default DynamicTextBuilder;
