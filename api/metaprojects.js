"use strict";

var helpers = require('../utils/helpers.js');
var session = require('../utils/session.js');
var errors = require('../utils/errors.js');

var cfg = require('../config.json').database;

var knex = require('knex')({
    client: cfg.dialect,
    connection: {
        host     : cfg.hostname,
        port     : cfg.port,
        user     : cfg.user,
        password : cfg.password,
        database : cfg.db,
        charset  : 'utf8'
    }
});

var Service = {
    list: function(params, callback, sid, req) {
        session.verify(req).then(function() {
            var table = 'projects',
                sql;

            sql = 'SELECT DISTINCT Commune as display, \'commune\' as category FROM ' + table;
            sql += ' WHERE Commune IS NOT NULL UNION';
            sql += ' SELECT DISTINCT Programme as display, \'programme\' as category FROM ' + table;
            sql += ' WHERE Programme IS NOT NULL UNION';
            sql += ' SELECT DISTINCT Exercice as display, \'exercice\' as category FROM ' + table;
            sql += ' WHERE Exercice IS NOT NULL';

            return knex.raw(sql);

        }).then(function(results) {
            var result = results[0];

            callback(null, {
                total: result.length,
                data: result
            });
        }).catch(function(err) {
            callback(err);
        });
    }
   
};

module.exports = Service;