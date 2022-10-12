const { Sequelize } = require("sequelize");

const { config } = require("../config/config");
const setUpModels = require("../db/models");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//const URL = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URL = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//dialect: "mysql",
const sequelize = new Sequelize(URL, {
  dialect: "postgres",
  logging: true
});

setUpModels(sequelize);
module.exports = sequelize;
