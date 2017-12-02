/**
 * This file collects all the models from the models directory and associates them if needed.
 */

"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config.json')).database;

config["username"] = process.env.OPENSHIFT_MYSQL_DB_USERNAME;
config["password"] = process.env.OPENSHIFT_MYSQL_DB_PASSWORD;
config.config["host"] = process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1';
config.config["port"] = process.env.OPENSHIFT_MYSQL_DB_PORT || 3306;

var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
