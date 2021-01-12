const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function cleanTables(db) {
  return db.raw(`TRUNCATE TABLE bot, "user" RESTART IDENTITY CASCADE;`);
}

function makeUsersArray() {
  return [
    {
      id: 1,
      username: "test-user-1",
      first_name: "user",
      last_name: "one",
      password: "password1!",
    },
    {
      id: 2,
      username: "test-user-2",
      first_name: "user",
      last_name: "two",
      password: "password2!",
    },
  ];
}

function makeBotsArray() {
  return [
    {
      id: 1,
      user_id: 1,
      bot_name: "testBot-1",
      created_date: new Date().toLocaleString("en", { timeZone: "UTC" }),
    },
    {
      id: 2,
      user_id: 2,
      bot_name: "testBot-2",
      created_date: new Date().toLocaleString("en", { timeZone: "UTC" }),
    },
  ];
}

function seedUsers(db, users) {
  const insertusers = users.map((user) => {
    const { username, password, first_name, last_name } = user;
    return {
      username,
      first_name,
      last_name,
      password: bcrypt.hashSync(password, 1),
    };
  });
  return db.into("user").insert(insertusers);
}

function seedBots(db, bots) {
  const insertBots = bots.map((bot) => {
    const { user_id, bot_name } = bot;
    return { user_id, bot_name };
  });
  return db.into("bot").insert(insertBots);
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign(
    {
      id: user.id,
    },
    secret,
    {
      subject: user.username,
      algorithm: "HS256",
    }
  );
  return `Bearer ${token}`;
}

module.exports = {
  cleanTables,
  seedUsers,
  makeUsersArray,
  makeAuthHeader,
  makeBotsArray,
  seedBots,
};
