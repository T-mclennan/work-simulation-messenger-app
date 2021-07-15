const { Op } = require("sequelize");
const db = require("../db");

const Conversation = db.define("conversation", {});
// TODO: Update model to set required fields like user1Id and user2Id


// find conversation given two user Ids
Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });
  return conversation;
}

// find conversation given two user Ids
Conversation.findConversationById = async function (conversationId) {
  const conversation = await Conversation.findOne({
    where: {
      id: conversationId
    }
  });
  // return conversation or null if it doesn't exist
  return conversation;
}

Conversation.createConversation = async function (senderId, recipientId) {
  if (isNaN(senderId) || isNaN(recipientId)) {
    throw new Error("Error: Conversation could not be created. Two valid user Id's are needed.")
  }
  conversation = await Conversation.create({
    user1Id: senderId,
    user2Id: recipientId,
  });

  return conversation;
}

module.exports = Conversation;
