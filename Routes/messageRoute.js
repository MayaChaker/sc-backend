const express = require("express");
const router = express.Router();
const {
  getMessage,
  createMessage,
  getAllMessage,
  deleteMessage,
} = require("../Controllers/messageController.js");
router.post("/", createMessage);
router.get("/:receiver/:sender", getMessage);
router.get("/", getAllMessage);
router.delete("/:message_id", deleteMessage);
module.exports = router;
