const express = require("express");
const BotService = require("./bot-service");
const { requireAuth } = require("../middleware/jwt-auth");

const botRouter = express.Router();
const bodyParser = express.json();

botRouter
  .use(requireAuth)
  .get("/", (req, res, next) => {
    // res.send("hello from bot router");
    const knexInstance = req.app.get("db");
    const userId = req.user.id;
    BotService.getUserBot(knexInstance, userId)
      .then((botName) => {
        res.json(botName);
      })
      .catch(next);
  })
  .post("/", bodyParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const userId = req.user.id;
    console.log(userId);

    const { bot_name } = req.body;

    const newBot = { user_id: userId, bot_name };

    for (const field of ["bot_name"]) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `${field} is required`,
        });
      }
    }
    BotService.insertBotName(knexInstance, newBot)
      .then((bot) => {
        res.status(201).json(bot);
      })
      .catch(next);
  });

module.exports = botRouter;
