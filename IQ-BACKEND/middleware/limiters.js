// middleware/limiters.js
const erl = require("express-rate-limit");

// CJS/ESM safe access
const rateLimit = erl?.default || erl;
const ipKeyGen =
  erl?.ipKeyGenerator || erl?.default?.ipKeyGenerator;

if (!ipKeyGen) {
  throw new Error(
    "express-rate-limit ipKeyGenerator not found. Upgrade express-rate-limit to >=7.3."
  );
}

// Prefer userId; otherwise use normalized IP (handles IPv6 correctly)
const keyGen = (req) => (req.user?.userId ? `u:${req.user.userId}` : ipKeyGen(req));

// Profile writes (PATCH/POST /user)
const userWriteLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: keyGen,
  message: { error: "Too many profile updates. Try again later." },
});

// Messaging (send/reply)
const messagingLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: keyGen,
  message: { error: "Message rate limit exceeded." },
});

module.exports = { userWriteLimiter, messagingLimiter };
