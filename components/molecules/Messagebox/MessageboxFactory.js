import React, {useState} from "react";
import {v4 as guid} from "uuid";
import {useRecoilState} from "recoil";
import {messageboxState} from "./MessageboxAtom";

const MessageboxStoreManager = {
  RemoveMessage: function (messageboxStateAtom, id) {
    const [messageboxStore, setMessageboxStore] = messageboxStateAtom;
    let newStore = [...messageboxStore];
    newStore = newStore.filter((message) => message.id != id);
    setMessageboxStore(newStore);
  },

  AddConfirm: function (messageboxStateAtom, message) {
    let confirm = message.confirm;
    if (confirm == null || confirm.onClick == null) throw "Confirm.onClick is required";
    if (confirm.label == null) confirm.label = "Ok";

    let cancel = message.cancel;
    if (cancel == null) cancel = {};
    if (cancel.label == null) cancel.label = "Annuleren";

    message.buttons = [cancel, confirm];

    this.AddMessage(messageboxStateAtom, message);
  },

  AddMessage: function (messageboxStateAtom, message) {
    const [messageboxStore, setMessageboxStore] = messageboxStateAtom;
    const id = guid();
    if (!message.title) throw "Title is required";
    if (!message.content) throw "Content is required";
    if (message.buttons) {
      if (!Array.isArray(message.buttons)) throw "Buttons need to be an array";
      message.buttons.forEach((button) => {
        if (button.label == null) throw "Button needs to have a label";
      });
    }

    const buttons = message.buttons != null ? message.buttons : [{label: "OK"}];

    message = {
      id: id,
      title: message.title,
      content: parseMessage(message.content),
      buttons: buttons,
    };

    setMessageboxStore((messageboxStore) => [...messageboxStore, message]);
  },
};

const parseMessage = (content) => {
  return content.split("\n").map((str, i) => (
    <React.Fragment key={i}>
      {str}
      <br />
    </React.Fragment>
  ));
};

export default MessageboxStoreManager;
