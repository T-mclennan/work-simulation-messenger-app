/** Express router providing conversation related routes
 * @module routers/api/conversation
 */const router = require("express").Router();

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
router.patch("/viewed/:id/:userId/:messageId", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    // userId is the recipient of the unseen message. Given this we can verify that
    // this action is authorized by comparing it to userId found in the request header. 
    const authId = req.user.id;
    const userId = req.params.userId;
    if (authId != userId) return res.sendStatus(403);

    const id = req.params.id
    const messageId = req.params.messageId

    const resetConvo = await Conversation.resetUnseenCount(id);
    if(!resetConvo) throw ('Error while resetting unseen count of conversation.');

    const updatedConvo = await Conversation.setLastUnseenMessageForUser(
      id, userId, messageId
    );
    if(!updatedConvo) throw ('Error while setting last message of user.');

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
