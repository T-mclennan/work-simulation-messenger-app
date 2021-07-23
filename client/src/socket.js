import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  incrementUnseenCountOfConvo,
  setMessageReadInConvo, 
  newTypingNotification
} from "./actions/conversationActions";
import { updateLastSeenExternally, logout } from "./actions/thunkCreators"

const token = localStorage.getItem("messenger-token");
// console.log(`http://localhost:3001`)
const socket = io("http://localhost:3001");
// const socket = io(window.location.origin);
socket.removeAllListeners()

socket.on("connect", () => {

  //Server will authenticated user before allowing socket connection
  socket.emit('authentication', {token});
  socket.on('unauthorized', function(err){
    console.log("There was an error with the authentication:", err.message);
  });
  
  socket.on('authenticated', function() {

    socket.on("add-online-user", (id) => {
      console.log('socket - ADD ONLINE USER: ', id)
      store.dispatch(addOnlineUser(id));
    });

    socket.on("remove-offline-user", (id) => {
      store.dispatch(removeOfflineUser(id));
    });

    socket.on("user-is-typing", (data) => {
      const { convoId, recepientId, action } = data;
      const { user } = store.getState();
      if (recepientId === user.id) {
        store.dispatch(newTypingNotification(convoId, action));
      }
    });

    socket.on("new-message", (data) => {
      const { message, sender } = data
      const { activeConversationUserId} = store.getState();
      const {id, conversationId, senderId} = message;

      console.log(`********** INCOMING NEW MESSAGE FROM ${senderId} of id ${id}**********`)
      //if incoming message is not part of current conversation, mark as unseen.
      //If it is, mark as last message seen in database, and notify through websocket.
      console.log('active convo')
      console.log(`${activeConversationUserId} - ${senderId}`)
      console.log((activeConversationUserId !== senderId))
      if (activeConversationUserId !== senderId) {
        store.dispatch(incrementUnseenCountOfConvo(conversationId));
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

    socket.on("disconnect", () => {
      console.log(`***************  DISCONNECTED FROM SOCKET  *****************`)
      store.dispatch(logout());
    });
  });
});

//Broadcasts user typing events - action should be 'isTyping' or 'stoppedTyping'.
export const broadcastTypingAction = (convoId, recepientId, action) => {
  socket.emit("user-typing", {
    convoId, recepientId, action
  });
}


//Broadcasts message seen event.
export const broadcastMessageSeen = (convoId, messageId, senderId) => {
  console.log(`WEBSOCKET BROADCAST AS SEEN: msg:${messageId} sender:${senderId}`)
  socket.emit("message-seen", {
    convoId, messageId, senderId
  });
}


export default socket;
