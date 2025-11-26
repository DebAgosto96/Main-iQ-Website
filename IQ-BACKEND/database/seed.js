const db = require("./db");
const { User, Player, Service } = require("./index");
const bcrypt = require("bcrypt");

const run = async () => {
  db.logging = false;
  await db.sync({ force: true });

  const [adminPw, playerPw, userPw] = await Promise.all([
    bcrypt.hash("COD!", 12),
    bcrypt.hash("dogz10", 12),
    bcrypt.hash("dogz10!", 12),
  ]);

  const admin = await User.create({
    firstName: "Chandler",
    lastName: "Cadman",
    username: "iQBUVL",
    email: "chandlercadman@gmail.com", 
    passwordHash: adminPw,
    role: "admin",
  });

  const playerUser = await User.create({
    firstName: "Deborah",
    lastName: "Agosto",
    username: "iQDebbieCakes",
    email: "deborahagosto19@gmail.com",
    passwordHash: playerPw,
    role: "player",
  });

  const player = await Player.create({
    userId: playerUser.id,
    firstName: "Deborah",
    lastName: "Agosto",
    gamerTag: "iQDebbieCakes",
    email: "iQdebbiecakes@gmail.com", 
    dateOfBirth: "1996-04-22",
    country: "USA",
    address: "1560 Selwyn Ave, Apt:6A New York, NY 10457",
    phoneNumber: "+1 917-284-5719",
  });

  await Service.bulkCreate([
    { name: "Gaming Coaching", description: "1-on-1 coaching to improve your competitive gaming skills.", price: 50.0, playerId: player.id },
    { name: "Video Editing", description: "Professional video editing for gameplay, montages, or YouTube.", price: 75.0, playerId: player.id },
    { name: "Coaching for Video Editing", description: "Learn how to edit your own gameplay like a Pro!", price: 65.0, playerId: player.id },
    { name: "Marketing Consulting", description: "Guidance on building your personal gaming brand online.", price: 100.0, playerId: player.id },
  ]);

  const basicUser = await User.create({
    firstName: "Deborah",
    lastName: "Agosto",
    username: "Classandcode",
    email: "classandcode@gmail.com", 
    passwordHash: userPw,
    role: "user",
  });

  console.log("✅ Seed complete:");
  console.log("  Admin:", admin.email, "(COD!)");
  console.log("  Player user:", playerUser.email, "(dogz10) → Player profile:", player.gamerTag);
  console.log("  Regular user:", basicUser.email, "(dogz10!)");

  await db.close();
};

run().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
