/**
 * This file collects all the models from the models directory and associates them if needed.
 */

"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";


var sequelize = new Sequelize('sse', 'root', 'didi', {
	"dialect": "mysql",
	"username": "root",
	"password": "didi",
	
	"database": "sse",
	"host": "mysql",
	"port": "3306",
	"pool": {
		"max": 50,
		"min": 0,
		"idle": 10000
	},
	
	"logging": false,
	"define": {
		"createdAt": "created",
		"updatedAt": "updated",
		"deletedAt": "deleted",
		"underscored": true
	}
});

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
