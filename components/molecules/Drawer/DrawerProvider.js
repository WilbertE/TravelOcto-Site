import {DrawerContext} from "./DrawerContext";
import {useContext, useState} from "react";

const DrawerProvider = function (props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return <DrawerContext.Provider value={[openDrawer, setOpenDrawer]}>{props.children}</DrawerContext.Provider>;
};

export default DrawerProvider;
