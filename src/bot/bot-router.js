const express = require("express");
const BotService = require("./bot-service");
const { requireAuth } = require("../middleware/jwt-auth");

const botRouter = express.Router();
const bodyParser = express.json();

botRouter.get("/", requireAuth, (req, res) => {
  res.send("hello from bot router");
});

module.exports = botRouter;
