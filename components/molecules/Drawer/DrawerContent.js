import {StyledDrawerContent} from "./DrawerContent.style";
import {ListItem, ListItemText} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";

const DrawerContent = function (props) {
  const router = useRouter();

  const menuItems = [];
  const registerMenuItem = function (icon, url, label) {
    menuItems.push({icon: icon, url: url, label: label});
  };
  registerMenuItem("tachometer-alt-fastest", "/cms/dashboard", "Dashboard");
  registerMenuItem("copy", "/cms/pages", "Pagina's");
  registerMenuItem("align-left", "/cms/articles", "Artikelen");

  const handleMenuClick = (url) => router.push(url);

  return (
    <StyledDrawerContent>
      {menuItems.map((menuItem, key) => {
        return (
          <ListItem
            button
            key={key}
            onClick={() => {
              handleMenuClick(menuItem.url);
            }}>
            <FontAwesomeIcon className="icon" icon={["fal", menuItem.icon]} />
            <ListItemText primary={menuItem.label} />
          </ListItem>
        );
      })}
    </StyledDrawerContent>
  );
};
export default DrawerContent;
