const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../db");
const Conversation = db.define("conversation", {
  unseenCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

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
    unseenCount: 0,
  });
  return conversation;
}

Conversation.incrementUnseenCount = async function (conversationId) {
  try {
    const convo = await Conversation.increment('unseenCount', {
       by: 1, where: { id: conversationId }
    });
    if (!convo) throw new Error('Error while Incrementing Conversation.');

    const updatedConvo =  await Conversation.findByPk(conversationId)
    return updatedConvo.toJSON();
  } catch(err) {
    console.log(err)
  }
}

Conversation.resetUnseenCount = async function (conversationId) {
  try {
    const convo = await Conversation.update({'unseenCount': 0}, {
      where: {id: conversationId}
    })
    if (!convo) throw new Error('Error while Updating Conversation.');

    const updatedConvo =  await Conversation.findByPk(conversationId)
    if(!updatedConvo) throw new Error('Error while Fetching Data');
    
    return updatedConvo.toJSON();
  } catch(err) {
    console.log(err)
  }
}


module.exports = Conversation;
