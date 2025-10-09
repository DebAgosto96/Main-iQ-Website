const express = require("express");
const router = express.Router();

const usersRouter = require("./user");
const playerRouter = require("./player");
const authRoutes = require("./auth");
const messageRoutes = require("./message");
const bookingRoutes = require("./booking");
const serviceRoutes = require("./service");
const adminRoutes = require("./admin"); 

router.use("/user", usersRouter);
router.use("/player", playerRouter);
router.use("/auth", authRoutes);
router.use("/message", messageRoutes);
router.use("/booking", bookingRoutes);
router.use("/service", serviceRoutes);
router.use("/admin", adminRoutes);     

module.exports = router;
