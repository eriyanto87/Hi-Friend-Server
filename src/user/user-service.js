const bcrypt = require("bcryptjs");

const UserService = {
  isUsernameTaken(knex, username) {
    return knex("user")
      .where({ username })
      .first()
      .then((user) => !!user);
  },
  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("user")
      .returning("*")
      .then((user) => user[0]);
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
    };
  },
  getConversations() {},
};

module.exports = UserService;
