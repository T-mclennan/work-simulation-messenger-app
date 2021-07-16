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
    const { recipientId, text, conversationId, sender } = req.body;

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
      const message = await Message.create({ senderId, text, conversationId });
      Conversation.incrementUnseenCount(conversationId);
      return res.json({ message, sender });
    }

    //If conversationId is valid and conversation exists
    const conversation = await Conversation.findConversationById(conversationId); 
    if (!conversation) {
      return res.sendStatus(401);
    }
    const {user1Id, user2Id} = conversation;
    if (senderId !== user1Id && senderId !== user2Id) {
      return res.sendStatus(403);
    }

    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    Conversation.incrementUnseenCount(conversation.id);

    return res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
