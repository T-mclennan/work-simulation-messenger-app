import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  incrementUnseenCountOfConvo,
  setMessageReadInConvo
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
    const { activeConversationUserId } = store.getState();

    //if incoming message is not part of current conversation, mark as unseen.
    if (activeConversationUserId !== message.senderId) {
      store.dispatch(incrementUnseenCountOfConvo(message.conversationId));
    } 

    store.dispatch(setNewMessage(message, sender));
  });

  socket.on("message-seen", (data) => {
    const { user } = store.getState();
    const { convoId, messageId, recipientId } = data
    if (user.id === recipientId) {
      store.dispatch(setMessageReadInConvo(convoId, messageId));
    }
  });
});

//Broadcasts message seen event.
export const broadcastMessageSeen = (convoId, messageId, recipientId) => {
  socket.emit("message-seen", {
    convoId, messageId, recipientId
  });
}


export default socket;
