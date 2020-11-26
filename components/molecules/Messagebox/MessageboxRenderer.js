import {useContext} from "react";

import Messagbox from "./Messagebox";
import {useRecoilValue} from "recoil";
import {messageboxState} from "./MessageboxAtom";

export default function MessageboxRenderer() {
  const messageboxStore = useRecoilValue(messageboxState);
  return (
    <>
      {messageboxStore &&
        messageboxStore.map((messagebox, key) => {
          return <Messagbox key={key} messagebox={messagebox} />;
        })}
    </>
  );
}
