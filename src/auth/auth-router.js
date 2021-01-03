const express = require("express");
const AuthService = require("./auth-service");
const authRouter = express.Router();
const bodyParser = express.json();

authRouter.post("/signin", bodyParser, (req, res, next) => {
  const knexInstance = req.app.get("db");

  const { username, password } = req.body;

  for (const field of ["username", "password"]) {
    if (!req.body[field]) {
      return res.status(400).json({
        error: `${field} is required`,
      });
    }
  }
  AuthService.getUserWithUsername(knexInstance, username).then((dbUser) => {
    if (!dbUser) {
      return res.status(400).json({
        error: "Incorrect username or password",
      });
    }
    res.send("ok");
  });
});

module.exports = authRouter;
