"use strict";

var session = require('../utils/session.js');
var errors = require('../utils/errors.js');

var fs = require("fs");
var path = require("path");

var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config.json')).database;

config['database'] = "information_schema";
config["username"] = process.env.OPENSHIFT_MYSQL_DB_USERNAME;
config["password"] = process.env.OPENSHIFT_MYSQL_DB_PASSWORD;
config.config["host"] = process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1';
config.config["port"] = process.env.OPENSHIFT_MYSQL_DB_PORT || 3306;


var sequelize2 = new Sequelize(config.database, config.username, config.password, config);

var Service = {
    list: function(params, callback, sid, req) {
            return sequelize2.query('SELECT TABLE_NAME as "tablename", UPDATE_TIME as "update_time", UPDATE_TIME as "create_time" FROM tables WHERE TABLE_SCHEMA = "sse" ')
            .then(function(result) {
                var data = result[0];

                callback(null, {
                    total: data.length,
                    data: data
                });

            }).catch(function(err) {
                callback(err);
            });
    },

    insert: function(params, callback, sid, req) {
        session.verify(req).then(function() {
            // NOTE(SB): the direct proxy requires methods for all CRUD actions
            throw errors.types.notImplemented();
        }).catch(function(err) {
            callback(err);
        });
    },

    update: function(params, callback, sid, req) {
        session.verify(req).then(function() {
            // NOTE(SB): the direct proxy requires methods for all CRUD actions
            throw errors.types.notImplemented();
        }).catch(function(err) {
            callback(err);
        });
    },

    remove: function(params, callback) {
        session.verify(req).then(function() {
            // NOTE(SB): the direct proxy requires methods for all CRUD actions
            throw errors.types.notImplemented();
        }).catch(function(err) {
            callback(err);
        });
    }
}

module.exports = Service;