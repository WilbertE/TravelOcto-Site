import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ListItem} from "@material-ui/core";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import Configurable from "../Configurable";
import {defaultMenuDataProps} from "./defaultProps";
import {StyledMenu} from "./Menu.style";
import MenuConfigurator from "./MenuConfigurator";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {deleteComponentState, updateComponentState} from "~/components/organisms/PageEditor/componentAtoms";
import Api from "~/util/api";
import {useRecoilState} from "recoil";
import {useEffect, useState} from "react";
import IconButton from "~/components/atoms/iconButton/IconButton";
import MenuPicker from "./MenuPicker";

const Menu = function ({liveMode, ...props}) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [updateComponent, setUpdateComponent] = useRecoilState(updateComponentState);
  const [showMenuPickerDialog, setShowMenuPickerDialog] = useState(false);
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  useEffect(() => {
    if (props.component.data.lastUpdated != null && liveMode == false) loadMenu();
  }, [props.component.data.lastUpdated]);

  useEffect(() => {
    if (liveMode != false && props.component.data.menu) setMenu(JSON.parse(props.component.data.menu.data));
  }, []);

  const loadMenu = async () => {
    var response = await api.fetch({
      endpoint: api.endpoints.readMenu,
      urlReplacements: [["menuId", props.component.data.menuId]],
    });
    console.log(response);
    if (response != null && response.success == false) MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
    if (response != null && response.success == true) setMenu({name: response.result.name, menuItems: JSON.parse(response.result.data).menuItems});
  };

  if (liveMode == false) {
    return (
      <>
        <Configurable
          setWidth={800}
          preview={false}
          component={props.component}
          title="Menu"
          additionalButtons={<IconButton onClick={() => setShowMenuPickerDialog(true)} icon={["fal", "folder-open"]} />}
          configurator={<MenuConfigurator data={menu} />}>
          <Component data={menu} {...props} />
        </Configurable>
        {showMenuPickerDialog && <MenuPicker component={props.component} onClose={() => setShowMenuPickerDialog(false)} />}
      </>
    );
  } else {
    return <Component data={menu} {...props} />;
  }
};

const Component = function ({component, data, ...props}) {
  return (
    <>
      <StyledMenu>
        {data == null && (
          <>
            <div className="creating-menu">[Niet ingesteld menu]</div>
          </>
        )}
        {data &&
          data.menuItems &&
          Array.isArray(data.menuItems) &&
          data.menuItems.map((item, key) => {
            return (
              <ListItem key={key} className="menu-button" component="a" title={item.title} href={item.url} button>
                <FontAwesomeIcon className="menu-icon" icon={item.icon} />
                <div>{item.label}</div>
              </ListItem>
            );
          })}
      </StyledMenu>
    </>
  );
};

export default Menu;
