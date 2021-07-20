/** Express router providing conversation related routes
 * @module routers/api/conversation
 */
const router = require("express").Router();

const {Conversation} = require("../../db/models")
const {findConversationByUserId} = require("../../db/queries")
const {composeConversationData} = require("../../services/api")

/**
 * Route for fetching all conversations by a user, include latest message text for preview,
 * and all messages.include other user model so we have info on username/profile pic
 * (don't include current user info). TODO: for scalability, implement lazy loading
 * @name get/conversation
 * @route GET /api/conversation/
 * @param {Object} user - Object of user data sent in header for validation
 * @returns {Array} 200 - returns array of conversation objects
 * @returns {Error}  401 - Validation error
 */
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

/**
 * Route for resetting unseen message counter for the conversation by id.
 * @name post/conversation/viewed:id
 * @route POST /api/conversation/viewed:id
 * @param {number} id - id of given Conversation
 * @param {string} sender - Name of sender of unseen messages. Used in validation.
 * @param {Object} user - Object of user data sent in header for validation
 * @param {callback} middleware - Express middleware.
 * @returns {object} 200 - success
 * @returns {Error}  401 - Validation error
 * @returns {Error}  403 - Forbidden error
 */
router.patch("/viewed/:id/:sender", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const senderId = req.params.sender;
    console.log(`userId: ${userId}`);

    //Knowing the sender of the unseens messages we can determine who the recipient is, and
    //verify that is the same user found in the request header. 
    const conversation = await Conversation.findConversationById(req.params.id);
    console.log(conversation)

    let targetUser = null;
    if (conversation.user1Id == senderId) {
      targetUser = conversation.user2Id;
      console.log(`targetUser: ${targetUser}`)
    } else if (conversation.user2Id === senderId) {
       targetUser = conversation.user1Id;
    }

    console.log(`user1: ${conversation.user1Id}`)
    console.log(`user2: ${conversation.user2Id}`)
    console.log(`senderId: ${senderId}`);
    console.log(`targetUser: ${targetUser}`)
    if (targetUser !== userId) return res.sendStatus(403);

    const updatedConvo = await Conversation.resetUnseenCount(req.params.id);
    if(!updatedConvo) throw ('Error while Fetching Data');
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
