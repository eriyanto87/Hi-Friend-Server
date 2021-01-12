const BotService = {
  getUserBot(knex, user_id) {
    return knex
      .from("bot")
      .select("bot.bot_name")
      .where("bot.user_id", user_id)
      .first();
  },
  insertBotName(knex, newBot) {
    return knex
      .insert(newBot)
      .into("bot")
      .returning("*")
      .then((bot) => bot[0]);
  },
};

module.exports = BotService;
