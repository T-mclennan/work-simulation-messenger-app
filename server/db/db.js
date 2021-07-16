const Sequelize = require("sequelize");

<<<<<<< HEAD
const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/messenger`, {
=======
const db = new Sequelize(process.env.DATABASE_URL || "postgres://localhost:5432/messenger", {
>>>>>>> develop
  logging: false
});

module.exports = db;
