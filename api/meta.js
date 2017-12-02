"use strict";

var session = require('../utils/session.js');
var errors = require('../utils/errors.js');

var fs = require("fs");
var path = require("path");

var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";

var sequelize2 = new Sequelize('information_schema', 'root', 'didi', {
	"dialect": "mysql",
	"username": "root",
	"password": "didi",
	
	"database": "information_schema",
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