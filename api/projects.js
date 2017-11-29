"use strict";

var helpers = require('../utils/helpers.js');
var session = require('../utils/session.js');
var errors = require('../utils/errors.js');
var models = require('../models');


function hasFilter(coll, property) {
    if (!Array.isArray(coll)) {
        return false;
    }

    var result = coll.filter(function (item) { 
        return item['property'] === property;
    });
    
    return result.length > 0;
}

var Service = {
    list: function(params, callback, sid, req) {
        session.verify(req).then(function(session) {
            if (session.user.get('role') > 3) {
                callback(new Error('Not authorized'));
                return;
            }

            return models.Project.findAndCount(
                helpers.sequelizify(params, models.Project));
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
        var user;

        session.verify(req).then(function(session) {
            user = session.user;

            if (user.get('role') > 2) {
                callback(new Error('Not authorized'));
                return;
            }


            if (!params.id) {
                throw errors.types.invalidParams({
                    path: 'id', message: 'Missing required parameter: id',
                });
            }
            return models.Project.findOne({
                where: {
                    id: params.id
                }
            });
        }).then(function(row) {
            if (!row) {
                throw errors.types.invalidParams({
                    path: 'id', message: 'Project with the specified id cannot be found',
                });
            }

            var programme = row.get('est_AGR') ? 'AGR' : row.get('programme'),
                userProgramme = user.get('programme');

            if (user.get('role') > 0 && userProgramme !== 'Tous') {
                if (programme !== userProgramme) {
                    callback(new Error('Not authorized'));
                    return;
                }
            }

            return row.update(params);
        }).then(function(row) {
            // reload record data in case associations have been updated.
            return row.reload();
        }).then(function(row) {
            callback(null, {
                data: [ row ],
                total: 1
            });
        }).catch(function(err) {
            callback(errors.parse(err));
        });
    },

    remove: function(params, callback, sid, req) {
        session.verify(req).then(function() {
            // NOTE(SB): the direct proxy requires methods for all CRUD actions
            throw errors.types.notImplemented();
        }).catch(function(err) {
            callback(err);
        });
    },

    filters: function(params, callback, sid, req) {
        session.verify(req).then(function() {
            return helpers.fetchFilters(params, models.Project);
        }).then(function(results) {
            callback(null, {
                data: results
            });
        }).catch(function(err) {
            callback(err);
        });
    }
};

module.exports = Service;
