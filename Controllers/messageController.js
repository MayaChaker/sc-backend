const { Op } = require("sequelize");
const Message = require("../Models/messageModel");

const createMessage = async (req, res) => {
  try {
    const { sender, receiver, message_content } = req.body;
    const message = await Message.create({ sender, receiver, message_content });
    res.status(201).json(message);
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
const getMessage = async (req, res) => {
  try {
    const { receiver, sender } = req.params;
    const from = Number(sender);
    const to = Number(receiver);
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender: from, receiver: to },
          { sender: to, receiver: from },
        ],
      },
      order: [["created_at", "ASC"]],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Failed to retreive message" });
  }
};
const getAllMessage = async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [["created_at", "ASC"]],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("getAllMessage error:", error);
    res.status(500).json({ error: "Messages not found" });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const { message_id } = req.params;
    const message = await Message.findByPk(message_id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    await message.destroy();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("deleteMessage error:", error);
    res.status(500).json({ error: "Failed to delete messages" });
  }
};

module.exports = {
  getMessage,
  createMessage,
  getAllMessage,
  deleteMessage,
};
