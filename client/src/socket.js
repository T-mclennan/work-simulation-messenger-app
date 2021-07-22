import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  incrementUnseenCountOfConvo,
  setMessageReadInConvo
} from "./actions/conversationActions";
import { updateLastSeenExternally } from "./actions/thunkCreators"
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
    const { activeConversationUserId} = store.getState();
    const {id, conversationId, senderId} = message;
    //if incoming message is not part of current conversation, mark as unseen.
    //If it is, mark as last message seen in database, and notify through websocket.
    if (activeConversationUserId !== message.senderId) {
      store.dispatch(incrementUnseenCountOfConvo(message.conversationId));
    } else {
      store.dispatch(updateLastSeenExternally(senderId, conversationId, id));
    }
    store.dispatch(setNewMessage(message, sender));
  });

  socket.on("message-seen", (data) => {
    const { user } = store.getState();
    const { convoId, messageId, senderId } = data
    if (user.id === senderId) {
      store.dispatch(setMessageReadInConvo(messageId, convoId));
      
    }
  });
});

//Broadcasts message seen event.
export const broadcastMessageSeen = (convoId, messageId, senderId) => {
  socket.emit("message-seen", {
    convoId, messageId, senderId
  });
}


export default socket;
