const router = require("express").Router();
const {
  addMessage,
  getAllMessages,
} = require("../controllers/messageController");
const {} = require("../controllers/usersControllers");

router.post("/addMessage", addMessage);
router.post("/getMessages", getAllMessages);

module.exports = router;
