import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Grid} from "@material-ui/core";
import IconButton from "~/components/atoms/iconButton/IconButton";
import IconPicker from "~/components/atoms/iconPicker/IconPicker";
import Select from "~/components/atoms/Select/Select";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import {defaultMenuDataProps, defaultMenuProps} from "./defaultProps";
import {StyledMenuConfigurator} from "./MenuConfigurator.style";
import {useRecoilState} from "recoil";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import TextField from "~/components/atoms/textfield/Textfield";
import {useEffect, useState} from "react";
import Api from "~/util/api";
import {deleteComponentState, updateComponentState} from "~/components/organisms/PageEditor/componentAtoms";

const MenuConfigurator = function ({component, form, setForm, resetForm, updateForm, setBeforeSave, data, ...props}) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [updateComponent, setUpdateComponent] = useRecoilState(updateComponentState);
  const [menu, setMenu] = useState(null);
  const [menuName, setMenuName] = useState(data.name);
  const [loading, setLoading] = useState(false);

  const handleUpdateMenu = (newMenu) => {
    setMenu(newMenu);
    setForm({target: {name: "menuId", value: component.data.menuId}});
    setForm({target: {name: "lastUpdated", value: Date.now()}});
    setBeforeSave({asyncFunc: () => handleSaveMenu({menu: newMenu, time: Date.now()})});
  };

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  useEffect(() => {
    handleUpdateMenu(data);
  }, [data, menuName]);

  const handleSaveMenu = async (data) => {
    var response = await api.fetch({
      endpoint: api.endpoints.saveMenu,
      urlReplacements: [["menuId", component.data.menuId]],
      body: {
        name: menuName,
        data: JSON.stringify({menuItems: data.menu.menuItems}),
      },
    });
  };

  const updateMenuItem = (e, index) => {
    var name = e.target.name;
    var value = e.target.value;
    var newMenu = JSON.parse(JSON.stringify(menu));
    newMenu.menuItems[index][name] = value;
    handleUpdateMenu(newMenu);
  };

  const handleAddItem = (index) => {
    var newMenu = JSON.parse(JSON.stringify(menu));
    var addMenuItem = defaultMenuDataProps.menuItems[0];
    newMenu.menuItems.splice(index + 1, 0, addMenuItem);
    handleUpdateMenu(newMenu);
  };

  const handleDelete = (index) => {
    MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
      title: "Menu item verwijderen?",
      content: "Weet je zeker dat je dit menu item wilt verwijderen?",
      confirm: {
        label: "Verwijderen",
        color: "warning",
        onClick: () => {
          handleDeleteConfirm(index);
        },
      },
    });
  };

  const handleDeleteConfirm = (index) => {
    var newMenu = JSON.parse(JSON.stringify(menu));
    newMenu.menuItems.splice(index, 1);
    handleUpdateMenu(newMenu);
  };

  return (
    <>
      <StyledMenuConfigurator>
        <Grid container>
          {menu == null && (
            <Grid item xs={12} className="no-menu-loaded">
              Open een bestaand menu of maak een nieuw menu.
            </Grid>
          )}
          {menu && (
            <Grid className="name-wrapper" item xs={12}>
              <TextField label="Menu naam" name="name" value={menuName} onChange={(e) => setMenuName(e.target.value)} />
            </Grid>
          )}
          {menu &&
            menu.menuItems &&
            menu.menuItems.map((menuItem, index) => {
              return (
                <React.Fragment key={index}>
                  {index == 0 && (
                    <div className="add-menu-item" onClick={() => handleAddItem(0)}>
                      <FontAwesomeIcon className="add-menu-icon" icon={["fal", "plus"]} />
                    </div>
                  )}
                  {index > 0 && <div className="divider"></div>}
                  <Grid item xs={11}>
                    <Grid container spacing={2}>
                      <Grid item xs={1}>
                        <IconPicker name="icon" onChange={(e) => updateMenuItem(e, index)} value={menuItem.icon} />
                      </Grid>
                      <Grid item xs={5}>
                        <TextFieldWithTag
                          value={menuItem.label}
                          allowed={["string", "integer"]}
                          label="Tekst"
                          name="label"
                          tags={component.tags.map((t) => t.name)}
                          onChange={(e) => updateMenuItem(e, index)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextFieldWithTag
                          value={menuItem.title}
                          allowed={["string", "integer"]}
                          label="Titel"
                          name="title"
                          tags={component.tags.map((t) => t.name)}
                          onChange={(e) => updateMenuItem(e, index)}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextFieldWithTag
                          value={menuItem.url}
                          tags={component.tags.map((t) => t.name)}
                          allowed={["string", "integer"]}
                          label="Url"
                          name="url"
                          onChange={(e) => updateMenuItem(e, index)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Select
                          label="target"
                          name="target"
                          value={menuItem.target}
                          onChange={(e) => updateMenuItem(e, index)}
                          items={[
                            {label: "Openen op dezelfde pagina", value: "_self"},
                            {label: "Openen op nieuwe pagina", value: "_blank"},
                          ]}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Select
                          label="Relationship"
                          name="rel"
                          value={menuItem.rel}
                          onChange={(e) => updateMenuItem(e, index)}
                          items={[
                            {label: "Standaard", value: "-"},
                            {label: "Sponsored", value: "sponsored"},
                            {label: "No Referrer", value: "noreferrer"},
                            {label: "No Opener", value: "noopener"},
                            {label: "No Follow", value: "nofollow"},
                            {label: "Auteur", value: "author"},
                            {label: "User Generated", value: "ugc"},
                          ]}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1} className="delete-column">
                    <IconButton icon={["fal", "trash-alt"]} onClick={() => handleDelete(index)} />
                  </Grid>
                  <div className="add-menu-item" onClick={() => handleAddItem(index)}>
                    <FontAwesomeIcon className="add-menu-icon" icon={["fal", "plus"]} />
                  </div>
                </React.Fragment>
              );
            })}
        </Grid>
      </StyledMenuConfigurator>
    </>
  );
};

export default MenuConfigurator;
