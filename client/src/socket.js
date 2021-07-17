import io from "socket.io-client";
import store from "./store";
import { v4 as uuidv4 } from 'uuid';
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  incrementUnseenCountOfConvo,
  newTypingNotification
} from "./actions/conversationActions";

let socketId = localStorage.getItem("socket-id");
let token = localStorage.getItem("token");

if (!socketId) {
  socketId = uuidv4()
  localStorage.setItem("socket-id", socketId);
}

const socket = io(window.location.origin, {query: {socketId}});

socket.on("connect", () => {

  //Server will authenticated user before allowing socket connection
  socket.emit('authentication', {token});
  socket.on('unauthorized', function(err){
    console.log("There was an error with the authentication:", err.message);
  });
  
  socket.on('authenticated', function() {
    
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
});

//Broadcasts user typing events - action should be 'isTyping' or 'stoppedTyping'.
export const broadcastTypingAction = (convoId, recepientId, action) => {
  socket.emit("user-typing", {
    convoId, recepientId, action
  });
}


export default socket;
