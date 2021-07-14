const Sequelize = require("sequelize");

const pass = process.env.DB_PASSWORD;
const db = new Sequelize(process.env.DATABASE_URL || `postgres://postgres:${pass}@localhost:5432/messenger`, {
  logging: false
});

module.exports = db;
