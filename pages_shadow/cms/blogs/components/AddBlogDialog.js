import {useContext, useEffect, useState} from "react";
import Button from "~/components/atoms/button/Button";
import Dialog from "~/components/atoms/dialog/Dialog";
import DialogActions from "~/components/atoms/dialog/DialogAction";
import DialogContent from "~/components/atoms/dialog/DialogContent";
import TextField from "~/components/atoms/textfield/Textfield";
import TextFieldWithChips from "~/components/atoms/textfield/TextFieldWithChips";
import Api from "~/util/api";
import useForm from "~/util/form";
import {useRecoilState} from "recoil";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {BlogContext} from "../context/blogContext";

const AddBlogDialog = function (props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [loading, setLoading] = useState(false);
  const [form, setForm, clearForm, updateForm] = useForm({name: "", url: "", tags: []});
  const {fetchStore} = useContext(BlogContext);

  useEffect(() => {
    let url = form.name.replace(/ /gi, "-");
    url = url.replace(/[^a-z0-9\-]/gi, "_").toLowerCase();
    url.replace(/_{2,}/g, "_");
    updateForm({...form, url: "/" + url});
  }, [form.name]);

  var api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const response = await api.fetch({
      endpoint: api.endpoints.addBlog,
      body: form,
    });

    if (!response.success) MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
    if (response.success) {
      fetchStore(Date.now());
      props.onClose();
    }
  };

  return (
    <>
      <Dialog open={true} title="Voeg een blog toe" onClose={props.onClose}>
        <DialogContent>
          <TextField value="" label="Naam" name="name" value={form.name} onChange={setForm} />
          <TextField value="" label="Url" name="url" value={form.url} onChange={setForm} />
          <TextFieldWithChips onChange={setForm} name="tags" tags={form.tags} label="tags" emptyLabel="Geen tags" textFieldLabel="Tag toevoegen" />
        </DialogContent>
        <DialogActions>
          <Button type="submit" loading={loading} onClick={handleAddBlog}>
            Toevoegen
          </Button>
          <Button onClick={props.onClose} disabled={loading} variant="outlined">
            Annuleren
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddBlogDialog;
