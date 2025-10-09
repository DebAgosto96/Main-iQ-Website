// routes/player.js
const express = require("express");
const router = express.Router();
const { Player } = require("../database");

const authenticateJWT = require("../middleware/authenticateJWT");
const authorizeRole = require("../middleware/authorizeRole");

const { body, validationResult } = require("express-validator");
const validator = require("validator");

// ---- Protect ALL player routes: valid JWT + role player/admin ----
router.use(authenticateJWT);
router.use(authorizeRole(["player", "admin"])); // both roles can read; writes checked per-owning user

/**
 * GET /api/player/profile
 * Return the current logged-in player's profile (by JWT's userId).
 */
router.get("/profile", async (req, res) => {
  try {
    const me = await Player.findOne({ where: { userId: req.user.userId } });
    if (!me) return res.status(404).json({ error: "Player profile not found" });
    return res.json(me);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch player profile" });
  }
});

/**
 * GET /api/player
 * List players (requires auth).
 */
router.get("/", async (_req, res) => {
  try {
    const players = await Player.findAll();
    return res.status(200).json(players);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch players" });
  }
});

/**
 * GET /api/player/:id
 * Fetch a player by primary key (requires auth).
 * FIXED: sends getIDPlayer instead of undefined 'players'.
 */
router.get("/:id", async (req, res) => {
  try {
    const getIDPlayer = await Player.findByPk(req.params.id);
    if (!getIDPlayer) {
      return res.status(404).json({ error: "Player not found" });
    }
    return res.status(200).json(getIDPlayer); // ✅ fixed
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch player by id" });
  }
});

/**
 * PATCH /api/player/:id
 * Update a player; only the owner (matching userId) or an admin can update.
 */
router.patch(
  "/:id",
  [
    body("bio")
      .optional()
      .isString()
      .trim()
      .isLength({ max: 2000 })
      .withMessage("Bio too long")
      .customSanitizer((v) => validator.stripLow(v, true)),
    body("tags")
      .optional()
      .isArray()
      .withMessage("Tags must be an array")
      .custom((tags) => tags.every((tag) => /^[a-z0-9-]{1,32}$/i.test(tag)))
      .withMessage("Invalid tag format"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const player = await Player.findByPk(req.params.id);
      if (!player) return res.status(404).json({ error: "Player not found" });

      // Ownership or admin check
      const isAdmin = req.user.role === "admin";
      const isOwner = req.user.userId && req.user.userId === player.userId;
      if (!isAdmin && !isOwner) {
        return res
          .status(403)
          .json({ error: "Forbidden: you cannot edit this player" });
      }

      const updatedPlayer = await player.update(req.body);
      return res.json(updatedPlayer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update player" });
    }
  }
);

module.exports = router;
