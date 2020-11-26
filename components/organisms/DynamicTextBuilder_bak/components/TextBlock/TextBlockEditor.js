import {StyledDialog, StyledTextBlockEditor} from "./TextBlockEditor.style";
import {useState} from "react";
import Pagination from "@material-ui/lab/Pagination";
import {textToHtml} from "../../util/TextToHtml";
import DialogContent from "@material-ui/core/DialogContent";
import dynamic from "next/dynamic";
import IconButton from "~/components/atoms/iconButton/IconButton";

const TextEditor = dynamic(() => import("../TextEditor/TextEditor"), {
  ssr: false,
});

const TextBlockEditor = function ({data, variant, ...props}) {
  const [activePage, setActivePage] = useState(variant);
  const [editor, setEditor] = useState({openEditor: false, editId: null, text: ""});
  data = JSON.parse(JSON.stringify(data));

  const handlePageChange = (e, page) => {
    setActivePage(page - 1);
  };

  const handleSave = (text) => {
    if (editor.editId != null) {
      data.content[editor.editId] = text;
    } else {
      data.content.push(text);
    }
    props.onUpdate(props.index, data);
    handleModeChange();
  };

  const handleModeChange = () => setEditor({editId: null, text: "", openEditor: !editor.openEditor});

  const handleEdit = () => {
    const editText = JSON.parse(data.content[activePage]);
    setEditor({editId: activePage, text: editText, openEditor: true});
  };

  const content = JSON.parse(data.content[activePage]).blocks[0].data.text;

  return (
    <StyledDialog title="Tekst blok met varianten" disableCloseButton={editor.openEditor} open={true} disableBackdropClick={true} onClose={props.onClose}>
      <DialogContent>
        <StyledTextBlockEditor className={editor.openEditor && "edit-mode"}>
          <div className="preview" dangerouslySetInnerHTML={{__html: textToHtml(content)}} />
          <div className="toolbar switcher">
            <div className="switcher-start">
              <IconButton small className="edit-button" icon={["fal", "edit"]} onClick={handleEdit} />
            </div>
            <Pagination siblingCount={2} page={activePage + 1} count={data.content.length} onChange={handlePageChange} />
            <div className="switcher-end">
              <IconButton className="add-button" small icon={["fal", "plus"]} onClick={handleModeChange} />
            </div>
          </div>
          {editor.openEditor && (
            <div className="add-text-variant-wrapper">
              <TextEditor data={editor.text} onSave={handleSave} onCancel={handleModeChange} />
            </div>
          )}
        </StyledTextBlockEditor>
      </DialogContent>
    </StyledDialog>
  );
};

export default TextBlockEditor;
