const express = require("express");
const AuthService = require("./auth-service");
const authRouter = express.Router();
const bodyParser = express.json();

authRouter.post("/signin", bodyParser, (req, res, next) => {
  const knexInstance = req.app.get("db");

  const { username, password } = req.body;
  console.log(username, password);

  for (const field of ["username", "password"]) {
    if (!req.body[field]) {
      return res.status(400).json({
        error: `${field} is required`,
      });
    }
  }
  AuthService.getUserWithUsername(knexInstance, username)
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(400).json({
          error: "Incorrect username or password",
        });
      }
      return AuthService.comparePasswords(password, dbUser.password).then(
        (isMatch) => {
          if (!isMatch) {
            return res.status(400).json({
              error: "Incorrect username or password",
            });
          }
          const sub = dbUser.username;
          const payload = { user_id: dbUser.id };
          console.log(`${AuthService.createJwt(sub, payload)}`);
          res.send({
            authToken: AuthService.createJwt(sub, payload),
          });
        }
      );
    })
    .catch(next);
});

module.exports = authRouter;
