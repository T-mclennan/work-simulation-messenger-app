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

/** The findConverSationByUserId method queries the postgres database 
 * for all conversations that contain the user with matching userId.
 * @param {Number} userId -  userId of current user.
 * @returns {Array} - array of conversation objects.
 */
Conversation.findConversationsByUserId = async function(userId) {
  const conversations = await Conversation.findAll({
    where: {
      [Op.or]: {
        user1Id: userId,
        user2Id: userId,
      },
    },
    attributes: ["id"],
    order: [[Message, "createdAt", "ASC"]],
    include: [
      { model: Message, order: ["createdAt", "ASC"] },
      {
        model: User,
        as: "user1",
        where: {
          id: {
            [Op.not]: userId,
          },
        },
        attributes: ["id", "username", "photoUrl"],
        required: false,
      },
      {
        model: User,
        as: "user2",
        where: {
          id: {
            [Op.not]: userId,
          },
        },
        attributes: ["id", "username", "photoUrl"],
        required: false,
      },
    ],
  });
  return conversations;
}

module.exports = Conversation;
