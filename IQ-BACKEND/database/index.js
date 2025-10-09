const db = require("./db");
const User = require("./User");
const Player = require("./player");
const Message = require("./message");
const Booking = require("./booking");
const Service = require("./service"); 

/* Associations */
Player.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Player, { foreignKey: "userId" });

Service.belongsTo(Player, { foreignKey: "playerId" });
Player.hasMany(Service, { foreignKey: "playerId" });

Booking.belongsTo(User, { foreignKey: "userId" });
Booking.belongsTo(Player, { foreignKey: "playerId" });
Booking.belongsTo(Service, { foreignKey: "serviceId" });
Service.hasMany(Booking, { foreignKey: "serviceId" });

module.exports = {
  db,
  User,
  Player,
  Message,
  Booking,
  Service, 
};
