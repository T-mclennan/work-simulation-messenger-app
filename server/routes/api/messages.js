const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, unseenByUser } = req.body;

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    if (!conversationId) {
      let conversation = await Conversation.findConversation(
        senderId,
        recipientId
      );

      //if no conversation exists, create a new one
      if (!conversation) {
        conversation = await Conversation.createConversation(senderId, recipientId);
        if (onlineUsers.includes(sender.id)) {
          sender.online = true;
        }
      }

      const conversationId = conversation.id;
      const message = await Message.create({ senderId, text, conversationId, unseenByUser });
      return res.json({ message, sender });
    }

    //If conversationId is valid and conversation exists
    const conversation = await Conversation.findConversationById(conversationId); 
    if (!conversation) {
      throw new Error('No conversation found by the Id provided.')
    }
    const {user1Id, user2Id} = conversation;

    if (senderId !== user1Id && senderId !== user2Id) {
      throw new Error('ConversationId invalid: no conversation found.');
    }

    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      unseenByUser
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
