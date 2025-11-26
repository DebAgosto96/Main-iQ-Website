const db = require("./db");
const { DataTypes } = require("sequelize");

//   isLive: Boolean
//   streamUrl: String
//   platform: String (e.g. "Twitch", "YouTube")
//   startTime: Date
//   rsvps: List of User IDs or Emails
// }

const Stream = db.define("stream", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { notEmpty: true },
  },
  title: {
    type: DataTypes.STRING,
    allownull: false,
    validate: { notEmpty: true },
  },
  streamerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnailURL: {
    type: DataTypes.STRING,
    defaultValue:
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  },
  isLive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  streamURL: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
