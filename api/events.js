"use strict";

var unique = require('array-unique');
var helpers = require('../utils/helpers.js');
var session = require('../utils/session.js');
var errors = require('../utils/errors.js');
var models = require('../models');

var Service = {
    list: function(params, callback, sid, req) {
        session.verify(req).then(function() {
            var sequelize = models.sequelize;
            var limit = params.limit || 25;
            var filters = [];
            var range = {};

            // Sequelize doesn't support UNION and custom JOIN, so let's first gather events
            // and then join person records manually. Since we are building the SQL query
            // manually, this method will support only very basic filtering and sorting.
            (params.filter || []).forEach(function(filter) {
                switch (filter.property) {
                case 'startDate':
                    filters.push('startDate >= date("' + filter.value + '")');
                    range.start = filter.value;
                    break;
                case 'endDate':
                    filters.push('startDate < date("' + filter.value + '")');
                    range.end = filter.value;
                    break;
                default:
                    break;
                }
            });

        
            var order = (params.sort || []).map(function(sorter) {
                return sorter.property + ' ' + sorter.direction;
            }).join([',']) || 'startDate DESC';

            var where = filters.join(' AND ');
            var ref = range.end? '"' + range.end + '"' :
                range.start? '"' + range.start + '", "+365 days"' :
                '"now", "+182 days"'

            /*var queries = [
                { type: 'birthday', column: 'birthday', frequency: 366 },
                { type: 'anniversary', column: 'started',  frequency: 366 },
                { type: 'started', column: 'started',  frequency: 0 },
                { type: 'ended', column: 'ended',  frequency: 0 }
            ].map(function(events) {
                var column = events.column;
                var frequency = events.frequency;
                var leapday =
                    '(strftime("%j", strftime("%Y-03-01", "now"))'+
                    '-strftime("%j", strftime("%Y-03-01", ' + column + ')))';

                var days = frequency > 0?
                    '('+ frequency +
                        ' + strftime("%j", ' + ref + ')'+
                        ' - strftime("%j", ' + column + ')'+
                        ' - ' + leapday + ') % ' + frequency:
                    'julianday(' + ref + ') - julianday(' + column + ')';

                return 'SELECT *, '+
                        'date(julianday(' + ref + ') - days) AS date, '+
                        '"' + events.type + '" AS type '+
                    'FROM ('+
                        'SELECT id AS recipient_id, ' + days + ' AS days '+
                        'FROM people WHERE ' + column + ' IS NOT NULL AND days <= 365'+
                    ')';
            }).join(" UNION ");*/

            return sequelize.query(
                    'SELECT * FROM Visits ' + /* + queries + ') '+*/
                    'WHERE ' + where, { model: models.Visit });

        }).then(function(result) {
            callback(null, {
                total: result.count,
                data: result.rows
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
