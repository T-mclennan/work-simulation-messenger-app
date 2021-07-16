import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  incrementUnseenCountOfConvo
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
    const { message, sender } = data
    const { activeConversation } = store.getState();

    //if incoming message is not part of current conversation, mark as unseen.
    if (activeConversation !== message.senderId) {
      store.dispatch(incrementUnseenCountOfConvo(message.conversationId));
    } 

    store.dispatch(setNewMessage(message, sender));
  });
});

export default socket;
