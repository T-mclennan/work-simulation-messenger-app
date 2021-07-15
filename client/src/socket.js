import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./actions/conversationActions";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    const {message, sender, senderUsername} = data
    const {activeConversation } = store.getState();

    if (message.unseenByUser){
    //if incoming message is for current conversation, mark as seen
      if (activeConversation === senderUsername) {
        message.unseenByUser = null;
        //TODO update database to reflect this change.
      } else {
        //TODO increment unseenCount for conversation
      }
    }

    store.dispatch(setNewMessage(message, sender));
  });
});

export default socket;
