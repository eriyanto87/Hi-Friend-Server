const app = require("../src/app");
const supertest = require("supertest");
const helpers = require("./helpers");
const knex = require("knex");

describe("Bot Endpoints", () => {
  let db;

  const testUsers = helpers.makeUsersArray();
  const testBots = helpers.makeBotsArray();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`GET /api/bot`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

    beforeEach("insert bots", () => helpers.seedBots(db, testBots));

    it(`responds with 200 and user's bot name`, () => {
      return supertest(app)
        .get(`/api/bot`)
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect((res) => {
          expect(res.body.user_id).to.eql(testUsers[0].user_id);
          expect(res.body).to.have.property("bot_name");
        });
    });
  });

  describe(`POST /api/bot`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

    beforeEach("insert bots", () => helpers.seedBots(db, testBots));

    it(`post bot name for user, responds with 201`, () => {
      const newBot = {
        user_id: 2,
        bot_name: "testBot-3",
      };
      return supertest(app)
        .post("/api/bot")
        .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
        .send(newBot)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.have.property("bot_name");
        });
    });
  });
});
