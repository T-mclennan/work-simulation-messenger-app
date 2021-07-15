const router = require("express").Router();
const Conversation = require("../../db/models/conversation")
const {composeConversationData} = require("../../services/api")

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const conversations = await Conversation.findConversationByUserId(req.user.id);
    const convoData = composeConversationData(conversations);
    
    res.json(convoData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
