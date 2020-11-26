import {StyledTextEditor} from "./TextEditor.style";
import { useEffect, useState} from "react";
import IconButton from "~/components/atoms/iconButton/IconButton";
import {textToHtml} from "../../util/TextToHtml";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import SynonymBuilder from "./plugins/synonym/SynonymBuilder";
import EditorJS from "@editorjs/editorjs";
import synonymPlugin from "./plugins/synonym/synonymPlugin";
import SynonymPlugin from "./plugins/synonym/synonymPlugin";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import {useRecoilState} from "recoil";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";

const TextEditor = function (props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [formatted, setFormatted] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    setFormatted(textToHtml(props.data));
  }, []);

  useEffect(() => {
    if (formatted != null) {
      const newEditor = new EditorJS({
        holderId: "editor",
        placeholder: "Schrijf een tekst",
        data: formatted,
        tools: {
          header: {
            class: synonymPlugin,
            inlineToolbar: true,
          },
        },
        onReady: () => {
          bindSynonyms();
          setLoading(false);
        },
      });
      setEditor(newEditor);
    }
  }, [formatted]);

  const bindSynonyms = () => {
    var synonymPlugin = new SynonymPlugin();
    Array.from(document.querySelectorAll("#editor .synonym")).forEach((synonymGroup) => {
      synonymPlugin.bindToSynonymGroup(synonymGroup);
    });
  };

  const handleCancel = () => {
    editor
      .save()
      .then((outputData) => {
        var formattedText = formatted.blocks != null ? formatted.blocks[0].data.text : formatted;
        if (outputData.blocks.length > 0 && textToHtml(outputData.blocks[0].data.text) != formattedText) {
          MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
            title: "Wijziging verwijderen?",
            content: "Je gemaakte wijzigingen worden verwijderd als je door gaat.",
            confirm: {
              label: "Verwijderen",
              color: "warning",
              onClick: () => {
                props.onCancel();
              },
            },
          });
        } else {
          props.onCancel();
        }
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };

  const handleSave = () => {
    editor
      .save()
      .then((outputData) => {
        var outputStr = JSON.stringify(outputData);
        if (outputData.blocks.length == 0 || outputStr == formatted) {
          MessageboxStoreManager.AddMessage(messageboxStateAtom, {
            title: "Wijzigingen niet opgeslagen",
            content: "De tekst is ongewijzigd of leeg en is daarom niet opgeslagen.",
          });
        }
        props.onSave(outputStr);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };

  return (
    <>
      <StyledTextEditor>
        {loading && <LoadingIndicator />}
        <div id="editor" className="editor"></div>
        <div className="toolbar">
          <IconButton className="button-cancel" icon={["fal", "times"]} onClick={handleCancel} small />
          <IconButton className="button-save" icon={["fal", "check"]} onClick={handleSave} small />
        </div>
      </StyledTextEditor>
      <SynonymBuilder />
    </>
  );
};
export default TextEditor;
