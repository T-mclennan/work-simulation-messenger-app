const { Op } = require("sequelize");
const db = require("../db");


const Conversation = db.define("conversation", {});

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

Conversation.findConversationById = async function (conversationId) {
  const conversation = await Conversation.findByPk(conversationId)
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
