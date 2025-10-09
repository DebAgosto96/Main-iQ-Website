const express = require("express");
const router = express.Router();
const { User } = require("../database");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const authenticateJWT = require("../middleware/authenticateJWT");
const authorizeRole = require("../middleware/authorizeRole");
const { body, validationResult } = require("express-validator");
const sanitizeHtml = require("sanitize-html");
// --- helpers ---
const stripAllHtml = (s) =>
  sanitizeHtml(s ?? "", { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();

// Import rate limiter from middleware
const { userWriteLimiter } = require("../middleware/limiters");

// --- multer (auto-create uploads, jpg/png only, 2MB) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Only JPEG/PNG allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

// --- routes ---

// Profile of logged-in user
router.get("/profile", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Get user by ID — limit to self or admin
router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (req.user.userId !== user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user by id" });
  }
});

// Update profile (bio/tags/image) — rate-limited + validated
router.patch(
  "/:id",
  authenticateJWT,
  userWriteLimiter,
  upload.single("image"),
  [
    // Bio: plain text, ≤500 chars
    body("bio")
      .optional({ checkFalsy: true })
      .customSanitizer((v) => stripAllHtml(v))
      .isLength({ max: 500 })
      .withMessage("Bio must be ≤ 500 characters"),

    // Tags: array or JSON string → cleaned, lowercase, unique, ≤10, each ≤20 chars, safe chars
    body("tags")
      .optional({ nullable: true })
      .customSanitizer((v, { req }) => {
        let arr = v;
        if (typeof v === "string") {
          try { arr = JSON.parse(v); } catch { arr = []; }
        }
        if (!Array.isArray(arr)) arr = [];
        arr = arr
          .filter((t) => typeof t === "string")
          .map((t) => stripAllHtml(t).toLowerCase())
          .filter((t) => t.length > 0);
        arr = [...new Set(arr)]; // dedupe
        req.body.tags = arr;
        return arr;
      })
      .custom((arr) => {
        if (!Array.isArray(arr)) throw new Error("Tags must be an array.");
        if (arr.length > 10) throw new Error("Max 10 tags.");
        const bad = arr.find((t) => t.length > 20 || !/^[a-z0-9 _.\-#&]+$/i.test(t));
        if (bad) throw new Error("Invalid tag format.");
        return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      if (req.user.userId !== user.id) {
        return res.status(403).json({ error: "You are not allowed to edit this user." });
      }

      const updates = {};
      if (typeof req.body.bio === "string") updates.bio = req.body.bio;
      if (Array.isArray(req.body.tags)) updates.tags = req.body.tags;
      if (req.file) updates.imageURL = `/uploads/${req.file.filename}`;

      const updatedUser = await user.update(updates);
      res.json(updatedUser);
    } catch (error) {
      console.error("PATCH /:id failed:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  }
);

// Admin create user — rate-limited + validated
router.post(
  "/",
  authenticateJWT,
  authorizeRole(["admin"]),
  userWriteLimiter,
  [
    body("email").isEmail().withMessage("Valid email required."),
    body("username").isString().trim().isLength({ min: 3, max: 32 }),
    body("firstName").isString().trim().isLength({ min: 1, max: 50 }),
    body("lastName").isString().trim().isLength({ min: 1, max: 50 }),
    body("role").optional().isIn(["user", "player", "admin"]).withMessage("Invalid role."),
    body("password").isString().isLength({ min: 8 }).withMessage("Password must be at least 8 chars."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, username, role = "user", firstName, lastName, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await User.create({
        email,
        username,
        role,
        firstName: stripAllHtml(firstName),
        lastName: stripAllHtml(lastName),
        passwordHash,
      });

      res.status(201).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }
);

// Delete user
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
