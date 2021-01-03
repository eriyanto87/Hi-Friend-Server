const bcrypt = require("bcryptjs");

const AuthService = {
  getUserWithUsername(knex, username) {
    return knex("user").where({ username }).first();
  },
};

module.exports = AuthService;
