const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const AuthService = {
  getUserWithUsername(knex, username) {
    return knex("user").where({ username }).first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(sub, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      sub,
      algorithm: "HS256",
    });
  },
};

module.exports = AuthService;
