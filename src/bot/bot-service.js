const BotService = {
  getUserBot(knex, user_id) {
    return knex("bot").where({ bot_name, user_id }).first();
  },
  insertBotName(knex, newBot) {
    return knex
      .insert(newBot)
      .into("bot")
      .returning("*")
      .then((bot) => bot[0]);
  },
  deleteBot(knex, id) {
    return knex.from("bot").where({ id }).delete();
  },
};

module.exports = BotService;
