import {DialogContent} from "@material-ui/core";
import DialogActions from "~/components/atoms/dialog/DialogAction";
import Button from "~/components/atoms/button/Button";
import TextField from "~/components/atoms/textfield/Textfield";
import Api from "~/util/api";
import {useState, useContext} from "react";
import useForm from "~/util/form";
import {useRecoilState} from "recoil";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import Dialog from "~/components/atoms/dialog/Dialog";
import {PageContext} from "../context/pageContext";
import TagSelector from "~/components/organisms/TagSelector/TagSelector";
import IconButton from "~/components/atoms/iconButton/IconButton";

const AddWebsiteDialog = function (props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [loading, setLoading] = useState(false);
  const [form, setForm, clearForm, updateForm] = useForm({name: "", url: ""});
  const [showTagModal, setShowTagModal] = useState(false);
  const [urlCaretPosition, setUrlCaretPosition] = useState(0);
  const {fetchStore} = useContext(PageContext);

  var api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  const showTagModalToggle = () => setShowTagModal(!showTagModal);

  const handleAddWebsite = async (e) => {
    e.preventDefault();
    const response = await api.fetch({
      endpoint: api.endpoints.addPage,
      body: form,
    });

    if (!response.success) MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
    if (response.success) {
      fetchStore(Date.now());
      props.onClose();
    }
  };

  const openTagModalDialog = () => {
    const input = document.querySelector("input[name='url");
    setUrlCaretPosition(input.selectionStart);
    showTagModalToggle();
  };

  const handleTagSelect = (tag) => {
    var url = form.url;
    url = url.slice(0, urlCaretPosition) + "{" + tag + "}" + url.slice(urlCaretPosition);
    updateForm({...form, url: url});
  };

  return (
    <>
      <Dialog open={true} title="Voeg een webpagina toe" onClose={props.onClose}>
        <form onSubmit={handleAddWebsite}>
          <DialogContent>
            <TextField value="" label="Naam" name="name" value={form.name} onChange={setForm} />
            <TextField
              value=""
              label="Url"
              name="url"
              value={form.url}
              onChange={setForm}
              endAdornment={<IconButton onClick={openTagModalDialog} icon={["fal", "tag"]} />}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" loading={loading}>
              Toevoegen
            </Button>
            <Button onClick={props.onClose} disabled={loading} variant="outlined">
              Annuleren
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {showTagModal && <TagSelector input={["url"]} disableCustom={true} onTagSelect={handleTagSelect} onClose={showTagModalToggle} />}
    </>
  );
};
export default AddWebsiteDialog;
