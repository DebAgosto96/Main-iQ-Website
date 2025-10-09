require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const apiRouter = require("./api");
const { db } = require("./database");

const app = express();
const PORT = process.env.PORT || 8080;

app.set("trust proxy", 1);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// serve any static frontend files if needed
app.use(express.static(path.join(__dirname, "public")));

// ✅ serve user-uploaded files so /uploads/filename.jpg works
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const runApp = async () => {
  try {
    await db.sync({ alter: true });
    console.log("✅ Database synced and connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
  }
};

runApp();

module.exports = app;
