const express = require("express");
const router = express.Router();
const { Message, User } = require("../database");
const { Op } = require("sequelize");
const authenticateJWT = require("../middleware/authenticateJWT");
const authorizeRole = require("../middleware/authorizeRole");

// POST /api/message — send a message
router.post(
  "/",
  authenticateJWT,
  authorizeRole(["user", "player"]), // only users & players can send
  async (req, res) => {
    const senderId = req.user.userId;
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ error: "receiverId and content required" });
    }

    try {
      const receiver = await User.findByPk(receiverId);
      if (!receiver) {
        return res.status(404).json({ error: "Receiver not found" });
      }

      // 🚩 Users cannot message admin
      if (req.user.role === "user" && receiver.role === "admin") {
        return res.status(403).json({ error: "Users cannot message admin" });
      }

      // 🚩 Future hook: prevent user→player if no appointment (TODO)
      // if (req.user.role === "user" && receiver.role === "player") {
      //   // check appointment here
      // }

      const msg = await Message.create({
        senderId,
        receiverId,
        content
      });

      res.status(201).json(msg);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to send message" });
    }
  }
);

// GET /api/message — get all messages for logged-in user
router.get(
  "/",
  authenticateJWT,
  authorizeRole(["user", "player"]), // only users & players can view
  async (req, res) => {
    try {
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { senderId: req.user.userId },
            { receiverId: req.user.userId }
          ]
        },
        order: [["createdAt", "DESC"]]
      });

      res.json(messages);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
);

module.exports = router;
