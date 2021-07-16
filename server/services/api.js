const onlineUsers = require("../onlineUsers");

/** composeConversationData processes the conversation data and
 * prepares it to be sent to the frontend.
 * @param {Array} conversations -  array of conversation objects
 * @returns {Array} returns an array of updated conversation objects
 */
composeConversationData = function(conversations) {
  const newConvo = new Array(conversations.length)
  for (let i = 0; i < conversations.length; i++) {
    const convo = conversations[i];
    const convoJSON = convo.toJSON();

    // set a property "otherUser" so that frontend will have easier access
    if (convoJSON.user1) {
      convoJSON.otherUser = convoJSON.user1;
      delete convoJSON.user1;
    } else if (convoJSON.user2) {
      convoJSON.otherUser = convoJSON.user2;
      delete convoJSON.user2;
    }

    // set property for online status of the other user
    if (onlineUsers.includes(convoJSON.otherUser.id)) {
      convoJSON.otherUser.online = true;
    } else {
      convoJSON.otherUser.online = false;
    }

    // set properties for notification count and latest message preview
<<<<<<< HEAD
    const lastIndex = convoJSON.messages.length-1;
    convoJSON.latestMessageText = convoJSON.messages[lastIndex].text;
=======
    convoJSON.latestMessageText = convoJSON.messages[convoJSON.messages.length-1].text;
>>>>>>> develop
    newConvo[i] = convoJSON;
  }

  return newConvo;
}

module.exports = {composeConversationData};
