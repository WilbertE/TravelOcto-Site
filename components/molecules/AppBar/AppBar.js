import {StyledAppBar} from "./AppBar.style";
import IconButton from "~/components/atoms/iconButton/IconButton";
import Hidden from "@material-ui/core/Hidden";
import {logout} from "~/Authentication/withAuthentication";
import {useContext} from "react";
import {DrawerContext} from "~/components/molecules/Drawer/DrawerContext";

const AppBar = function (props) {
  const [openDrawer, setOpenDrawer] = useContext(DrawerContext);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <StyledAppBar position="static">
      <div className="appbar-start">
        <Hidden lgUp implementation="css">
          <IconButton icon={["fal", "bars"]} onClick={handleOpenDrawer} />
        </Hidden>
      </div>
      <div className="appbar-title">{props.title || ""}</div>
      <div className="appbar-end">
        <IconButton icon={["fal", "sign-out-alt"]} onClick={handleLogout} />
      </div>
    </StyledAppBar>
  );
};

export default AppBar;
