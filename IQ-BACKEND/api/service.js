const express = require("express");
const router = express.Router();
const { Service, Player } = require("../database");
const authenticateJWT = require("../middleware/authenticateJWT");
const authorizeRole = require("../middleware/authorizeRole");

// Get all services (optionally filter by playerId)
router.get("/", async (req, res) => {
  const { playerId } = req.query;
  const where = playerId ? { playerId } : {};
  const services = await Service.findAll({ where });
  res.json(services);
});

// Get specific service by id
router.get("/:id", async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) {
    return res.status(404).json({ error: "Service not found" });
  }
  res.json(service);
});

// Create a service (restricted to player & admin)
router.post(
  "/",
  authenticateJWT,
  authorizeRole(["player", "admin"]),
  async (req, res) => {
    const { name, description, price, playerId } = req.body;

    if (!name || !price || !playerId || isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Invalid input fields" });
    }

    try {
      const player = await Player.findByPk(playerId);
      if (!player) {
        return res.status(404).json({ error: "Player not found" });
      }

      const service = await Service.create({ name, description, price, playerId });
      res.status(201).json(service);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create service" });
    }
  }
);

// Update a service (restricted to player & admin)
router.put(
  "/:id",
  authenticateJWT,
  authorizeRole(["player", "admin"]),
  async (req, res) => {
    const { name, description, price } = req.body;

    try {
      const service = await Service.findByPk(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }

      if (price && (isNaN(price) || price <= 0)) {
        return res.status(400).json({ error: "Invalid price" });
      }

      service.name = name || service.name;
      service.description = description || service.description;
      service.price = price || service.price;

      await service.save();
      res.json(service);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update service" });
    }
  }
);

// Delete a service (restricted to player & admin)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole(["player", "admin"]),
  async (req, res) => {
    try {
      const service = await Service.findByPk(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }

      await service.destroy();
      res.json({ message: "Service deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete service" });
    }
  }
);

module.exports = router;
