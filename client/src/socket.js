import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  incrementUnseenCountOfConvo,
  newTypingNotification
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

  socket.on("user-is-typing", (data) => {
    const { convoId, recepientId, action } = data;
    const { user } = store.getState();
    if (recepientId === user.id) {
      store.dispatch(newTypingNotification(convoId, action));
    }
  });
});

//Broadcasts user typing events - action should be 'isTyping' or 'stoppedTyping'.
export const broadcastTypingAction = (convoId, recepientId, action) => {
  socket.emit("user-typing", {
    convoId, recepientId, action
  });
}


export default socket;
