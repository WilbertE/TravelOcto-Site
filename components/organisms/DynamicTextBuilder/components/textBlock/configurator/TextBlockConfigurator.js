import {useEffect, useRef, useState} from "react";
import {useRecoilState} from "recoil";
import DailogContent from "~/components/atoms/dialog/DialogContent";
import IconButton from "~/components/atoms/iconButton/IconButton";
import VariableSelector from "~/components/organisms/VariableSelector/VariableSelector";
import {segmentState, tagsState} from "../../../atoms";
import SynonymBuilder from "./components/SynonymBuilder";
import {StyledTextBlockConfigurator} from "./TextBlockConfigurator.style";
import {selectionExpander} from "./util/selectionExpander";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import LinkBuilder from "./components/LinkBuilder";
import {useDebounce} from "~/util/useDebounce";

const TextBlockConfigurator = function (props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [updateSegment, setUpdateSegment] = useRecoilState(segmentState);
  const [showVariableSelector, setShowVariableSelector] = useState(false);
  const [showSynonymDialog, setShowSynonymDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [selection, setSelection] = useState({start: 0, end: 0, content: ""});
  const messageboxStateAtom = useRecoilState(messageboxState);
  const textareaRef = useRef(null);
  const [textUpdateTime, setTextUpdateTime] = useState(0);
  const debouncedText = useDebounce(textUpdateTime, 500);
  const toggleVariableDialog = () => setShowVariableSelector(!showVariableSelector);
  const toggleSynonymDialog = () => setShowSynonymDialog(!showSynonymDialog);
  const toggleLinkDialog = () => setShowLinkDialog(!showLinkDialog);

  useEffect(() => {
    handleTextareaChange();
  }, [debouncedText]);

  const handleSelectionChange = (typing) => {
    const selectionStart = textareaRef.current.selectionStart;
    const selectionEnd = textareaRef.current.selectionEnd;
    var {adjustedStart, adjustedEnd} = selectionExpander(textareaRef.current.value, selectionStart, selectionEnd);
    setSelection({start: adjustedStart, end: adjustedEnd, content: textareaRef.current.value.substring(adjustedStart, adjustedEnd)});
    if (typing == null) {
      console.log("Set selection");
      requestAnimationFrame(() => {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(adjustedStart, adjustedEnd);
      });
    }
  };

  const handleSelectionClear = () => {
    if (textareaRef.current.selectionStart != textareaRef.current.selectionEnd) {
      textareaRef.current.setSelectionRange(0, 0);
    }
  };

  const insertTag = (startTag, endTag) => {
    var data = textareaRef.current.value;
    var startData = data.substring(0, selection.start);
    var middleData = data.substring(selection.start, selection.end);
    var endData = data.substring(selection.end);

    textareaRef.current.value = startData + startTag + middleData + endTag + endData;
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(selection.start, selection.start + startTag.length + middleData.length + endTag.length);
    handleTextareaChange();
  };

  const replaceTag = (tag) => {
    var data = textareaRef.current.value;
    var startData = data.substring(0, selection.start);
    var endData = data.substring(selection.end);
    textareaRef.current.value = startData + tag + endData;
    requestAnimationFrame(() => {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(selection.start, selection.start + tag.length);
      handleTextareaChange();
    });
  };

  const handleNumericConverter = () => {
    let regex = new RegExp("(\\{#((.*?)\\}))", "gi");
    let match = regex.exec(selection.content);
    if (match != null) {
      replaceTag("{" + match[3] + "}");
    } else {
      regex = new RegExp("(\\{((.*?)\\}))", "gi");
      match = regex.exec(selection.content);
      if (match != null) {
        replaceTag("{#" + match[3] + "}");
      } else {
        MessageboxStoreManager.AddMessage(messageboxStateAtom, {
          title: "Oops",
          content: "Je kunt de nummerieke omvormer alleen gebruiken op variabelen.",
        });
      }
    }
  };

  const handleSelectVariable = (variable) => {
    replaceTag("{" + variable + "}");
    toggleVariableDialog();
    handleTextareaChange();
  };

  const handleTextareaChange = () => {
    handleSelectionChange();
    let newSegment = JSON.parse(JSON.stringify(props.segment));
    newSegment.data = textareaRef.current.value;
    setUpdateSegment({
      parentId: props.parentId,
      id: newSegment.id,
      data: newSegment.data,
    });
  };

  return (
    <>
      <StyledTextBlockConfigurator>
        <textarea
          ref={textareaRef}
          onMouseDown={handleSelectionClear}
          onMouseUp={handleSelectionChange}
          onFocus={handleSelectionChange}
          onKeyUp={() => handleSelectionChange(true)}
          onChange={() => setTextUpdateTime(Date.now())}
          defaultValue={props.segment.data}
        />
        <div className="tools">
          <div>
            <IconButton onClick={() => insertTag("**", "**")} className="configButton bold" icon={["fal", "bold"]} square small />
            <IconButton onClick={() => insertTag("__", "__")} className="configButton italic" icon={["fal", "italic"]} square small />
            <IconButton onClick={toggleVariableDialog} icon={["fal", "tag"]} className="configButton" square small />
            <IconButton onClick={toggleSynonymDialog} icon={["fal", "retweet"]} className="configButton" square small />
            <IconButton onClick={handleNumericConverter} icon={["fal", "sort-numeric-up-alt"]} className="configButton" square small />
            <IconButton icon={["fal", "link"]} onClick={toggleLinkDialog} className="configButton" square small />
          </div>
          <div>
            <IconButton onClick={props.onClose} className="configButton save" icon={["fal", "check"]} square small />
          </div>
        </div>
      </StyledTextBlockConfigurator>
      {showVariableSelector && <VariableSelector onClose={toggleVariableDialog} onSelect={handleSelectVariable} tags={tags} allowed={["string", "number"]} />}
      {showSynonymDialog && <SynonymBuilder insertSynonyms={replaceTag} selection={selection.content} onClose={toggleSynonymDialog} />}
      {showLinkDialog && <LinkBuilder insertLink={replaceTag} selection={selection.content} onClose={toggleLinkDialog} />}
    </>
  );
};

export default TextBlockConfigurator;
