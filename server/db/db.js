const Sequelize = require("sequelize");

const pass = process.env.SESSION_SECRET;
const db = new Sequelize(process.env.DATABASE_URL || `postgres://postgres:${pass}@localhost:5432/messenger`, {
  logging: false
});

module.exports = db;
