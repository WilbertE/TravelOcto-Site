import {useEffect, useState} from "react";
import Button from "~/components/atoms/button/Button";
import Dialog from "~/components/atoms/dialog/Dialog";
import DialogActions from "~/components/atoms/dialog/DialogAction";
import DialogContent from "~/components/atoms/dialog/DialogContent";
import TextField from "~/components/atoms/textfield/Textfield";
import Api from "~/util/api";
import useForm from "~/util/form";
import {defaultMenuDataProps} from "./defaultProps";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {useRecoilState} from "recoil";
import {deleteComponentState, updateComponentState} from "~/components/organisms/PageEditor/componentAtoms";
import IconButton from "~/components/atoms/iconButton/IconButton";
import {StyledMenuPicker} from "./MenuPicker.style";
import {List, ListItem} from "@material-ui/core";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";

const MenuPicker = function (props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [form, setForm, resetForm, updateform] = useForm({name: ""});
  const [loading, setLoading] = useState(false);
  const [updateComponent, setUpdateComponent] = useRecoilState(updateComponentState);
  const [menus, setMenus] = useState([]);

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    var response = await api.fetch({
      endpoint: api.endpoints.readMenus,
    });
    if (response != null && response.success == false) MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
    if (response != null && response.success == true) setMenus(response.result);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (form.name == "") {
      MessageboxStoreManager.AddMessage(messageboxStateAtom, {title: "Oops", content: "Vul een naam voor het menu in"});
      return;
    }
    var data = defaultMenuDataProps;
    var response = await api.fetch({
      endpoint: api.endpoints.createMenu,
      body: {
        name: form.name,
        data: JSON.stringify(data),
      },
    });
    if (response != null && response.success == false) {
      MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
    }
    if (response != null && response.success == true) {
      const newComponent = JSON.parse(JSON.stringify(props.component));
      newComponent.data.menuId = response.result.id;
      newComponent.data.lastUpdated = Date.now();
      setUpdateComponent(newComponent);
      resetForm();
      props.onClose();
    }
  };

  const handleSelect = (e, id) => {
    if (e.target.classList.contains("list-options") || e.target.closest(".list-options") != null) return;
    const newComponent = JSON.parse(JSON.stringify(props.component));
    newComponent.data.menuId = id;
    newComponent.data.lastUpdated = Date.now();
    setUpdateComponent(newComponent);
    resetForm();
    props.onClose();
  };

  const handleDelete = (id) => {
    MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
      title: "Menu verwijderen?",
      content:
        "Weet je zeker dat je dit menu wilt verwijderen?\n\nLet op dat dit niet ongedaan gemaakt kan worden en als er pagina's zijn die dit menu gebruiken geen menu meer tonen.",
      confirm: {
        label: "Verwijderen",
        color: "warning",
        onClick: () => handleConfirmDelete(id),
      },
    });
  };

  const handleConfirmDelete = async (id) => {
    var response = await api.fetch({
      endpoint: api.endpoints.deleteMenu,
      urlReplacements: [["menuId", id]],
    });
    MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
    if (response != null && response.success == true) loadMenus();
  };

  return (
    <StyledMenuPicker title="Menu" onClose={props.onClose} open={true}>
      <DialogContent bottomMargin>
        <div className="list-wrapper">
          {loading && <LoadingIndicator />}
          {menus && (
            <List>
              {menus.map((menu, key) => {
                return (
                  <ListItem onClick={(e) => handleSelect(e, menu.id)} className="list-item" key={key} button>
                    <div className="list-content">{menu.name}</div>
                    <div className="list-options">
                      <IconButton icon={["fal", "trash-alt"]} onClick={() => handleDelete(menu.id)} />
                    </div>
                  </ListItem>
                );
              })}
            </List>
          )}
        </div>
        <form onSubmit={handleSave} className="create-menu-form">
          <TextField label="Nieuw menu aanmaken" onChange={setForm} name="name" value={form.name} />
          <IconButton type="submit" small square icon={["fal", "arrow-square-right"]} />
        </form>
      </DialogContent>
    </StyledMenuPicker>
  );
};

export default MenuPicker;
