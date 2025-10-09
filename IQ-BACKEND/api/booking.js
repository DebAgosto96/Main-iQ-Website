const express = require("express");
const router = express.Router();
const { Booking, User, Player, Service } = require("../database");
const authenticateJWT = require("../middleware/authenticateJWT");
const authorizeRole = require("../middleware/authorizeRole");

router.post("/", authenticateJWT, authorizeRole(["user"]), async (req, res) => {
  const { playerId, serviceId, dateTime } = req.body;
  const userId = req.user.userId;

  if (!playerId || !serviceId || !dateTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const service = await Service.findOne({ where: { id: serviceId, playerId } });
    if (!service) {
      return res.status(400).json({ error: "Invalid service or player" });
    }

    const booking = await Booking.create({
      userId,
      playerId,
      serviceId,
      dateTime,
      status: "pending",
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.get("/user", authenticateJWT, authorizeRole(["user"]), async (req, res) => {
  const userId = req.user.userId;

  const bookings = await Booking.findAll({
    where: { userId },
    include: [Service, Player],
  });

  res.json(bookings);
});

router.get("/player", authenticateJWT, authorizeRole(["player"]), async (req, res) => {
  const playerId = req.user.userId;

  const bookings = await Booking.findAll({
    where: { playerId },
    include: [Service, User],
  });

  res.json(bookings);
});

router.get("/", authenticateJWT, authorizeRole(["admin"]), async (req, res) => {
  const bookings = await Booking.findAll({
    include: [Service, User, Player],
  });

  res.json(bookings);
});

module.exports = router;
