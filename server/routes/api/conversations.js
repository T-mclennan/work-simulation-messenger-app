const router = require("express").Router();
const {Conversation} = require("../../db/models")
const {findConversationByUserId} = require("../../db/queries")
const {composeConversationData} = require("../../services/api")

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  const {user} = req;
  try {
    if (!user) {
      return res.sendStatus(401);
    }
    const conversations = await findConversationByUserId(user.id);
    const convoData = composeConversationData(conversations);
    res.json(convoData);
  } catch (error) {
    next(error);
  }
});

// Resets the counter for a given conversation based on id
router.post("/viewed", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    if (req.query.id) {
      const updatedConvo = await Conversation.resetUnseenCount(req.query.id)
      if(!updatedConvo) throw ('Error while Fetching Data');
      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
