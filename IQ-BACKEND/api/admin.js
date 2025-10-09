const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const authenticateJWT = require("../middleware/authenticateJWT");
const authorizeRole = require("../middleware/authorizeRole");
const { db, User, Player } = require("../database");

// --- NEW: GET /api/admin/profile ---
router.get(
  "/profile",
  authenticateJWT,
  authorizeRole(["admin"]),
  async (req, res) => {
    try {
      const me = await User.findByPk(req.user.userId, {
        attributes: ["id", "username", "email", "role", "bio", "imageUrl", "adminSocialLinks"],
      });
      if (!me) return res.status(404).json({ error: "Admin not found" });
      const adminSocialLinks = Array.isArray(me.adminSocialLinks) ? me.adminSocialLinks : [];
      res.json({
        id: me.id,
        username: me.username,
        email: me.email,
        role: me.role,
        bio: me.bio,
        imageUrl: me.imageUrl,
        adminSocialLinks,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to load admin profile" });
    }
  }
);

// (existing) POST /api/admin/players — keep your current implementation
router.post(
  "/players",
  authenticateJWT,
  authorizeRole(["admin"]),
  [
    body("firstName").trim().notEmpty(),
    body("lastName").trim().notEmpty(),
    body("username").trim().isLength({ min: 3, max: 32 }),
    body("email").trim().isEmail().bail().customSanitizer(v => String(v).trim().toLowerCase()),
    body("password").isString().isLength({ min: 6 }),
    body("gamerTag").trim().isLength({ min: 2, max: 64 }),
    body("profilePic").optional().isURL(),
    body("dateOfBirth").optional().isISO8601().toDate(),
    body("country").optional().isString().trim().isLength({ max: 64 }),
    body("address").optional().isString().trim().isLength({ max: 255 }),
    body("phoneNumber").optional().isString().trim().isLength({ max: 64 }),
    body("bio").optional().isString().isLength({ max: 2000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {
      firstName, lastName, username, email, password, gamerTag,
      profilePic, dateOfBirth, country, address, phoneNumber, bio
    } = req.body;

    try {
      const result = await db.transaction(async (t) => {
        const user = await User.create({
          firstName,
          lastName,
          username,
          email,
          role: "player",
          passwordHash: await bcrypt.hash(password, 12),
        }, { transaction: t });

        const player = await Player.create({
          userId: user.id,
          firstName,
          lastName,
          gamerTag,
          email,
          profilePic: profilePic || undefined,
          dateOfBirth: dateOfBirth || null,
          country: country || null,
          address: address || null,
          phoneNumber: phoneNumber || null,
          bio: bio || null,
        }, { transaction: t });

        return { user, player };
      });

      res.status(201).json({
        message: "Player created successfully",
        user:   { id: result.user.id, username: result.user.username, role: result.user.role },
        player: { id: result.player.id, gamerTag: result.player.gamerTag }
      });
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ error: "Username/Email/GamerTag already exists" });
      }
      console.error(e);
      res.status(500).json({ error: "Failed to create player" });
    }
  }
);

module.exports = router;
