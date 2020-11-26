import {Drawer as MuiDrawer, Paper, Divider} from "@material-ui/core";
import {StyledDrawer} from "./Drawer.style";
import {DrawerContext} from "./DrawerContext";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "~/components/atoms/iconButton/IconButton";
import {useContext} from "react";
import DrawerContent from "./DrawerContent";

const Drawer = function (props) {
  const [openDrawer, setOpenDrawer] = useContext(DrawerContext);

  const handleClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Hidden mdDown implementation="css">
        <StyledDrawer variant="permanent" open={true} anchor="left">
          <img className="logo" src={require("~/assets/images/logo-text.svg").default} alt="TravelOcto.nl" />
          <Divider />
          <DrawerContent />
        </StyledDrawer>
      </Hidden>
      <Hidden mdUp implementation="css">
        <StyledDrawer
          className="mobile-drawer"
          variant="temporary"
          anchor="left"
          open={openDrawer}
          anchor="left"
          ModalProps={{
            keepMounted: true,
          }}>
          <Paper elevation={4} className="drawer-head">
            <img className="logo" src={require("~/assets/images/logo-text.svg").default} alt="TravelOcto.nl" />
            <IconButton className="close-button" icon={["fal", "times"]} onClick={handleClose} />
          </Paper>
          <DrawerContent />
        </StyledDrawer>
      </Hidden>
    </>
  );
};

export default Drawer;
