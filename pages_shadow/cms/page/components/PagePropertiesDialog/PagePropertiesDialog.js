import DialogActions from "~/components/atoms/dialog/DialogAction";
import Button from "~/components/atoms/button/Button";
import {StyledPagePropertiesDialog} from "./PagePropertiesDialog.style";
import DialogContent from "~/components/atoms/dialog/DialogContent";
import useForm from "~/util/form";
import Select from "~/components/atoms/Select/Select";
import Api from "~/util/api";
import {useState, useEffect} from "react";
import {useRecoilState} from "recoil";
import {pageState} from "../../pageAtoms";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";

const PagePropertiesDialog = function (props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [page, setPage] = useRecoilState(pageState);
  const [form, setForm, resetForm, PatchForm] = useForm({title: page.meta.title, description: page.meta.description, robots: page.meta.robots});
  const [loading, setLoading] = useState(false);

  const tags = page.components.tags.map((tag) => tag.name);

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  const handleSavePageProperties = async (e) => {
    e.preventDefault();
    if (page == null) throw "PageId is not set, cannot save properties";
    var response = await api.fetch({
      endpoint: api.endpoints.setPageProperties,
      urlReplacements: [["pageId", page.id]],
      body: form,
    });
    if (response.success) setPage({...page, meta: form});
    MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
  };

  return (
    <>
      <StyledPagePropertiesDialog open={true} onClose={props.onClose} disableBackdropClick={true} title="Meta data">
        <form onSubmit={handleSavePageProperties}>
          <DialogContent>
            <TextFieldWithTag tags={tags} value={form.title} allowed={["string", "number"]} onChange={setForm} label="Pagina titel" name="title" />
            <TextFieldWithTag
              tags={tags}
              multiline
              rows={3}
              allowed={["string", "number"]}
              value={form.description}
              onChange={setForm}
              label="Pagina omschrijving"
              name="description"
            />
            <Select
              label="Robots"
              value={form.robots}
              onChange={setForm}
              name="robots"
              items={[
                {label: "all (index, follow)", value: "all"},
                {label: "noindex", value: "noindex"},
                {label: "nofollow", value: "nofollow"},
                {label: "none (noindex, nofollow)", value: "none"},
                {label: "noarchive", value: "noarchive"},
                {label: "nosnippet", value: "nosnippet"},
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button loading={loading} type="submit">
              Opslaan
            </Button>
            <Button variant="outlined" onClick={props.onClose}>
              Annuleren
            </Button>
          </DialogActions>
        </form>
      </StyledPagePropertiesDialog>
    </>
  );
};

export default PagePropertiesDialog;
