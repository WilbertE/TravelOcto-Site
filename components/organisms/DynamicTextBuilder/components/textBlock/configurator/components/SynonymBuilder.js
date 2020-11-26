import {StyledSynonymBuilder} from "./SynonymBuilder.style";
import {Table, TableCell, TableBody, TableRow} from "@material-ui/core";
import IconButton from "~/components/atoms/iconButton/IconButton";
import TextField from "~/components/atoms/textfield/Textfield";
import DialogContent from "~/components/atoms/dialog/DialogContent";
import useForm from "~/util/form";
import {useEffect, useState} from "react";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {useRecoilState} from "recoil";

const SynonymBuilder = function ({data, ...props}) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [formData, setForm, resetForm] = useForm({synonym: ""});
  const [synonyms, setSynonyms] = useState([]);

  useEffect(() => {
    let regex = new RegExp("(\\[((.*?)\\]))", "gi");
    var match = regex.exec(props.selection);
    if (match != null) {
      if (match[0] != props.selection) {
        invalidPropInputSelection();
      } else {
        setSynonyms(match[3].split("|"));
      }
    } else if (props.selection.trim() != "") {
      var forbiddentags = [["\\{", "\\}"]];
      forbiddentags.forEach((forbiddenTag) => {
        regex = new RegExp("(" + forbiddenTag[0] + "((.*?)" + forbiddenTag[1] + "))", "gi");
        match = regex.exec(props.selection);
        if (match != null && match[0] != null) {
          invalidPropInputSelection();
          props.onClose();
        }
      });
      setSynonyms([props.selection]);
    }
  }, [props.selection]);

  const invalidPropInputSelection = () => {
    MessageboxStoreManager.AddMessage(messageboxStateAtom, {
      title: "Oops",
      content: "Je selectie bevat een synonymgroep met daarnaast extra tekst of andere speciale code.\nSelecteer alleen een synonymgroep, tekst of niets.",
      buttons: [
        {
          label: "OK",
          onClick: () => {
            props.insertSynonyms(props.selection);
          },
        },
      ],
    });
    props.onClose();
  };

  const handleAddSynonym = (e) => {
    e.preventDefault();
    const synonym = formData.synonym;
    if (synonym == "") return;
    if (synonyms.includes(synonym)) {
      const duplicateElement = document.querySelector(".table-row[data-synonym='" + synonym + "']");
      duplicateElement.classList.add("highlight");
      setTimeout(() => {
        duplicateElement.classList.remove("highlight");
      }, 3000);
    } else {
      setSynonyms([...synonyms, synonym]);
    }
    resetForm();
  };

  const handleDeleteSynonym = (synonym) => {
    let newSynonyms = [...synonyms];
    newSynonyms.splice(newSynonyms.indexOf(synonym), 1);
    setSynonyms(newSynonyms);
  };

  const handleUpdateSynonyms = () => {
    if (synonyms.length == 0) {
      props.insertSynonyms("");
    } else if (synonyms.length == 1) {
      props.insertSynonyms(synonyms.join(""));
    } else {
      const newSynonyms = [...synonyms].sort((a, b) => b.length - a.length);
      props.insertSynonyms("[" + newSynonyms.join("|") + "]");
    }
    props.onClose();
  };

  return (
    <StyledSynonymBuilder id="synonymDialog" title="Synonymen" onClose={handleUpdateSynonyms} open={true} disableBackdropClick={true}>
      <DialogContent bottomMargin>
        <div className="tableWrapper">
          <Table>
            <TableBody id="table-body">
              {synonyms.map((synonym, key) => {
                return (
                  <TableRow key={key} data-synonym={synonym} className="table-row">
                    <TableCell className="table-cell" size="small">
                      <div className="content">{synonym}</div>
                      <IconButton onClick={() => handleDeleteSynonym(synonym)} className="deleteButton" small icon={["fal", "trash-alt"]} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <form id="synonym-form" onSubmit={handleAddSynonym}>
          <TextField label="Synonym toevoegen" value={formData.synonym} onChange={setForm} name="synonym" />
          <IconButton type="submit" small square icon={["fal", "arrow-square-right"]} />
        </form>
      </DialogContent>
    </StyledSynonymBuilder>
  );
};

export default SynonymBuilder;
